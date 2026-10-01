import { Link } from "react-router-dom";
import ContourDivider from "../ContourDivider/ContourDivider";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container-narrow hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Armonización facial &amp; estética</span>
          <h1 className="hero__title">
            Belleza que respeta <em>tu esencia</em>
          </h1>
          <p className="hero__lede">
            Diseñamos planes de armonización facial personalizados, con técnicas mínimamente
            invasivas y resultados naturales que realzan tus rasgos sin cambiar quién sos.
          </p>
          <div className="hero__actions">
            <Link to="/turnos" className="btn-brand btn-brand-primary">
              Reservar turno
            </Link>
            <Link to="/tratamientos" className="btn-brand btn-brand-outline">
              Ver tratamientos
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__portrait">
            <div className="hero__portrait-frame">
              <img
                src="/dra-sol-ceballos.jpg"
                alt="Dra. Sol Ceballos, especialista en armonización orofacial"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-narrow">
        <ContourDivider />
      </div>
    </section>
  );
}
