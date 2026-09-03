import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getProductoPorId, createProducto, updateProducto } from "../services/productosService";
import { uploadProductoImagen } from "../services/uploadsService";
import AdminImageField from "../components/AdminImageField/AdminImageField";
import { slugify } from "../utils/slugify";
import "../styles/admin.css";

const initialForm = {
  id: "",
  nombre: "",
  categoria: "Skincare",
  precio: "",
  stock: "",
  imagen: "",
  resumen: "",
  destacado: false,
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
    errores.resumen = "La descripción corta es obligatoria.";
  }

  if (!form.imagen.trim()) {
    errores.imagen = "La imagen es obligatoria.";
  }

  if (form.precio === "" || Number.isNaN(Number(form.precio)) || Number(form.precio) < 0) {
    errores.precio = "El precio debe ser un número mayor o igual a 0.";
  }

  if (form.stock === "" || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0) {
    errores.stock = "El stock debe ser un número mayor o igual a 0.";
  }

  return errores;
}

export default function AdminProductoForm() {
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
    getProductoPorId(id)
      .then((producto) => {
        if (!activo) return;
        setForm({
          id: producto.id,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio ?? "",
          stock: producto.stock ?? "",
          imagen: producto.imagen,
          resumen: producto.resumen,
          destacado: Boolean(producto.destacado),
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
        await updateProducto(id, payload);
      } else {
        await createProducto(payload);
      }
      navigate("/admin/productos", { replace: true });
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
    return <Loader label="Cargando producto" />;
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h1>{isEdit ? "Editar producto" : "Nuevo producto"}</h1>
        <Link to="/admin/productos" className="btn-brand btn-brand-outline btn-brand-sm">
          Volver al listado
        </Link>
      </div>

      {errorGeneral && <p className="admin-form-error">{errorGeneral}</p>}

      <form className="admin-form" onSubmit={handleSubmit} noValidate>
        <div className="admin-form-grid">
          <div className="admin-field admin-field--full">
            <label htmlFor="nombre">Nombre del producto</label>
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
            <label htmlFor="id">Identificador (usado en la URL /tienda/...)</label>
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
            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="0"
              value={form.precio}
              onChange={handleChange}
              className={errores.precio ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.precio)}
            />
            {errores.precio && <span className="admin-field__error">{errores.precio}</span>}
          </div>

          <div className="admin-field">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              className={errores.stock ? "is-invalid" : ""}
              aria-invalid={Boolean(errores.stock)}
            />
            {errores.stock && <span className="admin-field__error">{errores.stock}</span>}
          </div>

          <AdminImageField
            id="imagen"
            label="Imagen del producto"
            value={form.imagen}
            onChange={handleImagenChange}
            uploadFn={uploadProductoImagen}
            error={errores.imagen}
          />

          <div className="admin-field admin-field--full">
            <label htmlFor="resumen">Descripción corta (se muestra en la tarjeta)</label>
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

        <div className="admin-form-actions">
          <button type="submit" className="btn-brand btn-brand-primary" disabled={guardando}>
            {guardando ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
          <Link to="/admin/productos" className="btn-brand btn-brand-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
