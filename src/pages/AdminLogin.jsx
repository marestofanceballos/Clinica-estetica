import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/admin.css";

const initialForm = { username: "", password: "" };

function validar(form) {
  const errores = {};

  if (!form.username.trim()) {
    errores.username = "Ingresá tu usuario.";
  }

  if (!form.password) {
    errores.password = "Ingresá tu contraseña.";
  }

  return errores;
}

export default function AdminLogin() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
    if (errorGeneral) setErrorGeneral("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    setEnviando(true);
    try {
      await login(form.username.trim(), form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="admin-auth">
      <form className="admin-auth__card card-elegant" onSubmit={handleSubmit} noValidate>
        <span className="eyebrow">Panel de administración</span>
        <h1 className="admin-auth__title">Iniciar sesión</h1>

        <div className="admin-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            className={errores.username ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.username)}
          />
          {errores.username && <span className="admin-field__error">{errores.username}</span>}
        </div>

        <div className="admin-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className={errores.password ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.password)}
          />
          {errores.password && <span className="admin-field__error">{errores.password}</span>}
        </div>

        {errorGeneral && <p className="admin-auth__error">{errorGeneral}</p>}

        <button type="submit" className="btn-brand btn-brand-primary admin-auth__submit" disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
