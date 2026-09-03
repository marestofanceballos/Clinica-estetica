import api from "./api";

function toFrontendShape(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    resumen: row.resumen,
    imagen: row.imagen,
    destacado: row.destacado,
    precioDesde: row.precioDesde ?? undefined,
    detalle: {
      introduccion: row.introduccion ?? undefined,
      queEs: row.queEs ?? undefined,
      queHace: row.queHace ?? [],
      presentacion: row.presentacion ?? undefined,
      indicaciones: row.indicaciones?.length ? row.indicaciones : undefined,
    },
  };
}

/**
 * Obtiene todos los tratamientos.
 */
export function getTratamientos() {
  return api.get("/tratamientos").then((res) => res.data.map(toFrontendShape));
}

/**
 * Obtiene un tratamiento por id.
 */
export function getTratamientoPorId(id) {
  return api
    .get(`/tratamientos/${id}`)
    .then((res) => toFrontendShape(res.data))
    .catch(() => Promise.reject(new Error("Tratamiento no encontrado")));
}

/**
 * Obtiene solo los tratamientos destacados (para Home).
 */
export function getTratamientosDestacados() {
  return api.get("/tratamientos", { params: { destacado: true } }).then((res) => res.data.map(toFrontendShape));
}

// --- A partir de acá, uso exclusivo del panel de administración ---

function toApiPayload(form) {
  return {
    id: form.id,
    nombre: form.nombre,
    categoria: form.categoria,
    resumen: form.resumen,
    imagen: form.imagen,
    precioDesde: form.precioDesde === "" ? null : form.precioDesde,
    destacado: Boolean(form.destacado),
    introduccion: form.introduccion,
    queEs: form.queEs,
    queHace: form.queHace,
    presentacion: form.presentacion,
    indicaciones: form.indicaciones,
  };
}

export function createTratamiento(form) {
  return api.post("/tratamientos", toApiPayload(form)).then((res) => toFrontendShape(res.data));
}

export function updateTratamiento(id, form) {
  return api.put(`/tratamientos/${id}`, toApiPayload(form)).then((res) => toFrontendShape(res.data));
}

export function deleteTratamiento(id) {
  return api.delete(`/tratamientos/${id}`);
}
