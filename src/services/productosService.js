import api from "./api";

function toFrontendShape(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    precio: row.precio,
    stock: row.stock,
    imagen: row.imagen,
    imagenes: row.imagenes?.length ? row.imagenes : [row.imagen],
    resumen: row.resumen,
    descripcion: row.descripcion ?? row.resumen,
    destacado: row.destacado,
  };
}

/**
 * Obtiene todos los productos.
 */
export function getProductos() {
  return api.get("/productos").then((res) => res.data.map(toFrontendShape));
}

/**
 * Obtiene un producto por id.
 */
export function getProductoPorId(id) {
  return api
    .get(`/productos/${id}`)
    .then((res) => toFrontendShape(res.data))
    .catch(() => Promise.reject(new Error("Producto no encontrado")));
}

/**
 * Obtiene solo los productos destacados (para Home).
 */
export function getProductosDestacados() {
  return api.get("/productos", { params: { destacado: true } }).then((res) => res.data.map(toFrontendShape));
}

// --- A partir de acá, uso exclusivo del panel de administración ---

function toApiPayload(form) {
  return {
    id: form.id,
    nombre: form.nombre,
    categoria: form.categoria,
    precio: form.precio === "" ? null : form.precio,
    stock: form.stock === "" ? null : form.stock,
    imagen: form.imagen,
    imagenes: form.imagenes,
    resumen: form.resumen,
    descripcion: form.descripcion,
    destacado: Boolean(form.destacado),
  };
}

export function createProducto(form) {
  return api.post("/productos", toApiPayload(form)).then((res) => toFrontendShape(res.data));
}

export function updateProducto(id, form) {
  return api.put(`/productos/${id}`, toApiPayload(form)).then((res) => toFrontendShape(res.data));
}

export function deleteProducto(id) {
  return api.delete(`/productos/${id}`);
}
