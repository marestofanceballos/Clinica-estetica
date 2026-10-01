import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader/Loader";
import { getProductos } from "../services/productosService";
import "../styles/tienda.css";

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getProductos().then((data) => {
      setProductos(data);
      setLoading(false);
    });
  }, []);

  const listaFiltrada = useMemo(() => {
    return productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }, [productos, busqueda]);

  return (
    <div className="tienda-page">
      <PageHeader
        eyebrow="Tienda"
        title="Skincare para cuidar tu piel entre sesiones"
        lede="Productos seleccionados por mí para acompañar y prolongar los resultados de cada tratamiento."
      />

      <section className="section pt-0">
        <div className="container-narrow">
          <div className="d-flex justify-content-end mb-5">
            <input
              type="search"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="shop-search"
              aria-label="Buscar producto"
            />
          </div>

          {loading ? (
            <Loader label="Cargando productos" />
          ) : listaFiltrada.length === 0 ? (
            <p className="text-center py-5">No encontramos productos que coincidan con tu búsqueda.</p>
          ) : (
            <div className="row g-4">
              {listaFiltrada.map((producto) => (
                <div className="col-12 col-sm-6 col-lg-3" key={producto.id}>
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
