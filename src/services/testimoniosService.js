import { testimonios } from "../data/testimonios";

const SIMULATED_DELAY = 250;

/**
 * Obtiene los testimonios de pacientes.
 * TODO backend: reemplazar por `api.get('/testimonios')` con Axios.
 */
export function getTestimonios() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testimonios), SIMULATED_DELAY);
  });
}
