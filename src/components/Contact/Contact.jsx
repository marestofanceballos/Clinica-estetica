import { Link } from "react-router-dom";
import "./contact.css";

export default function Contact() {
  return (
    <section className="section contact-home">
      <div className="container-narrow">
        <div className="contact-home__panel">
          <div className="contact-home__copy">
            <span className="eyebrow">Contacto</span>
            <h2 className="section-title">
              Empecemos a diseñar <em>tu tratamiento</em>
            </h2>
            <p className="section-lede">
              Escribinos por WhatsApp, completá el formulario de contacto o reservá tu turno
              online. Te respondemos dentro de las 24 horas hábiles.
            </p>
            <div className="contact-home__items">
              <div>
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                <span>Av. Siempre Viva 1234, Aguilares, Tucumán</span>
              </div>
              <div>
                <i className="bi bi-telephone" aria-hidden="true"></i>
                <span>+54 381 000-0000</span>
              </div>
              <div>
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <span>hola@armonizacionorofacial.com</span>
              </div>
            </div>
            <div className="contact-home__actions">
              <Link to="/contacto" className="btn-brand btn-brand-primary">
                Ir a contacto
              </Link>
              <Link to="/turnos" className="btn-brand btn-brand-outline">
                Pedir turno
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
