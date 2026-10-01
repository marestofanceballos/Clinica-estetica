import mongoose from "mongoose";
import { Pedido } from "../models/Pedido.js";
import { Producto } from "../models/Producto.js";
import { HttpError } from "../utils/httpError.js";
import { validatePedido } from "../utils/validatePedido.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { crearPreferencia, obtenerPago } from "../lib/mercadopago.js";
import { enviarAvisoNuevoPedido, enviarConfirmacionAlComprador } from "../lib/mailer.js";

/**
 * Recibe el carrito (solo ids y cantidades) y los datos del comprador.
 * Los precios y el stock se leen siempre desde la base, nunca del request.
 */
export const create = asyncHandler(async (req, res) => {
  const errores = validatePedido(req.body);
  if (Object.keys(errores).length > 0) {
    const error = new Error("Revisá los datos del formulario.");
    error.errores = errores;
    throw error;
  }

  // Si el mismo producto llega repetido, se suman las cantidades.
  const cantidades = new Map();
  for (const item of req.body.items) {
    cantidades.set(item.id, (cantidades.get(item.id) ?? 0) + item.cantidad);
  }

  const productos = await Producto.find({ _id: { $in: [...cantidades.keys()] } });
  const productosPorId = new Map(productos.map((producto) => [producto._id, producto]));

  const items = [];
  for (const [id, cantidad] of cantidades) {
    const producto = productosPorId.get(id);

    if (!producto) {
      throw new HttpError(400, "Uno de los productos del carrito ya no está disponible.");
    }

    if (!(producto.precio > 0)) {
      throw new HttpError(400, `"${producto.nombre}" no está disponible para la venta online.`);
    }

    if (producto.stock < cantidad) {
      throw new HttpError(
        409,
        producto.stock > 0
          ? `Solo quedan ${producto.stock} unidades de "${producto.nombre}".`
          : `"${producto.nombre}" está sin stock.`
      );
    }

    items.push({ productoId: producto._id, nombre: producto.nombre, precio: producto.precio, cantidad });
  }

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const { comprador } = req.body;

  const pedido = await Pedido.create({
    comprador: {
      nombre: comprador.nombre.trim(),
      telefono: comprador.telefono.trim(),
      email: comprador.email.trim(),
    },
    direccion: {
      calle: comprador.calle.trim(),
      localidad: comprador.localidad.trim(),
      provincia: comprador.provincia.trim(),
      codigoPostal: comprador.codigoPostal.trim(),
    },
    nota: comprador.nota?.trim() || null,
    items,
    total,
  });

  let linkDePago;
  try {
    linkDePago = await crearPreferencia(pedido);
  } catch (err) {
    // Sin link de pago el pedido no sirve: no se deja huérfano en la base.
    await Pedido.findByIdAndDelete(pedido._id);
    if (err instanceof HttpError) throw err;
    console.error("Mercado Pago rechazó la preferencia:", err?.message ?? err);
    throw new HttpError(502, "No pudimos iniciar el pago con Mercado Pago. Probá de nuevo en unos minutos.");
  }

  res.status(201).json({ pedidoId: pedido._id, linkDePago });
});

/**
 * Confirmación al volver de Mercado Pago. No se confía en los parámetros
 * de la URL: el estado del pago se consulta a la API de Mercado Pago.
 */
export const confirmar = asyncHandler(async (req, res) => {
  const paymentId = String(req.body?.payment_id ?? "");
  const externalReference = String(req.body?.external_reference ?? "");

  if (!/^\d+$/.test(paymentId) || !mongoose.isValidObjectId(externalReference)) {
    throw new HttpError(400, "Los datos del pago no son válidos.");
  }

  const pedido = await Pedido.findById(externalReference);
  if (!pedido) {
    throw new HttpError(404, "Pedido no encontrado.");
  }

  // Ya confirmado antes (ej. la persona recargó la página): no se repite nada.
  if (pedido.estado !== "pendiente") {
    if (pedido.pagoId !== paymentId) {
      throw new HttpError(400, "El pago no corresponde a este pedido.");
    }
    return res.json({ estado: pedido.estado });
  }

  let pago;
  try {
    pago = await obtenerPago(paymentId);
  } catch (err) {
    if (err instanceof HttpError) throw err;
    console.error("No se pudo consultar el pago a Mercado Pago:", err?.message ?? err);
    throw new HttpError(502, "No pudimos verificar el pago con Mercado Pago. Probá de nuevo en unos minutos.");
  }

  if (!pago) {
    throw new HttpError(404, "No encontramos el pago en Mercado Pago.");
  }

  if (pago.external_reference !== externalReference) {
    throw new HttpError(400, "El pago no corresponde a este pedido.");
  }

  if (pago.status !== "approved") {
    return res.json({ estado: "pendiente", estadoPago: pago.status });
  }

  if (pago.currency_id !== "ARS" || Number(pago.transaction_amount) !== pedido.total) {
    console.error(`Pedido ${pedido._id}: el monto del pago ${paymentId} no coincide con el total.`);
    throw new HttpError(400, "El monto del pago no coincide con el pedido.");
  }

  // El filtro por estado "pendiente" hace que el paso a "pagado" ocurra
  // una sola vez aunque lleguen dos confirmaciones a la vez: solo la que
  // gana la actualización descuenta stock y manda el mail.
  const pagado = await Pedido.findOneAndUpdate(
    { _id: pedido._id, estado: "pendiente" },
    { estado: "pagado", pagoId: paymentId, pagadoEn: new Date() },
    { new: true }
  );

  if (!pagado) {
    return res.json({ estado: "pagado" });
  }

  await Producto.bulkWrite(
    pagado.items.map((item) => ({
      updateOne: {
        filter: { _id: item.productoId },
        update: { $inc: { stock: -item.cantidad } },
      },
    }))
  );

  // Un problema con un mail no debe hacer fallar un pedido ya cobrado,
  // ni impedir que salga el otro.
  const [aviso, confirmacion] = await Promise.allSettled([
    enviarAvisoNuevoPedido(pagado),
    enviarConfirmacionAlComprador(pagado),
  ]);

  if (aviso.status === "rejected") {
    console.error(`No se pudo enviar el aviso del pedido ${pagado._id}:`, aviso.reason?.message);
  }

  if (confirmacion.status === "rejected") {
    console.error(
      `No se pudo enviar la confirmación al comprador del pedido ${pagado._id}:`,
      confirmacion.reason?.message
    );
  }

  return res.json({ estado: "pagado" });
});

// --- A partir de acá, uso exclusivo del panel de administración ---

export const list = asyncHandler(async (req, res) => {
  const pedidos = await Pedido.find().sort({ createdAt: -1 });
  res.json(pedidos);
});

export const marcarEnviado = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "Pedido no encontrado.");
  }

  const pedido = await Pedido.findById(id);
  if (!pedido) {
    throw new HttpError(404, "Pedido no encontrado.");
  }

  if (pedido.estado === "pendiente") {
    throw new HttpError(409, "El pedido todavía no está pago.");
  }

  if (pedido.estado === "pagado") {
    pedido.estado = "enviado";
    pedido.enviadoEn = new Date();
    await pedido.save();
  }

  res.json(pedido);
});
