import { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import "../styles/contacto.css";

const initialForm = { nombre: "", email: "", mensaje: "" };

function validar(form) {
  const errores = {};
  if (!form.nombre.trim()) errores.nombre = "Ingresá tu nombre.";
  if (!form.email.trim()) {
    errores.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = "Ingresá un email válido.";
  }
  if (!form.mensaje.trim()) errores.mensaje = "Contanos en qué podemos ayudarte.";
  return errores;
}

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    // TODO backend: reemplazar por `api.post('/contacto', form)`.
    setEnviado(true);
    setForm(initialForm);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Estamos para ayudarte"
        lede="Elegí el medio que prefieras: te respondemos dentro de las 24 horas hábiles."
      />

      <section className="section pt-0">
        <div className="container-narrow contacto__grid">
          <div className="contacto__info">
            <div className="contacto__item">
              <i className="bi bi-geo-alt" aria-hidden="true"></i>
              <div>
                <h3>Ubicación</h3>
                <p>Arce 441 , CABA.BS.AS.</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-telephone" aria-hidden="true"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+54 9 1137055547</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-envelope" aria-hidden="true"></i>
              <div>
                <h3>Email</h3>
                <p>dra.solangeceballosr@gmail.com</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-clock" aria-hidden="true"></i>
              <div>
                <h3>Horarios</h3>
                <p>Lunes , Martes , Jueves y Viernes de 14 a 20 hs (Beccar)
                  Miercoles de 8 a 14 hs (Martinez)
                </p>
              </div>
            </div>
          </div>

          <div className="contacto__form-wrap">
            {enviado ? (
              <div className="contacto__success">
                <i className="bi bi-check-circle" aria-hidden="true"></i>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por escribirnos. Te responderemos a la brevedad.</p>
                <button type="button" className="btn-brand btn-brand-outline" onClick={() => setEnviado(false)}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="contacto__form" onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="c-nombre">Nombre</label>
                  <input
                    id="c-nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                    className={errores.nombre ? "is-invalid" : ""}
                  />
                  {errores.nombre && <span className="contacto-form__error">{errores.nombre}</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={errores.email ? "is-invalid" : ""}
                  />
                  {errores.email && <span className="contacto-form__error">{errores.email}</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="c-mensaje">Mensaje</label>
                  <textarea
                    id="c-mensaje"
                    name="mensaje"
                    rows="5"
                    value={form.mensaje}
                    onChange={handleChange}
                    className={errores.mensaje ? "is-invalid" : ""}
                  ></textarea>
                  {errores.mensaje && <span className="contacto-form__error">{errores.mensaje}</span>}
                </div>

                <button type="submit" className="btn-brand btn-brand-primary w-100">
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
