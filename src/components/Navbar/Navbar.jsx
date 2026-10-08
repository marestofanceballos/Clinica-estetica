import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logoSol from "../../assets/images/logo_sc_navbar_negro.png";
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
  const { pathname } = useLocation();

  // En la página principal el logo no navega: sube suavemente hasta arriba.
  const handleBrandClick = (e) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className={`site-navbar ${scrolled ? "site-navbar--scrolled" : ""}`}>
        <nav className="container-narrow site-navbar__inner">
          <Link to="/" className="site-navbar__brand" onClick={handleBrandClick}>
            <img src={logoSol} alt="Sol Ceballos" className="site-navbar__logo" />
            <span className="site-navbar__tagline">Armonización facial</span>
          </Link>
  
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
              aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-controls="site-menu"
              aria-expanded={menuOpen}
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* El panel y el overlay van fuera del <header>: el backdrop-filter de
          la barra scrolleada haría que su position: fixed quede atrapado
          dentro de la barra en vez de ocupar toda la pantalla. */}
      <div
        className={`site-menu-overlay ${menuOpen ? "is-visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      <aside id="site-menu" className={`site-menu ${menuOpen ? "is-open" : ""}`} inert={!menuOpen}>
        <ul className="site-menu__links">
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
      </aside>
    </>
  );
}
