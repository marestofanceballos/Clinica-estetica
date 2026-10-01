import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ProductCard from "../components/ProductCard/ProductCard";
import { getProductoPorId, getProductos } from "../services/productosService";
import { useCart } from "../context/CartContext";
import { formatPrecio } from "../utils/format";
import "../styles/product-detail.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setNotFound(false);
    setImagenActiva(0);
    setCantidad(1);
    setAgregado(false);

    getProductoPorId(id)
      .then((data) => {
        if (!activo) return;
        setProducto(data);
        setLoading(false);
        getProductos().then((todos) => {
          if (activo) {
            setRelacionados(
              todos.filter((p) => p.id !== id && p.categoria === data.categoria).slice(0, 4)
            );
          }
        });
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
      <div className="section pt-0" style={{ paddingTop: "calc(var(--nav-height) + 40px)" }}>
        <Loader label="Cargando producto" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container-narrow text-center" style={{ paddingTop: "calc(var(--nav-height) + 100px)", paddingBottom: 100 }}>
        <h2>No encontramos este producto</h2>
        <p>Es posible que ya no esté disponible en la tienda.</p>
        <button type="button" className="btn-brand btn-brand-primary" onClick={() => navigate("/tienda")}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i += 1) {
      addItem({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen });
    }
    setAgregado(true);
  };

  return (
    <div className="product-detail" style={{ paddingTop: "calc(var(--nav-height) + 48px)" }}>
      <div className="container-narrow">
        <nav className="product-detail__breadcrumb" aria-label="breadcrumb">
          <Link to="/tienda">Tienda</Link>
          <i className="bi bi-chevron-right" aria-hidden="true"></i>
          <span>{producto.nombre}</span>
        </nav>

        <div className="row g-5">
          <div className="col-12 col-lg-6">
            <div className="product-detail__gallery">
              <div className="product-detail__main-image">
                <img src={producto.imagenes[imagenActiva]} alt={producto.nombre} />
              </div>
              <div className="product-detail__thumbs">
                {producto.imagenes.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    className={index === imagenActiva ? "is-active" : ""}
                    onClick={() => setImagenActiva(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <span className="tag-pill mb-3">{producto.categoria}</span>
            <h1 className="product-detail__title">{producto.nombre}</h1>
            <p className="product-detail__price">{formatPrecio(producto.precio)}</p>
            <p className="product-detail__desc">{producto.descripcion}</p>

            <ul className="product-detail__meta">
              <li>
                <i className="bi bi-box-seam" aria-hidden="true"></i>
                {producto.stock > 0 ? `${producto.stock} unidades disponibles` : "Sin stock"}
              </li>
              <li>
                <i className="bi bi-truck" aria-hidden="true"></i>
                Envíos a todo el país
              </li>
            </ul>

            <div className="product-detail__actions">
              <div className="product-detail__qty">
                <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar cantidad">
                  <i className="bi bi-dash"></i>
                </button>
                <span>{cantidad}</span>
                <button type="button" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar cantidad">
                  <i className="bi bi-plus"></i>
                </button>
              </div>
              <button type="button" className="btn-brand btn-brand-primary" onClick={handleAgregar}>
                <i className="bi bi-bag-plus" aria-hidden="true"></i>
                Agregar al carrito
              </button>
            </div>

            {agregado && (
              <p className="product-detail__confirm">
                <i className="bi bi-check-circle" aria-hidden="true"></i> Producto agregado al carrito.
              </p>
            )}

            <a
              href={`https://wa.me/5491137055547?text=${encodeURIComponent(
                `Hola! Quiero consultar sobre una devolución del producto ${producto.nombre}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="product-detail__devolucion"
            >
              ¿Necesitás devolver un producto? Escribinos
            </a>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="product-detail__related">
            <h3 className="section-title">También te puede interesar</h3>
            <div className="row g-4">
              {relacionados.map((p) => (
                <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
                  <ProductCard producto={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
