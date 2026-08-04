import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-narrow site-footer__top">
        <div className="site-footer__brand">
          <img src="/logo.svg" alt="Armonización Orofacial" className="site-footer__logo" width="72" height="72" />
          <p>
            Clínica de armonización orofacial dedicada a resultados naturales, seguros y
            personalizados.
          </p>
          <div className="site-footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a href="https://wa.me/5493810000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/tratamientos">Tratamientos</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/sobre-mi">Sobre mí</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Clínica</h4>
          <ul>
            <li><Link to="/turnos">Pedir turno</Link></li>
            <li><Link to="/tratamientos">Armonización facial</Link></li>
            <li><Link to="/tratamientos">Rejuvenecimiento</Link></li>
            <li><Link to="/tienda">Skincare</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Contacto</h4>
          <ul className="site-footer__contact">
            <li><i className="bi bi-geo-alt" aria-hidden="true"></i> Av. Siempre Viva 1234, Aguilares, Tucumán</li>
            <li><i className="bi bi-telephone" aria-hidden="true"></i> +54 381 000-0000</li>
            <li><i className="bi bi-envelope" aria-hidden="true"></i> hola@armonizacionorofacial.com</li>
            <li><i className="bi bi-clock" aria-hidden="true"></i> Lun a Vie, 9 a 19 hs</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container-narrow site-footer__bottom-inner">
          <span>© {year} Armonización Orofacial. Todos los derechos reservados.</span>
          <span className="site-footer__legal">Diseño y desarrollo web</span>
        </div>
      </div>
    </footer>
  );
}
