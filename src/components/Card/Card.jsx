import { Link } from "react-router-dom";
import "./card.css";

/**
 * Card genérica reutilizable (no es la card de producto, que tiene
 * su propia lógica de carrito — ver components/ProductCard).
 */
export default function Card({ imagen, tag, titulo, texto, to, meta, ctaLabel = "Ver más" }) {
  return (
    <article className="brand-card card-elegant">
      {imagen && (
        <div className="brand-card__media">
          <img src={imagen} alt={titulo} loading="lazy" />
        </div>
      )}
      <div className="brand-card__body">
        {tag && <span className="tag-pill">{tag}</span>}
        <h3 className="brand-card__title">{titulo}</h3>
        {texto && <p className="brand-card__text">{texto}</p>}
        <div className="brand-card__footer">
          {meta && <span className="brand-card__meta">{meta}</span>}
          {to && (
            <Link to={to} className="brand-card__link stretched-link">
              {ctaLabel}
              <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
