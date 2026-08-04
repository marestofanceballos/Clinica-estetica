import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrecio } from "../../utils/format";
import "./productCard.css";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
  };

  return (
    <article className="product-card card-elegant">
      <Link to={`/tienda/${producto.id}`} className="product-card__media">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
        <span className="tag-pill product-card__tag">{producto.categoria}</span>
      </Link>
      <div className="product-card__body">
        <Link to={`/tienda/${producto.id}`} className="product-card__title">
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
