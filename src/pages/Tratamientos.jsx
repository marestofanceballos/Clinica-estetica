import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import { getTratamientos } from "../services/tratamientosService";
import { categoriasTratamientos } from "../data/tratamientos";
import { formatPrecio } from "../utils/format";

export default function Tratamientos() {
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todos");

  useEffect(() => {
    getTratamientos().then((data) => {
      setTratamientos(data);
      setLoading(false);
    });
  }, []);

  const listaFiltrada =
    categoria === "Todos" ? tratamientos : tratamientos.filter((t) => t.categoria === categoria);

  return (
    <>
      <PageHeader
        eyebrow="Tratamientos"
        title="Cada plan, diseñado a la medida de tu rostro"
        lede="Combinamos técnicas mínimamente invasivas para lograr resultados naturales, seguros y progresivos."
      />

      <section className="section pt-0">
        <div className="container-narrow">
         
          {loading ? (
            <Loader label="Cargando tratamientos" />
          ) : (
            <div className="row g-4">
              {listaFiltrada.map((tratamiento) => (
                <div className="col-12 col-sm-6 col-lg-4" key={tratamiento.id}>
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
    </>
  );
}
