import { tratamientos } from "../data/tratamientos";

// Simula latencia de red para que el Loader tenga sentido visualmente.
const SIMULATED_DELAY = 350;

/**
 * Obtiene todos los tratamientos.
 * TODO backend: reemplazar por `api.get('/tratamientos')` con Axios.
 */
export function getTratamientos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tratamientos), SIMULATED_DELAY);
  });
}

/**
 * Obtiene un tratamiento por id.
 * TODO backend: reemplazar por `api.get(`/tratamientos/${id}`)`.
 */
export function getTratamientoPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tratamiento = tratamientos.find((t) => t.id === id);
      if (tratamiento) {
        resolve(tratamiento);
      } else {
        reject(new Error("Tratamiento no encontrado"));
      }
    }, SIMULATED_DELAY);
  });
}

/**
 * Obtiene solo los tratamientos destacados (para Home).
 * TODO backend: reemplazar por `api.get('/tratamientos?destacado=true')`.
 */
export function getTratamientosDestacados() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tratamientos.filter((t) => t.destacado)), SIMULATED_DELAY);
  });
}
