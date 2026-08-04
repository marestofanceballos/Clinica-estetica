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

export default function SobreMi() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre mí"
        title="Detrás de cada tratamiento, una mirada profesional y humana"
      />

      <section className="section pt-0">
        <div className="container-narrow sobre-mi__intro">
          <div className="sobre-mi__media">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop"
              alt="Profesional de la clínica en consultorio"
            />
          </div>
          <div className="sobre-mi__copy">
            <span className="eyebrow">Mi historia</span>
            <h2 className="section-title">
              Más de 8 años acompañando procesos de <em>autoestima y belleza</em>
            </h2>
            <p>
              Soy especialista en armonización facial y estética, formada en técnicas de medicina
              estética mínimamente invasiva. Mi enfoque combina precisión técnica con una mirada
              artística de las proporciones faciales, siempre respetando la identidad de cada
              paciente.
            </p>
            <p>
              Creo en una belleza que no se impone, sino que se revela: por eso cada consulta
              empieza escuchando qué es lo que te hace sentir vos misma, y a partir de ahí
              diseñamos juntas el plan de tratamiento.
            </p>
          </div>
        </div>

        <div className="container-narrow">
          <ContourDivider />
        </div>
      </section>

      <section className="section bg-alt pt-5">
        <div className="container-narrow">
          <div className="section-head text-center mx-auto">
            <span className="eyebrow justify-content-center">Filosofía de trabajo</span>
            <h2 className="section-title mx-auto">
              Los valores que guían <em>cada consulta</em>
            </h2>
          </div>

          <div className="row g-4">
            {VALORES.map((valor) => (
              <div className="col-12 col-sm-6 col-lg-3" key={valor.titulo}>
                <div className="sobre-mi__value">
                  <i className={`bi ${valor.icono}`} aria-hidden="true"></i>
                  <h3>{valor.titulo}</h3>
                  <p>{valor.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
