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
              online.
            </p>
            <div className="contact-home__items">
              <div className="contact-home__schedule">
            <i className="bi bi-clock" aria-hidden="true"></i>
              <span>
               Lunes, Martes, Jueves y Viernes de 14 a 20 hs (Beccar)
            <br />
               Miércoles de 8 a 14 hs (Martínez)
             </span>
            </div>
              <div>
                <i className="bi bi-telephone" aria-hidden="true"></i>
                <span>+54 9 1137055547</span>
              </div>
              <div>
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <span>dra.solangeceballosr@gmail.com</span>
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
