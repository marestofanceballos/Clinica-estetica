import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { getProductosDestacados } from "../../services/productosService";
import "./products.css";

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    getProductosDestacados().then((data) => {
      if (activo) {
        setProductos(data);
        setLoading(false);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  // La cantidad de destacados tiene un máximo de 4 (validado en el
  // servidor). La grilla se reparte en ese número de columnas parejas
  // en vez de reservar siempre 4 espacios, para no dejar huecos vacíos
  // cuando hay menos.
  const columnasDestacados = Math.max(1, Math.min(productos.length, 4));
  const columnaDestacadosClass = `col-lg-${12 / columnasDestacados}`;

  return (
    <section className="section bg-alt products-home">
      <div className="container-narrow">
        <div className="section-head text-center mx-auto">
          <span className="eyebrow justify-content-center">Tienda</span>
          <h2 className="section-title mx-auto">
            Skincare pensado para <em>acompañar tus resultados</em>
          </h2>
          <p className="section-lede mx-auto">
            Productos seleccionados para cuidar tu piel en casa y potenciar el efecto de cada
            tratamiento.
          </p>
        </div>

        {loading ? (
          <Loader label="Cargando productos" />
        ) : (
          <div className="row g-4">
            {productos.map((producto) => (
              <div className={`col-12 col-sm-6 ${columnaDestacadosClass}`} key={producto.id}>
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Link to="/tienda" className="btn-brand btn-brand-outline">
            Ver toda la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}
