import "./whatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5491137055547?text=Hola%2C%20quiero%20consultar%20por%20un%20turno"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Escribir por WhatsApp"
    >
      <i className="bi bi-whatsapp" aria-hidden="true"></i>
    </a>
  );
}
