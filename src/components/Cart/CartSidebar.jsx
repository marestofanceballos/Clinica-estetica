import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { crearPedido } from "../../services/pedidosService";
import { formatPrecio } from "../../utils/format";
import "./cartSidebar.css";

const initialForm = {
  nombre: "",
  telefono: "",
  email: "",
  calle: "",
  localidad: "",
  provincia: "",
  codigoPostal: "",
  nota: "",
};

const CAMPOS = [
  { name: "nombre", label: "Nombre y apellido", type: "text", autoComplete: "name" },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "calle", label: "Calle y número", type: "text", autoComplete: "street-address" },
  { name: "localidad", label: "Localidad", type: "text", autoComplete: "address-level2", half: true },
  { name: "provincia", label: "Provincia", type: "text", autoComplete: "address-level1", half: true },
  { name: "codigoPostal", label: "Código postal", type: "text", autoComplete: "postal-code", half: true },
];

function validar(form) {
  const errores = {};
  if (!form.nombre.trim()) errores.nombre = "Ingresá tu nombre y apellido.";
  if (!form.telefono.trim()) errores.telefono = "Ingresá un teléfono de contacto.";
  if (!form.email.trim()) {
    errores.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errores.email = "Ingresá un email válido.";
  }
  if (!form.calle.trim()) errores.calle = "Ingresá la calle y el número.";
  if (!form.localidad.trim()) errores.localidad = "Ingresá la localidad.";
  if (!form.provincia.trim()) errores.provincia = "Ingresá la provincia.";
  if (!form.codigoPostal.trim()) errores.codigoPostal = "Ingresá el código postal.";
  return errores;
}

export default function CartSidebar({ open, onClose }) {
  const { items, incrementItem, decrementItem, removeItem, totalPrecio, cantidadTotal } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral("");

    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    setEnviando(true);
    try {
      const { linkDePago } = await crearPedido({ items, comprador: form });
      window.location.href = linkDePago;
    } catch (err) {
      setErrores(err.errores ?? {});
      setErrorGeneral(err.errores?.items ?? err.message);
      setEnviando(false);
    }
  };

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
          <form className="cart-sidebar__checkout" onSubmit={handleSubmit} noValidate>
            <div className="cart-sidebar__scroll">
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

              <div className="cart-sidebar__form">
                <h4>Datos de envío</h4>

                <div className="cart-sidebar__fields">
                  {CAMPOS.map((campo) => (
                    <div
                      key={campo.name}
                      className={`cart-sidebar__field ${campo.half ? "cart-sidebar__field--half" : ""}`}
                    >
                      <label htmlFor={`cart-${campo.name}`}>{campo.label}</label>
                      <input
                        id={`cart-${campo.name}`}
                        name={campo.name}
                        type={campo.type}
                        autoComplete={campo.autoComplete}
                        value={form[campo.name]}
                        onChange={handleChange}
                        className={errores[campo.name] ? "is-invalid" : ""}
                      />
                      {errores[campo.name] && (
                        <span className="cart-sidebar__field-error">{errores[campo.name]}</span>
                      )}
                    </div>
                  ))}

                  <div className="cart-sidebar__field">
                    <label htmlFor="cart-nota">Nota (opcional)</label>
                    <textarea
                      id="cart-nota"
                      name="nota"
                      rows="2"
                      value={form.nota}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total">
                <span>Total</span>
                <strong>{formatPrecio(totalPrecio)}</strong>
              </div>
              <p className="cart-sidebar__note">
                Al finalizar la compra vas a pagar de forma segura con Mercado Pago.
              </p>
              {errorGeneral && <p className="cart-sidebar__error">{errorGeneral}</p>}
              <button type="submit" className="btn-brand btn-brand-primary w-100" disabled={enviando}>
                {enviando ? "Redirigiendo a Mercado Pago..." : "Finalizar compra"}
              </button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
