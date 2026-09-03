import { useState } from "react";
import "./adminImageField.css";

/**
 * Campo de imagen reutilizable para los formularios del panel admin:
 * URL editable a mano + subida de archivo (que completa la URL sola) +
 * vista previa. `uploadFn` recibe el File y debe resolver { url }.
 */
export default function AdminImageField({ id = "imagen", label = "Imagen", value, onChange, uploadFn, error }) {
  const [subiendo, setSubiendo] = useState(false);
  const [errorSubida, setErrorSubida] = useState("");

  const handleFile = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setSubiendo(true);
    setErrorSubida("");

    try {
      const { url } = await uploadFn(archivo);
      onChange(url);
    } catch (err) {
      setErrorSubida(err.message);
    } finally {
      setSubiendo(false);
      e.target.value = "";
    }
  };

  return (
    <div className="admin-field admin-field--full">
      <label htmlFor={id}>{label}</label>

      {value && <img src={value} alt="" className="admin-image-preview" />}

      <div className="admin-image-row">
        <input
          id={id}
          type="text"
          placeholder="https://... (o subí un archivo)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "is-invalid" : ""}
          aria-invalid={Boolean(error)}
        />
        <label className="btn-brand btn-brand-outline btn-brand-sm admin-image-upload">
          {subiendo ? "Subiendo..." : "Subir archivo"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} disabled={subiendo} hidden />
        </label>
      </div>

      <span className="admin-field__hint">Formatos permitidos: JPG, PNG o WEBP. Máximo 5MB.</span>
      {errorSubida && <span className="admin-field__error">{errorSubida}</span>}
      {error && <span className="admin-field__error">{error}</span>}
    </div>
  );
}
