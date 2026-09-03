import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getTratamientoPorId, createTratamiento, updateTratamiento } from "../services/tratamientosService";
import { uploadTratamientoImagen } from "../services/uploadsService";
import AdminImageField from "../components/AdminImageField/AdminImageField";
import { slugify } from "../utils/slugify";
import "../styles/admin.css";

const initialForm = {
  id: "",
  nombre: "",
  categoria: "Facial",
  resumen: "",
  imagen: "",
  precioDesde: "",
  destacado: false,
  introduccion: "",
  queEs: "",
  queHace: [{ titulo: "", texto: "" }],
  presentacion: "",
  indicaciones: [],
};

function validar(form) {
  const errores = {};

  if (!form.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (!form.categoria.trim()) {
    errores.categoria = "La categoría es obligatoria.";
  }

  if (!form.resumen.trim()) {
    errores.resumen = "El resumen corto es obligatorio.";
  }

  if (!form.imagen.trim()) {
    errores.imagen = "La URL de la imagen es obligatoria.";
  }

  if (form.precioDesde !== "" && (Number.isNaN(Number(form.precioDesde)) || Number(form.precioDesde) < 0)) {
    errores.precioDesde = "El precio debe ser un número mayor o igual a 0.";
  }

  if (form.queHace.some((item) => !item.titulo.trim() || !item.texto.trim())) {
    errores.queHace = "Completá título y texto en cada beneficio, o quitá los que no uses.";
  }

  return errores;
}

export default function AdminTratamientoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [idEditadoManualmente, setIdEditadoManualmente] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cargando, setCargando] = useState(isEdit);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    let activo = true;
    getTratamientoPorId(id)
      .then((tratamiento) => {
        if (!activo) return;
        setForm({
          id: tratamiento.id,
          nombre: tratamiento.nombre,
          categoria: tratamiento.categoria,
          resumen: tratamiento.resumen,
          imagen: tratamiento.imagen,
          precioDesde: tratamiento.precioDesde ?? "",
          destacado: Boolean(tratamiento.destacado),
          introduccion: tratamiento.detalle?.introduccion ?? "",
          queEs: tratamiento.detalle?.queEs ?? "",
          queHace: tratamiento.detalle?.queHace?.length ? tratamiento.detalle.queHace : [{ titulo: "", texto: "" }],
          presentacion: tratamiento.detalle?.presentacion ?? "",
          indicaciones: tratamiento.detalle?.indicaciones ?? [],
        });
        setIdEditadoManualmente(true);
      })
      .catch((err) => setErrorGeneral(err.message))
      .finally(() => setCargando(false));

    return () => {
      activo = false;
    };
  }, [id, isEdit]);

  const idSugerido = useMemo(() => slugify(form.nombre), [form.nombre]);

  const limpiarError = (campo) => {
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
    if (errorGeneral) setErrorGeneral("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valor = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const next = { ...prev, [name]: valor };
      if (name === "nombre" && !isEdit && !idEditadoManualmente) {
        next.id = slugify(value);
      }
      return next;
    });

    limpiarError(name);
  };

  const handleIdChange = (e) => {
    setIdEditadoManualmente(true);
    setForm((prev) => ({ ...prev, id: e.target.value }));
    limpiarError("id");
  };

  const handleImagenChange = (url) => {
    setForm((prev) => ({ ...prev, imagen: url }));
    limpiarError("imagen");
  };

  const handleBeneficioChange = (index, campo, valor) => {
    setForm((prev) => ({
      ...prev,
      queHace: prev.queHace.map((item, i) => (i === index ? { ...item, [campo]: valor } : item)),
    }));
    limpiarError("queHace");
  };

  const agregarBeneficio = () => {
    setForm((prev) => ({ ...prev, queHace: [...prev.queHace, { titulo: "", texto: "" }] }));
  };

  const quitarBeneficio = (index) => {
    setForm((prev) => ({ ...prev, queHace: prev.queHace.filter((_, i) => i !== index) }));
  };

  const handleIndicacionChange = (index, valor) => {
    setForm((prev) => ({
      ...prev,
      indicaciones: prev.indicaciones.map((item, i) => (i === index ? valor : item)),
    }));
  };

  const agregarIndicacion = () => {
    setForm((prev) => ({ ...prev, indicaciones: [...prev.indicaciones, ""] }));
  };

  const quitarIndicacion = (index) => {
    setForm((prev) => ({ ...prev, indicaciones: prev.indicaciones.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, id: isEdit ? form.id : form.id || idSugerido };
    const erroresValidacion = validar(payload);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    setGuardando(true);
    setErrorGeneral("");

    try {
      if (isEdit) {
        await updateTratamiento(id, payload);
      } else {
        await createTratamiento(payload);
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      if (err.errores) {
        setErrores(err.errores);
      }
      setErrorGeneral(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <Loader label="Cargando tratamiento" />;
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h1>{isEdit ? "Editar tratamiento" : "Nuevo tratamiento"}</h1>
        <Link to="/admin" className="btn-brand btn-brand-outline btn-brand-sm">
          Volver al listado
        </Link>
      </div>

      {errorGeneral && <p className="admin-form-error">{errorGeneral}</p>}

      <form className="admin-form" onSubmit={handleSubmit} noValidate>
        <div className="admin-form-grid">
          <div className="admin-field admin-field--full">
            <label htmlFor="nombre">Nombre del tratamiento</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              className={errores.nombre ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.nombre)}
            />
            {errores.nombre && <span className="admin-field__error">{errores.nombre}</span>}
          </div>

          <div className="admin-field admin-field--full">
            <label htmlFor="id">Identificador (usado en la URL /tratamientos/...)</label>
            <input
              id="id"
              name="id"
              type="text"
              value={isEdit ? form.id : form.id || idSugerido}
              onChange={handleIdChange}
              disabled={isEdit}
              className={errores.id ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.id)}
            />
            <span className="admin-field__hint">
              {isEdit
                ? "No se puede modificar una vez creado, para no romper enlaces existentes."
                : "Se genera solo a partir del nombre. Solo minúsculas, números y guiones."}
            </span>
            {errores.id && <span className="admin-field__error">{errores.id}</span>}
          </div>

          <div className="admin-field">
            <label htmlFor="categoria">Categoría</label>
            <input
              id="categoria"
              name="categoria"
              type="text"
              value={form.categoria}
              onChange={handleChange}
              className={errores.categoria ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.categoria)}
            />
            {errores.categoria && <span className="admin-field__error">{errores.categoria}</span>}
          </div>

          <div className="admin-field">
            <label htmlFor="precioDesde">Precio (opcional)</label>
            <input
              id="precioDesde"
              name="precioDesde"
              type="number"
              min="0"
              placeholder="Dejalo vacío para mostrar “Consultar valor”"
              value={form.precioDesde}
              onChange={handleChange}
              className={errores.precioDesde ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.precioDesde)}
            />
            {errores.precioDesde && <span className="admin-field__error">{errores.precioDesde}</span>}
          </div>

          <AdminImageField
            id="imagen"
            label="Imagen del tratamiento"
            value={form.imagen}
            onChange={handleImagenChange}
            uploadFn={uploadTratamientoImagen}
            error={errores.imagen}
          />

          <div className="admin-field admin-field--full">
            <label htmlFor="resumen">Resumen corto (se muestra en la tarjeta)</label>
            <textarea id="resumen" name="resumen" value={form.resumen} onChange={handleChange} rows={2} />
            {errores.resumen && <span className="admin-field__error">{errores.resumen}</span>}
          </div>

          <div className="admin-field admin-field--full admin-field--checkbox">
            <input
              id="destacado"
              name="destacado"
              type="checkbox"
              checked={form.destacado}
              onChange={handleChange}
            />
            <label htmlFor="destacado">Destacado (aparece en la página principal — máximo 4 a la vez)</label>
          </div>
          {errores.destacado && <span className="admin-field__error">{errores.destacado}</span>}
        </div>

        <div className="admin-form-section">
          <h2>Información detallada</h2>
          <p className="admin-form-section__hint">Se muestra en la página individual del tratamiento.</p>

          <div className="admin-field">
            <label htmlFor="introduccion">Introducción breve</label>
            <textarea
              id="introduccion"
              name="introduccion"
              value={form.introduccion}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="queEs">¿Qué es?</label>
            <textarea id="queEs" name="queEs" value={form.queEs} onChange={handleChange} rows={3} />
          </div>

          <div className="admin-field">
            <label htmlFor="presentacion">Presentación</label>
            <textarea
              id="presentacion"
              name="presentacion"
              value={form.presentacion}
              onChange={handleChange}
              rows={2}
            />
          </div>
        </div>

        <div className="admin-form-section">
          <h2>¿Qué hace?</h2>
          <p className="admin-form-section__hint">Cada beneficio se muestra con su título y su texto, en este orden.</p>

          {errores.queHace && <p className="admin-field__error">{errores.queHace}</p>}

          {form.queHace.map((beneficio, index) => (
            <div className="admin-repeatable-item" key={index}>
              {form.queHace.length > 1 && (
                <button
                  type="button"
                  className="admin-repeatable-item__remove"
                  onClick={() => quitarBeneficio(index)}
                  aria-label="Quitar beneficio"
                >
                  <i className="bi bi-x-lg" aria-hidden="true"></i>
                </button>
              )}
              <div className="admin-field">
                <label>Título</label>
                <input
                  type="text"
                  value={beneficio.titulo}
                  onChange={(e) => handleBeneficioChange(index, "titulo", e.target.value)}
                />
              </div>
              <div className="admin-field" style={{ marginBottom: 0 }}>
                <label>Texto</label>
                <textarea
                  rows={2}
                  value={beneficio.texto}
                  onChange={(e) => handleBeneficioChange(index, "texto", e.target.value)}
                />
              </div>
            </div>
          ))}

          <button type="button" className="admin-repeatable-add" onClick={agregarBeneficio}>
            + Agregar beneficio
          </button>
        </div>

        <div className="admin-form-section">
          <h2>Indicaciones (opcional)</h2>
          <p className="admin-form-section__hint">Lista de indicaciones o usos recomendados.</p>

          {form.indicaciones.map((indicacion, index) => (
            <div className="admin-indicacion-row" key={index}>
              <input
                type="text"
                value={indicacion}
                onChange={(e) => handleIndicacionChange(index, e.target.value)}
              />
              <button
                type="button"
                className="admin-repeatable-item__remove"
                onClick={() => quitarIndicacion(index)}
                aria-label="Quitar indicación"
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>
          ))}

          <button type="button" className="admin-repeatable-add" onClick={agregarIndicacion}>
            + Agregar indicación
          </button>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-brand btn-brand-primary" disabled={guardando}>
            {guardando ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear tratamiento"}
          </button>
          <Link to="/admin" className="btn-brand btn-brand-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
