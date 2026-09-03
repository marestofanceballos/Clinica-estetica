import { HttpError } from "../utils/httpError.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err?.errores) {
    return res.status(400).json({ error: "Revisá los datos del formulario.", errores: err.errores });
  }

  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor." });
}
