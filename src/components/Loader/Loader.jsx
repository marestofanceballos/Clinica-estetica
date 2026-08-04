import "./loader.css";

export default function Loader({ label = "Cargando..." }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="loader-ring" aria-hidden="true"></span>
      <span className="loader-label">{label}</span>
    </div>
  );
}
