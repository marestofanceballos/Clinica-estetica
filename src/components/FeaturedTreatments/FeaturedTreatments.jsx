import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import { getTratamientosDestacados } from "../../services/tratamientosService";
import { formatPrecio } from "../../utils/format";
import "./featuredTreatments.css";

export default function FeaturedTreatments() {
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    getTratamientosDestacados().then((data) => {
      if (activo) {
        setTratamientos(data);
        setLoading(false);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <section className="section featured-treatments">
      <div className="container-narrow">
        <div className="section-head d-flex flex-wrap justify-content-between align-items-end">
          <div>
            <span className="eyebrow">Tratamientos</span>
            <h2 className="section-title">
              Los favoritos para realzar <em>tu belleza natural</em>
            </h2>
          </div>
          <Link to="/tratamientos" className="featured-treatments__link">
            Ver todos los tratamientos
            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </Link>
        </div>

        {loading ? (
          <Loader label="Cargando tratamientos" />
        ) : (
          <div className="row g-4">
            {tratamientos.map((tratamiento) => (
              <div className="col-12 col-sm-6 col-lg-3" key={tratamiento.id}>
                <Card
                  imagen={tratamiento.imagen}
                  tag={tratamiento.categoria}
                  titulo={tratamiento.nombre}
                  texto={tratamiento.resumen}
                  meta={tratamiento.precioDesde ? `Desde ${formatPrecio(tratamiento.precioDesde)}` : "Consultar valor"}
                  to={`/tratamientos/${tratamiento.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
