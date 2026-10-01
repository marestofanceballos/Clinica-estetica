import { useEffect, useState } from "react";
import { getTratamientos } from "../../services/tratamientosService";
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

const WHATSAPP_NUMERO = "5491137055547";

function formatFechaTentativa(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

function armarUrlWhatsApp(form) {
  const lineas = [
    "Hola! Quiero reservar un turno de evaluación.",
    `Nombre: ${form.nombre}`,
    `Teléfono: ${form.telefono}`,
    `Tratamiento: ${form.tratamiento}`,
    `Fecha tentativa: ${formatFechaTentativa(form.fecha)}`,
  ];

  if (form.mensaje.trim()) {
    lineas.push(`Comentario: ${form.mensaje.trim()}`);
  }

  const mensaje = encodeURIComponent(lineas.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
}

export default function AppointmentForm() {
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    let activo = true;
    getTratamientos()
      .then((data) => {
        if (activo) setTratamientos(data);
      })
      .catch(() => {
        // Si falla la carga, el select simplemente queda sin opciones
        // (además de "Seleccioná una opción") en vez de romper la página.
      });
    return () => {
      activo = false;
    };
  }, []);

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

    // Se abre ya (en blanco) para que el navegador no la bloquee por no
    // disparar de forma perfectamente sincrónica al click; recién se le
    // asigna la URL de WhatsApp una vez confirmado que la solicitud se
    // guardó correctamente.
    const ventanaWhatsApp = window.open("", "_blank");

    setEnviando(true);
    await solicitarTurno(form);
    setEnviando(false);
    setEnviado(true);

    if (ventanaWhatsApp) {
      ventanaWhatsApp.location.href = armarUrlWhatsApp(form);
    }

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
          <span className="appointment-form__helper">
            Atención: Lunes, Martes, Jueves y Viernes de 14 a 20 hs (Beccar) — Miércoles de 8 a 14 hs
            (Martínez).
          </span>
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
    </form>
  );
}
