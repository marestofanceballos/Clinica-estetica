import { Link } from "react-router-dom";
import "../styles/pago.css";

export default function PagoPendiente() {
  return (
    <div className="pago-page">
      <div className="container-narrow">
        <div className="pago-page__card">
          <i className="bi bi-hourglass-split" aria-hidden="true"></i>
          <h1>Tu pago está pendiente</h1>
          <p>
            Mercado Pago todavía está procesando el pago. Apenas se acredite vamos a preparar tu
            pedido y nos comunicamos con vos.
          </p>
          <Link to="/tienda" className="btn-brand btn-brand-primary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
