import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { HttpError } from "../utils/httpError.js";

// El cliente se crea recién al usarlo (y no al importar el módulo) para
// que el resto de la API siga funcionando aunque falte el token.
function getClient() {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new HttpError(503, "El sistema de pagos no está configurado.");
  }

  return new MercadoPagoConfig({ accessToken });
}

/**
 * Crea la preferencia de Checkout Pro para un pedido y devuelve el link
 * de pago al que hay que redirigir a la persona.
 */
export async function crearPreferencia(pedido) {
  const clientUrl = process.env.CLIENT_URL;

  const body = {
    items: pedido.items.map((item) => ({
      id: item.productoId,
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio,
      currency_id: "ARS",
    })),
    payer: {
      name: pedido.comprador.nombre,
      email: pedido.comprador.email,
    },
    external_reference: String(pedido._id),
    back_urls: {
      success: `${clientUrl}/pago/exitoso`,
      failure: `${clientUrl}/pago/rechazado`,
      pending: `${clientUrl}/pago/pendiente`,
    },
  };

  // Mercado Pago rechaza `auto_return` cuando las back_urls no son https
  // (caso localhost). Sin auto_return, la persona vuelve al sitio con el
  // botón "Volver al sitio" de la pantalla final de Mercado Pago.
  if (clientUrl?.startsWith("https://")) {
    body.auto_return = "approved";
  }

  const preferencia = await new Preference(getClient()).create({ body });
  return preferencia.init_point;
}

/**
 * Consulta un pago directamente a la API de Mercado Pago.
 * Devuelve null si el pago no existe.
 */
export async function obtenerPago(paymentId) {
  const client = getClient();

  try {
    return await new Payment(client).get({ id: paymentId });
  } catch (err) {
    if (err?.status === 404) return null;
    throw err;
  }
}
