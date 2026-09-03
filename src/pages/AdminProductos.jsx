import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import { getProductos, deleteProducto } from "../services/productosService";
import { formatPrecio } from "../utils/format";
import "../styles/admin.css";

const MAX_DESTACADOS = 4;

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const [pendienteEliminar, setPendienteEliminar] = useState(null);

  const cargar = () => {
    setLoading(true);
    getProductos()
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(cargar, []);

  const confirmarEliminar = async () => {
    const producto = pendienteEliminar;
    setPendienteEliminar(null);

    setEliminandoId(producto.id);
    try {
      await deleteProducto(producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== producto.id));
    } catch (err) {
      alert(err.message);
    } finally {
      setEliminandoId(null);
    }
  };

  const cantidadDestacados = productos.filter((p) => p.destacado).length;

  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <h1>Productos</h1>
          <div className="admin-toolbar__meta">
            <span className={`admin-counter ${cantidadDestacados >= MAX_DESTACADOS ? "admin-counter--full" : ""}`}>
              {cantidadDestacados}/{MAX_DESTACADOS} destacados en Inicio
            </span>
          </div>
        </div>
        <Link to="/admin/productos/nuevo" className="btn-brand btn-brand-primary">
          <i className="bi bi-plus-lg" aria-hidden="true"></i>
          Nuevo producto
        </Link>
      </div>

      {loading ? (
        <Loader label="Cargando productos" />
      ) : error ? (
        <p className="admin-form-error">{error}</p>
      ) : productos.length === 0 ? (
        <p className="admin-empty">Todavía no cargaste ningún producto.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Destacado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img src={producto.imagen} alt="" className="admin-table__thumb" />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{formatPrecio(producto.precio)}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.destacado ? "Sí" : "No"}</td>
                  <td>
                    <div className="admin-table__actions">
                      <Link to={`/admin/productos/${producto.id}/editar`}>Editar</Link>
                      <button
                        type="button"
                        className="is-danger"
                        onClick={() => setPendienteEliminar(producto)}
                        disabled={eliminandoId === producto.id}
                      >
                        {eliminandoId === producto.id ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendienteEliminar)}
        title="Eliminar producto"
        message={
          pendienteEliminar
            ? `¿Eliminar "${pendienteEliminar.nombre}"? Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Eliminar"
        onConfirm={confirmarEliminar}
        onCancel={() => setPendienteEliminar(null)}
      />
    </div>
  );
}
