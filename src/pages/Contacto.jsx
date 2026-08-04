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
                <p>Av. Siempre Viva 1234, Aguilares, Tucumán</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-telephone" aria-hidden="true"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+54 381 000-0000</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-envelope" aria-hidden="true"></i>
              <div>
                <h3>Email</h3>
                <p>hola@armonizacionorofacial.com</p>
              </div>
            </div>
            <div className="contacto__item">
              <i className="bi bi-clock" aria-hidden="true"></i>
              <div>
                <h3>Horarios</h3>
                <p>Lunes a viernes, de 9 a 19 hs</p>
              </div>
            </div>

            <div className="contacto__map" role="img" aria-label="Mapa de ubicación de la clínica">
              <i className="bi bi-map" aria-hidden="true"></i>
              <span>Mapa de ubicación</span>
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
