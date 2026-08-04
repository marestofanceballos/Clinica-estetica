import { useState } from "react";
import { tratamientos } from "../../data/tratamientos";
import { solicitarTurno } from "../../services/turnosService";
import "./appointmentForm.css";

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  tratamiento: "",
  fecha: "",
  mensaje: "",
};

function validar(form) {
  const errores = {};

  if (!form.nombre.trim()) {
    errores.nombre = "Ingresá tu nombre completo.";
  }

  if (!form.email.trim()) {
    errores.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = "Ingresá un email válido.";
  }

  if (!form.telefono.trim()) {
    errores.telefono = "Ingresá un teléfono de contacto.";
  } else if (!/^[0-9+\s()-]{7,20}$/.test(form.telefono)) {
    errores.telefono = "Ingresá un teléfono válido (solo números y símbolos +()-).";
  }

  if (!form.tratamiento) {
    errores.tratamiento = "Elegí un tratamiento de interés.";
  }

  if (!form.fecha) {
    errores.fecha = "Elegí una fecha tentativa.";
  } else {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (new Date(form.fecha) < hoy) {
      errores.fecha = "La fecha debe ser hoy o posterior.";
    }
  }

  return errores;
}

export default function AppointmentForm() {
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    setEnviando(true);
    await solicitarTurno(form);
    setEnviando(false);
    setEnviado(true);
    setForm(initialForm);
  };

  if (enviado) {
    return (
      <div className="appointment-form__success">
        <i className="bi bi-check-circle" aria-hidden="true"></i>
        <h3>¡Solicitud enviada!</h3>
        <p>
          Recibimos tu solicitud de turno. Nos pondremos en contacto para confirmar día y horario.
        </p>
        <button type="button" className="btn-brand btn-brand-outline" onClick={() => setEnviado(false)}>
          Solicitar otro turno
        </button>
      </div>
    );
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            className={errores.nombre ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.nombre)}
            placeholder="Ej: María Fernández"
          />
          {errores.nombre && <span className="appointment-form__error">{errores.nombre}</span>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errores.email ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.email)}
            placeholder="tu@email.com"
          />
          {errores.email && <span className="appointment-form__error">{errores.email}</span>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            className={errores.telefono ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.telefono)}
            placeholder="+54 381 000-0000"
          />
          {errores.telefono && <span className="appointment-form__error">{errores.telefono}</span>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="tratamiento">Tratamiento de interés</label>
          <select
            id="tratamiento"
            name="tratamiento"
            value={form.tratamiento}
            onChange={handleChange}
            className={errores.tratamiento ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.tratamiento)}
          >
            <option value="">Seleccioná una opción</option>
            {tratamientos.map((t) => (
              <option key={t.id} value={t.nombre}>
                {t.nombre}
              </option>
            ))}
          </select>
          {errores.tratamiento && <span className="appointment-form__error">{errores.tratamiento}</span>}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="fecha">Fecha tentativa</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            className={errores.fecha ? "is-invalid" : ""}
            aria-invalid={Boolean(errores.fecha)}
          />
          {errores.fecha && <span className="appointment-form__error">{errores.fecha}</span>}
        </div>

        <div className="col-12">
          <label htmlFor="mensaje">Contanos más (opcional)</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Contanos qué te gustaría consultar o mejorar"
          ></textarea>
        </div>
      </div>

      <button type="submit" className="btn-brand btn-brand-primary appointment-form__submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Solicitar turno"}
      </button>
      <p className="appointment-form__disclaimer">
        Este formulario no envía datos a ningún servidor todavía: es una simulación visual lista
        para conectarse a tu API.
      </p>
    </form>
  );
}
