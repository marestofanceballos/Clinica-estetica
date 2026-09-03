import { Producto } from "../models/Producto.js";
import { HttpError } from "../utils/httpError.js";
import { validateProducto } from "../utils/validateProducto.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const MAX_DESTACADOS = 4;

function toWriteData(payload) {
  const imagen = payload.imagen.trim();

  return {
    nombre: payload.nombre.trim(),
    categoria: payload.categoria.trim(),
    precio: Number(payload.precio),
    stock: Number(payload.stock),
    imagen,
    // Si no se cargó una galería propia, se usa la imagen principal para
    // que la página de detalle siempre tenga al menos una foto.
    imagenes: payload.imagenes?.length ? payload.imagenes : [imagen],
    resumen: payload.resumen.trim(),
    descripcion: payload.descripcion?.trim() || payload.resumen.trim(),
    destacado: Boolean(payload.destacado),
  };
}

async function assertDestacadoLimit({ destacado, excludeId }) {
  if (!destacado) return;

  const count = await Producto.countDocuments({
    destacado: true,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  });

  if (count >= MAX_DESTACADOS) {
    const error = new Error("Ya hay 4 productos destacados. Quitá uno antes de agregar otro.");
    error.errores = { destacado: error.message };
    throw error;
  }
}

export const list = asyncHandler(async (req, res) => {
  const { destacado } = req.query;
  const filtro = destacado === undefined ? {} : { destacado: destacado === "true" };

  const productos = await Producto.find(filtro).sort({ createdAt: 1 });
  res.json(productos);
});

export const getById = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    throw new HttpError(404, "Producto no encontrado.");
  }

  res.json(producto);
});

export const create = asyncHandler(async (req, res) => {
  const errores = validateProducto(req.body, { isCreate: true });
  if (Object.keys(errores).length > 0) {
    const error = new Error("Revisá los datos del formulario.");
    error.errores = errores;
    throw error;
  }

  await assertDestacadoLimit({ destacado: req.body.destacado });

  const existente = await Producto.findById(req.body.id);
  if (existente) {
    throw new HttpError(409, "Ya existe un producto con ese identificador.");
  }

  const producto = await Producto.create({ _id: req.body.id.trim(), ...toWriteData(req.body) });
  res.status(201).json(producto);
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existente = await Producto.findById(id);
  if (!existente) {
    throw new HttpError(404, "Producto no encontrado.");
  }

  const errores = validateProducto(req.body, { isCreate: false });
  if (Object.keys(errores).length > 0) {
    const error = new Error("Revisá los datos del formulario.");
    error.errores = errores;
    throw error;
  }

  await assertDestacadoLimit({ destacado: req.body.destacado, excludeId: id });

  const producto = await Producto.findByIdAndUpdate(id, toWriteData(req.body), { new: true });
  res.json(producto);
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existente = await Producto.findById(id);
  if (!existente) {
    throw new HttpError(404, "Producto no encontrado.");
  }

  await Producto.findByIdAndDelete(id);
  res.status(204).end();
});
