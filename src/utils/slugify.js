const DIACRITICOS = /[̀-ͯ]/g;

/**
 * Convierte un texto en un slug apto para usar como id (ej. en URLs
 * /tratamientos/:id): minúsculas, sin acentos, solo letras/números
 * separados por guiones.
 */
export function slugify(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(DIACRITICOS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
