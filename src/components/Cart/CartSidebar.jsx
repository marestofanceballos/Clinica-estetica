import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrecio } from "../../utils/format";
import "./cartSidebar.css";

export default function CartSidebar({ open, onClose }) {
  const { items, incrementItem, decrementItem, removeItem, totalPrecio, cantidadTotal } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${open ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside className={`cart-sidebar ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="cart-sidebar__header">
          <h3>Tu carrito ({cantidadTotal})</h3>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito">
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-sidebar__empty">
            <i className="bi bi-bag" aria-hidden="true"></i>
            <p>Todavía no agregaste productos.</p>
            <Link to="/tienda" className="btn-brand btn-brand-outline btn-brand-sm" onClick={onClose}>
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-sidebar__list">
              {items.map((item) => (
                <li key={item.id}>
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="cart-sidebar__item-info">
                    <span className="cart-sidebar__item-name">{item.nombre}</span>
                    <span className="cart-sidebar__item-price">{formatPrecio(item.precio)}</span>
                    <div className="cart-sidebar__qty">
                      <button type="button" onClick={() => decrementItem(item.id)} aria-label="Restar cantidad">
                        <i className="bi bi-dash" aria-hidden="true"></i>
                      </button>
                      <span>{item.cantidad}</span>
                      <button type="button" onClick={() => incrementItem(item.id)} aria-label="Sumar cantidad">
                        <i className="bi bi-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-sidebar__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ${item.nombre}`}
                  >
                    <i className="bi bi-trash3" aria-hidden="true"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total">
                <span>Total</span>
                <strong>{formatPrecio(totalPrecio)}</strong>
              </div>
              <p className="cart-sidebar__note">
                Esta es una vista previa del carrito. La compra se habilitará al conectar el
                sistema de pagos.
              </p>
              <button type="button" className="btn-brand btn-brand-primary w-100" disabled>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
