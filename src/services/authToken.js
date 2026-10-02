// Token de sesión del admin. Se guarda en localStorage (y no en una
// cookie) porque el frontend y la API están en dominios distintos y
// Safari bloquea las cookies entre sitios.
const STORAGE_KEY = "adminToken";

export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Sin almacenamiento disponible (ej. modo privado): no se puede mantener la sesión.
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada que borrar.
  }
}
