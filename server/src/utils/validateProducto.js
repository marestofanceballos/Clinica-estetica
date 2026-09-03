const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value) {
  const numero = Number(value);
  return Number.isFinite(numero) && numero >= 0;
}

/**
 * Valida el payload de un producto (alta o edición).
 * Devuelve un objeto `errores` (vacío si no hay errores), con la misma
 * forma que usan los formularios del frontend.
 */
export function validateProducto(payload, { isCreate }) {
  const errores = {};

  if (isCreate && !SLUG_RE.test(payload.id || "")) {
    errores.id = "El identificador debe ser un slug válido (minúsculas, números y guiones).";
  }

  if (!isNonEmptyString(payload.nombre)) {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (!isNonEmptyString(payload.categoria)) {
    errores.categoria = "La categoría es obligatoria.";
  }

  if (!isNonEmptyString(payload.resumen)) {
    errores.resumen = "El resumen corto es obligatorio.";
  }

  if (!isNonEmptyString(payload.imagen)) {
    errores.imagen = "La imagen es obligatoria.";
  }

  if (payload.precio === "" || payload.precio === null || payload.precio === undefined || !isPositiveNumber(payload.precio)) {
    errores.precio = "El precio debe ser un número mayor o igual a 0.";
  }

  if (payload.stock === "" || payload.stock === null || payload.stock === undefined || !isPositiveNumber(payload.stock)) {
    errores.stock = "El stock debe ser un número mayor o igual a 0.";
  }

  return errores;
}
