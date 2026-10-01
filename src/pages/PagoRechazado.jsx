import { Link } from "react-router-dom";
import "../styles/pago.css";

export default function PagoRechazado() {
  return (
    <div className="pago-page">
      <div className="container-narrow">
        <div className="pago-page__card">
          <i className="bi bi-x-circle" aria-hidden="true"></i>
          <h1>No pudimos procesar tu pago</h1>
          <p>
            El pago fue rechazado o cancelado y no se realizó ningún cobro. Tu carrito sigue
            guardado: podés intentarlo de nuevo con otro medio de pago.
          </p>
          <Link to="/tienda" className="btn-brand btn-brand-primary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
