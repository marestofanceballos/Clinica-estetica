import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // envía la cookie httpOnly de sesión del admin en cada request
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const mensaje = err.response?.data?.error || "No pudimos conectar con el servidor.";
    const error = new Error(mensaje);
    error.errores = err.response?.data?.errores;
    error.status = err.response?.status;
    return Promise.reject(error);
  }
);

export default api;
