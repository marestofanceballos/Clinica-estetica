import PageHeader from "../components/PageHeader/PageHeader";
import ContourDivider from "../components/ContourDivider/ContourDivider";
import "../styles/sobre-mi.css";

const VALORES = [
  {
    icono: "bi-heart",
    titulo: "Naturalidad ante todo",
    texto: "Cada plan busca realzar tus rasgos, nunca cambiar tu esencia.",
  },
  {
    icono: "bi-shield-check",
    titulo: "Seguridad clínica",
    texto: "Insumos certificados y protocolos rigurosos en cada procedimiento.",
  },
  {
    icono: "bi-ear",
    titulo: "Escucha activa",
    texto: "La consulta inicial es tan importante como el tratamiento en sí.",
  },
  {
    icono: "bi-graph-up-arrow",
    titulo: "Formación continua",
    texto: "Actualización constante en las técnicas más seguras y efectivas.",
  },
];

const EXPERIENCIA = [
  "Odontóloga independiente",
  "CEO Estética Orofacial Madero",
  "CEO Sol Armonización Facial",
  "Auditoría y gestión odontológica, PAMI",
];

const RECONOCIMIENTOS = [
  "Simposio en armonización facial — parálisis facial y su tratamiento con toxina botulínica, Círculo Odontológico Argentino",
  "Columna sobre armonización facial en programa de TV",
  "Docente teórico en FACOP — parálisis facial y redermalización",
  "Trabajo de investigación para AOC — parálisis facial, diagnóstico y tratamiento",
];

// Ordenado cronológicamente; los ítems del mismo mes se agrupan bajo una
// sola fecha para que la línea de tiempo se lea prolija.
const FORMACION = [
  { fecha: "Marzo 2012", items: ["Posgrado en rehabilitación en prótesis fija, Universidad del Salvador"] },
  {
    fecha: "Abril 2016",
    items: [
      "Concurso público en gestión y auditoría odontológica, Gobierno de la Ciudad de Bs. As. — Seleccionada para PAMI",
    ],
  },
  {
    fecha: "Junio 2021",
    items: [
      "Introducción a la AOF: principios básicos, estética facial, análisis facial, toxina botulínica y ácido hialurónico (200 hs), Dra. Tamborini Verónica Formarte, La Plata",
    ],
  },
  { fecha: "Noviembre 2021", items: ["Diferentes abordajes en rinomodelación, Congreso Let, Bs. As."] },
  {
    fecha: "Agosto 2022",
    items: ["Entrenamiento personalizado \"one to one\", concepto 4 puntos, Dr. Silik, Bs. As."],
  },
  {
    fecha: "Septiembre 2022",
    items: ["Jornada de capacitación Bioestimulador Longlasting, Laboratorio Noorus Lab, Bs. As."],
  },
  { fecha: "Mayo 2023", items: ["Actualización BAAS International Congress, 8th Edition, Bs. As."] },
  {
    fecha: "Mayo 2024",
    items: [
      "Actualización BAAS International Congress, 9th Edition, Bs. As.",
      "Jornada de actualización en hilos de PDO, Dra. Flavia Augusto, Bs. As.",
    ],
  },
  { fecha: "Junio 2024", items: ["Curso online: protocolo de adipoestructuración facial, Praxis Estudio, Brasil"] },
  {
    fecha: "Julio 2024",
    items: ["Actualización de nuevas tendencias, invitación Laboratorio Galderma, Bs. As."],
  },
  { fecha: "Septiembre 2024", items: ["Curso de actualización de Masterhub, Dr. Felice"] },
  { fecha: "Octubre 2024", items: ["Fresh Frozen Cadaver Labs, Pablo, São Paulo, Brasil"] },
  {
    fecha: "Noviembre 2024",
    items: [
      "Actualización protocolos Sculptra, charla para speakers, Bs. As.",
      "360° Experience, All Fun and International, Dr. Casenave y Dr. Thales, Córdoba",
      "Especialista universitaria en Armonización y Estética Orofacial, PGO-UCAM (apostillado de La Haya)",
    ],
  },
  {
    fecha: "Marzo 2025",
    items: [
      "Docente en Facop, módulos de parálisis facial y redermalización",
      "Congreso Acaofar — presentación de Xelarederm, Laboratorio Suvanza",
      "Actualización Join Oxa 4, Bs. As.",
    ],
  },
  { fecha: "Abril 2025", items: ["Congreso Full Face — MMO Eventos, São Paulo"] },
  { fecha: "Septiembre 2025", items: ["Masterhub, Bs. As."] },
  {
    fecha: "Noviembre 2025",
    items: ["Curso fotobiomodulación LED y láser aplicada a la salud, Formación Láser, Bs. As."],
  },
  {
    fecha: "Abril 2026",
    items: [
      "Actualización en técnicas de armonización facial, Join Oxa 2026, Bs. As.",
      "BAAS International Congress, 11th Edition",
    ],
  },
  {
    fecha: "Julio 2026",
    items: ["Abordaje panfacial con toxina botulínica y fillers, Dr. Banegas Raúl, Bs. As."],
  },
  {
    fecha: "Agosto 2026",
    items: [
      "Máster class teórico live demo \"La Revolución del Rejuvenecimiento\", Dra. Viviana Perico y Oxa Medical",
    ],
  },
];

export default function SobreMi() {
  return (
    <div className="sobre-mi-page">
      <PageHeader
        eyebrow="Sobre mí"
        title="Tratamientos objetivos, resultados verdaderos"
      />

      <section className="section pt-0">
        <div className="container-narrow sobre-mi__intro">
          <div className="sobre-mi__media">
            <img src="https://i.postimg.cc/fT7grYzW/Estetica-1.jpg" alt="María Solange Ceballos Rago" />
          </div>
          <div className="sobre-mi__copy">
            <span className="eyebrow">Mi historia</span>
            <h2 className="section-title">María Solange Ceballos Rago</h2>
            <p>
              Soy María Solange Ceballos Rago, odontóloga especializada en armonización facial y
              orofacial. Formada en la Universidad Católica de La Plata, con más de una década
              dedicada a la actualización constante en técnicas de estética facial mínimamente
              invasiva — desde toxina botulínica y ácido hialurónico hasta bioestimuladores y
              protocolos de rejuvenecimiento de vanguardia, siempre en congresos y formaciones
              internacionales. Combino precisión técnica con una mirada artística de las
              proporciones faciales, respetando siempre la identidad de cada paciente.
            </p>
          </div>
        </div>

        <div className="container-narrow">
          <ContourDivider />
        </div>

        <div className="container-narrow sobre-mi__block">
          <span className="eyebrow">Experiencia profesional</span>
          <h2 className="sobre-mi__block-title">Roles y trayectoria</h2>
          <ul className="sobre-mi__list">
            {EXPERIENCIA.map((item) => (
              <li key={item}>
                <i className="bi bi-check2" aria-hidden="true"></i> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="container-narrow sobre-mi__block">
          <span className="eyebrow">Reconocimientos y actividad académica</span>
          <h2 className="sobre-mi__block-title">Participación y aportes académicos</h2>
          <ul className="sobre-mi__list">
            {RECONOCIMIENTOS.map((item) => (
              <li key={item}>
                <i className="bi bi-check2" aria-hidden="true"></i> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="container-narrow sobre-mi__block">
          <span className="eyebrow">Formación y trayectoria</span>
          <h2 className="sobre-mi__block-title">Actualización profesional constante</h2>
          <ul className="sobre-mi__timeline">
            {FORMACION.map((grupo) => (
              <li key={grupo.fecha}>
                <span className="sobre-mi__timeline-dot" aria-hidden="true"></span>
                <span className="sobre-mi__timeline-date">{grupo.fecha}</span>
                <ul className="sobre-mi__timeline-items">
                  {grupo.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
