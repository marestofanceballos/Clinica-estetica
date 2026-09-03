const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Valida el payload de un tratamiento (alta o edición).
 * Devuelve un objeto `errores` (vacío si no hay errores), con la misma
 * forma que usan los formularios del frontend.
 */
export function validateTratamiento(payload, { isCreate }) {
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
    errores.imagen = "La URL de la imagen es obligatoria.";
  }

  if (payload.precioDesde !== null && payload.precioDesde !== undefined && payload.precioDesde !== "") {
    const precio = Number(payload.precioDesde);
    if (!Number.isFinite(precio) || precio < 0) {
      errores.precioDesde = "El precio debe ser un número mayor o igual a 0.";
    }
  }

  const queHace = payload.queHace ?? [];
  if (!Array.isArray(queHace)) {
    errores.queHace = "El formato de 'qué hace' no es válido.";
  } else if (queHace.some((item) => !isNonEmptyString(item?.titulo) || !isNonEmptyString(item?.texto))) {
    errores.queHace = "Cada beneficio necesita un título y un texto.";
  }

  const indicaciones = payload.indicaciones ?? [];
  if (!Array.isArray(indicaciones) || indicaciones.some((item) => typeof item !== "string")) {
    errores.indicaciones = "El formato de indicaciones no es válido.";
  }

  return errores;
}
