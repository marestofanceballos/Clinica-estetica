import { Link } from "react-router-dom";
import logoSol from "../../assets/images/logo_sc_footer_blanco.png";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-narrow site-footer__top">
        <div className="site-footer__brand">
          <img src={logoSol} alt="Sol Ceballos" className="site-footer__logo" />
          <p>
            Clínica de armonización orofacial dedicada a resultados naturales, seguros y
            personalizados.
          </p>
          <div className="site-footer__socials">
            <a href="https://www.instagram.com/solarmonizacionfacial?utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://www.facebook.com/share/18oRLDNirW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a href="https://www.tiktok.com/@solarmonizacionfacial?_r=1&_t=ZS-99Ge34PjZLB" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
             <i className="bi bi-tiktok" aria-hidden="true"></i>
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
            <li><Link to="/tratamientos">Tratamientos</Link></li>
            <li><Link to="/primera-consulta">Primera consulta</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Contacto</h4>
          <ul className="site-footer__contact">
            <li><i className="bi bi-telephone" aria-hidden="true"></i> +54 9 1137055547</li>
            <li><i className="bi bi-envelope" aria-hidden="true"></i> dra.solangeceballosr@gmail.com</li>
            <li><i className="bi bi-clock" aria-hidden="true"></i> Lunes , Martes , Jueves y Viernes de 14 a 20 hs (Beccar)
                  Miercoles de 8 a 14 hs (Martinez)</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container-narrow site-footer__bottom-inner">
          <span>© {year} Armonización Orofacial. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
