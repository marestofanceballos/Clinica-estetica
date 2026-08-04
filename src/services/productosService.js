import { productos } from "../data/productos";

const SIMULATED_DELAY = 350;

/**
 * Obtiene todos los productos.
 * TODO backend: reemplazar por `api.get('/productos')` con Axios.
 */
export function getProductos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), SIMULATED_DELAY);
  });
}

/**
 * Obtiene un producto por id.
 * TODO backend: reemplazar por `api.get(`/productos/${id}`)`.
 */
export function getProductoPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id === id);
      if (producto) {
        resolve(producto);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, SIMULATED_DELAY);
  });
}

/**
 * Obtiene los productos destacados (para Home).
 * TODO backend: reemplazar por `api.get('/productos?destacado=true')`.
 */
export function getProductosDestacados() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos.filter((p) => p.destacado)), SIMULATED_DELAY);
  });
}
