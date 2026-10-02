import axios from "axios";
import { getToken, clearToken } from "./authToken";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Envía el token de sesión del admin (si hay) en cada request.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Token vencido o inválido: se descarta para que el panel pida login de nuevo.
    if (err.response?.status === 401) {
      clearToken();
    }

    const mensaje = err.response?.data?.error || "No pudimos conectar con el servidor.";
    const error = new Error(mensaje);
    error.errores = err.response?.data?.errores;
    error.status = err.response?.status;
    return Promise.reject(error);
  }
);

export default api;
