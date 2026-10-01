import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useCart } from "../context/CartContext";
import { confirmarPago } from "../services/pedidosService";
import "../styles/pago.css";

export default function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const datosCompletos = Boolean(paymentId && externalReference);

  // "verificando" | "pagado" | "pendiente" | "error"
  const [estado, setEstado] = useState(datosCompletos ? "verificando" : "error");
  const [error, setError] = useState(datosCompletos ? "" : "No recibimos los datos del pago.");

  useEffect(() => {
    if (!datosCompletos) return undefined;
    let activo = true;

    confirmarPago({ paymentId, externalReference })
      .then((data) => {
        if (!activo) return;
        if (data.estado === "pendiente") {
          setEstado("pendiente");
          return;
        }
        clearCart();
        setEstado("pagado");
      })
      .catch((err) => {
        if (!activo) return;
        setError(err.message);
        setEstado("error");
      });

    return () => {
      activo = false;
    };
    // clearCart cambia de referencia al vaciar el carrito; no debe re-disparar la confirmación.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosCompletos, paymentId, externalReference]);

  return (
    <div className="pago-page">
      <div className="container-narrow">
        {estado === "verificando" && <Loader label="Confirmando tu pago" />}

        {estado === "pagado" && (
          <div className="pago-page__card">
            <i className="bi bi-check-circle" aria-hidden="true"></i>
            <h1>¡Gracias por tu compra!</h1>
            <p>
              Tu pago fue aprobado y ya recibimos tu pedido. Nos vamos a comunicar con vos para
              coordinar el envío.
            </p>
            <Link to="/tienda" className="btn-brand btn-brand-primary">
              Volver a la tienda
            </Link>
          </div>
        )}

        {estado === "pendiente" && (
          <div className="pago-page__card">
            <i className="bi bi-hourglass-split" aria-hidden="true"></i>
            <h1>Tu pago todavía no está aprobado</h1>
            <p>
              Mercado Pago aún no confirmó el pago. Apenas se acredite vamos a preparar tu pedido.
            </p>
            <Link to="/tienda" className="btn-brand btn-brand-primary">
              Volver a la tienda
            </Link>
          </div>
        )}

        {estado === "error" && (
          <div className="pago-page__card">
            <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
            <h1>No pudimos confirmar tu pago</h1>
            <p>{error} Si el pago se debitó, escribinos y lo revisamos.</p>
            <Link to="/contacto" className="btn-brand btn-brand-primary">
              Contactanos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
