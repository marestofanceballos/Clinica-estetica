import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getTratamientoPorId } from "../services/tratamientosService";
import { formatPrecio } from "../utils/format";
import "../styles/treatment-detail.css";

export default function TratamientoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tratamiento, setTratamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setNotFound(false);

    getTratamientoPorId(id)
      .then((data) => {
        if (!activo) return;
        setTratamiento(data);
        setLoading(false);
      })
      .catch(() => {
        if (activo) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="section pt-0 loader-page" style={{ paddingTop: "calc(var(--nav-height) + 40px)" }}>
        <Loader label="Cargando tratamiento" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div
        className="container-narrow text-center"
        style={{ paddingTop: "calc(var(--nav-height) + 100px)", paddingBottom: 100 }}
      >
        <h2>No encontramos este tratamiento</h2>
        <p>Es posible que ya no esté disponible.</p>
        <button type="button" className="btn-brand btn-brand-primary" onClick={() => navigate("/tratamientos")}>
          Volver a tratamientos
        </button>
      </div>
    );
  }

  const detalle = tratamiento.detalle;

  return (
    <div className="treatment-detail" style={{ paddingTop: "calc(var(--nav-height) + 48px)" }}>
      <div className="container-narrow">
        <nav className="treatment-detail__breadcrumb" aria-label="breadcrumb">
          <Link to="/tratamientos">Tratamientos</Link>
          <i className="bi bi-chevron-right" aria-hidden="true"></i>
          <span>{tratamiento.nombre}</span>
        </nav>

        <div className="row g-5">
          <div className="col-12 col-lg-5">
            <div className="treatment-detail__main-image">
              <img src={tratamiento.imagen} alt={tratamiento.nombre} />
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <span className="tag-pill mb-3">{tratamiento.categoria}</span>
            <h1 className="treatment-detail__title">{tratamiento.nombre}</h1>

            {detalle?.introduccion && <p className="treatment-detail__intro">{detalle.introduccion}</p>}

            <p className="treatment-detail__price">
              {tratamiento.precioDesde ? `Desde ${formatPrecio(tratamiento.precioDesde)}` : "Consultar valor"}
            </p>

            {detalle?.presentacion && (
              <ul className="treatment-detail__meta">
                <li>
                  <i className="bi bi-droplet-half" aria-hidden="true"></i>
                  {detalle.presentacion}
                </li>
              </ul>
            )}

            {detalle?.queEs && (
              <section className="treatment-detail__section">
                <span className="eyebrow">¿Qué es?</span>
                <p className="treatment-detail__section-text">{detalle.queEs}</p>
              </section>
            )}

            {detalle?.queHace?.length > 0 && (
              <section className="treatment-detail__section">
                <span className="eyebrow">¿Qué hace?</span>
                <div className="treatment-detail__benefit-list">
                  {detalle.queHace.map((beneficio) => (
                    <div className="treatment-detail__benefit-row" key={beneficio.titulo}>
                      <h3 className="treatment-detail__benefit-title">{beneficio.titulo}</h3>
                      <p className="treatment-detail__benefit-text">{beneficio.texto}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="treatment-detail__notice">
              <i className="bi bi-info-circle" aria-hidden="true"></i>
              <p>
                <strong>Importante:</strong> todos los tratamientos requieren un diagnóstico previo. La
                entrevista puede realizarse de manera virtual o presencial.
              </p>
            </div>

            <div className="treatment-detail__actions">
              <Link to="/turnos" className="btn-brand btn-brand-primary">
                <i className="bi bi-calendar-check" aria-hidden="true"></i>
                Pedir turno
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
