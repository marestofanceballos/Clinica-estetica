import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrecio } from "../../utils/format";
import "./productCard.css";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();
  const [imagenRota, setImagenRota] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
  };

  const mostrarPlaceholder = !producto.imagen || imagenRota;

  return (
    <article className="product-card card-elegant">
      <div className="product-card__media">
        {mostrarPlaceholder ? (
          <div className="product-card__media-placeholder">
            <i className="bi bi-image" aria-hidden="true"></i>
            <span>Sin imagen</span>
          </div>
        ) : (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            onError={() => setImagenRota(true)}
          />
        )}
        <span className="tag-pill product-card__tag">{producto.categoria}</span>
      </div>
      <div className="product-card__body">
        <Link to={`/tienda/${producto.id}`} className="product-card__title stretched-link">
          {producto.nombre}
        </Link>
        <p className="product-card__text">{producto.resumen}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrecio(producto.precio)}</span>
          <button
            type="button"
            className="product-card__add"
            onClick={handleAdd}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <i className="bi bi-bag-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  );
}
