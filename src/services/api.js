import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
