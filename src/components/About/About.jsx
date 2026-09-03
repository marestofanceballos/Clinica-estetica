import { Link } from "react-router-dom";
import "./about.css";

export default function About() {
  return (
    <section className="section bg-blush about-home">
      <div className="container-narrow about-home__inner">
        <div className="about-home__media">
          <img
            src="https://i.postimg.cc/KvVymPX5/estetica.jpg"
            alt="Espacio interior de la clínica"
          />
        </div>
        <div className="about-home__copy">
          <span className="eyebrow">Sobre la clínica</span>
          <h2 className="section-title">
            Un espacio diseñado para resaltar tu mejor version
          </h2>
          <p className="section-lede">
            Combinamos formación médica continua con un trato cercano y personalizado. Cada plan
            de tratamiento parte de escuchar tus objetivos y respetar los tiempos de tu piel.
          </p>
          <ul className="about-home__list">
            <li>
              <i className="bi bi-check2" aria-hidden="true"></i> Evaluación personalizada en cada
              consulta
            </li>
            <li>
              <i className="bi bi-check2" aria-hidden="true"></i> Productos e insumos certificados
            </li>
            <li>
              <i className="bi bi-check2" aria-hidden="true"></i> Seguimiento post tratamiento
            </li>
          </ul>
          <Link to="/sobre-mi" className="btn-brand btn-brand-outline">
            Conocer más
          </Link>
        </div>
      </div>
    </section>
  );
}
