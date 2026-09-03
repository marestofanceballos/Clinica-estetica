import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./navbar.css";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/primera-consulta", label: "Primera consulta" },
  { to: "/tienda", label: "Tienda" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cantidadTotal } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className={`site-navbar ${scrolled ? "site-navbar--scrolled" : ""}`}>
      <nav className="container-narrow site-navbar__inner">
        <Link to="/" className="site-navbar__brand" onClick={() => setMenuOpen(false)}>
          <img src="/logo1.png" alt="" className="site-navbar__logo" />
          <span className="site-navbar__divider" aria-hidden="true"></span>
          <span className="site-navbar__wordmark">
            <span>Armonización</span>
            <span>Orofacial</span>
          </span>
        </Link>

        <ul className={`site-navbar__links ${menuOpen ? "is-open" : ""}`}>
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => (isActive ? "is-active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="site-navbar__actions">
          <Link to="/turnos" className="btn-brand btn-brand-primary btn-brand-sm site-navbar__cta">
            Pedir turno
          </Link>

          <button
            type="button"
            className="site-navbar__cart"
            onClick={onOpenCart}
            aria-label="Abrir carrito de compras"
          >
            <i className="bi bi-bag" aria-hidden="true"></i>
            {cantidadTotal > 0 && <span className="site-navbar__cart-badge">{cantidadTotal}</span>}
          </button>

          <button
            type="button"
            className="site-navbar__toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
