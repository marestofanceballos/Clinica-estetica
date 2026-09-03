import { Link } from "react-router-dom";
import imagenPrimeraConsulta from "../assets/primera-consulta.jpg";
import "../styles/primera-consulta.css";

const RAZONES = [
  {
    titulo: "Diagnóstico anatómico",
    texto: "El médico evalúa tu estructura ósea, la pérdida de grasa y la calidad de la piel.",
  },
  {
    titulo: "Planificación a medida",
    texto:
      "Permite combinar diferentes técnicas (como Radiesse para firmeza y ácido hialurónico para labios) de forma personalizada.",
  },
  {
    titulo: "Seguridad médica",
    texto: "Se descartan contraindicaciones, alergias o incompatibilidades con tratamientos previos.",
  },
  {
    titulo: "Gestión de expectativas",
    texto: "El profesional explicará qué resultados son reales y cuáles no se pueden lograr.",
  },
  {
    titulo: "Prevención de riesgos",
    texto: "Conocer la anatomía de los vasos sanguíneos minimiza la aparición de complicaciones graves.",
  },
];

export default function PrimeraConsulta() {
  return (
    <section className="section primera-consulta" style={{ paddingTop: "calc(var(--nav-height) + 56px)" }}>
      <div className="container-narrow primera-consulta__inner">
        <div className="primera-consulta__copy">
          <span className="eyebrow">Primera consulta</span>
          <h1 className="section-title">La importancia de la primera consulta</h1>
          <p className="section-lede">
            La consulta previa es el paso más crítico en la armonización facial porque cada rostro
            tiene una estructura anatómica, proporciones y un proceso de envejecimiento único.
          </p>

          <h2 className="primera-consulta__subtitle">Razones clave de su importancia</h2>
          <ul className="primera-consulta__reasons">
            {RAZONES.map((razon) => (
              <li key={razon.titulo}>
                <strong>{razon.titulo}:</strong> {razon.texto}
              </li>
            ))}
          </ul>

          <Link to="/contacto" className="btn-brand btn-brand-primary">
            Ir a contacto
          </Link>
        </div>

        <div className="primera-consulta__media">
          <img src={imagenPrimeraConsulta} alt="Primera consulta de armonización orofacial" />
        </div>
      </div>
    </section>
  );
}
