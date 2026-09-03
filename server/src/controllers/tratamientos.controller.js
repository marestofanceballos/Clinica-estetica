import { Tratamiento } from "../models/Tratamiento.js";
import { HttpError } from "../utils/httpError.js";
import { validateTratamiento } from "../utils/validateTratamiento.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const MAX_DESTACADOS = 4;

function toWriteData(payload) {
  return {
    nombre: payload.nombre.trim(),
    categoria: payload.categoria.trim(),
    resumen: payload.resumen.trim(),
    imagen: payload.imagen.trim(),
    precioDesde:
      payload.precioDesde === "" || payload.precioDesde === null || payload.precioDesde === undefined
        ? null
        : Number(payload.precioDesde),
    destacado: Boolean(payload.destacado),
    introduccion: payload.introduccion?.trim() || null,
    queEs: payload.queEs?.trim() || null,
    queHace: payload.queHace ?? [],
    presentacion: payload.presentacion?.trim() || null,
    indicaciones: (payload.indicaciones ?? []).filter((item) => item.trim().length > 0),
  };
}

async function assertDestacadoLimit({ destacado, excludeId }) {
  if (!destacado) return;

  const count = await Tratamiento.countDocuments({
    destacado: true,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  });

  if (count >= MAX_DESTACADOS) {
    const error = new Error("Ya hay 4 tratamientos destacados. Quitá uno antes de agregar otro.");
    error.errores = { destacado: error.message };
    throw error;
  }
}

export const list = asyncHandler(async (req, res) => {
  const { destacado } = req.query;
  const filtro = destacado === undefined ? {} : { destacado: destacado === "true" };

  const tratamientos = await Tratamiento.find(filtro).sort({ createdAt: 1 });
  res.json(tratamientos);
});

export const getById = asyncHandler(async (req, res) => {
  const tratamiento = await Tratamiento.findById(req.params.id);

  if (!tratamiento) {
    throw new HttpError(404, "Tratamiento no encontrado.");
  }

  res.json(tratamiento);
});

export const create = asyncHandler(async (req, res) => {
  const errores = validateTratamiento(req.body, { isCreate: true });
  if (Object.keys(errores).length > 0) {
    const error = new Error("Revisá los datos del formulario.");
    error.errores = errores;
    throw error;
  }

  await assertDestacadoLimit({ destacado: req.body.destacado });

  const existente = await Tratamiento.findById(req.body.id);
  if (existente) {
    throw new HttpError(409, "Ya existe un tratamiento con ese identificador.");
  }

  const tratamiento = await Tratamiento.create({ _id: req.body.id.trim(), ...toWriteData(req.body) });
  res.status(201).json(tratamiento);
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existente = await Tratamiento.findById(id);
  if (!existente) {
    throw new HttpError(404, "Tratamiento no encontrado.");
  }

  const errores = validateTratamiento(req.body, { isCreate: false });
  if (Object.keys(errores).length > 0) {
    const error = new Error("Revisá los datos del formulario.");
    error.errores = errores;
    throw error;
  }

  await assertDestacadoLimit({ destacado: req.body.destacado, excludeId: id });

  const tratamiento = await Tratamiento.findByIdAndUpdate(id, toWriteData(req.body), { new: true });
  res.json(tratamiento);
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existente = await Tratamiento.findById(id);
  if (!existente) {
    throw new HttpError(404, "Tratamiento no encontrado.");
  }

  await Tratamiento.findByIdAndDelete(id);
  res.status(204).end();
});
