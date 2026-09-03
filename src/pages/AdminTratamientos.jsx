import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import { getTratamientos, deleteTratamiento } from "../services/tratamientosService";
import { formatPrecio } from "../utils/format";
import "../styles/admin.css";

const MAX_DESTACADOS = 4;

export default function AdminTratamientos() {
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const [pendienteEliminar, setPendienteEliminar] = useState(null);

  const cargar = () => {
    setLoading(true);
    getTratamientos()
      .then((data) => setTratamientos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(cargar, []);

  const confirmarEliminar = async () => {
    const tratamiento = pendienteEliminar;
    setPendienteEliminar(null);

    setEliminandoId(tratamiento.id);
    try {
      await deleteTratamiento(tratamiento.id);
      setTratamientos((prev) => prev.filter((t) => t.id !== tratamiento.id));
    } catch (err) {
      alert(err.message);
    } finally {
      setEliminandoId(null);
    }
  };

  const cantidadDestacados = tratamientos.filter((t) => t.destacado).length;

  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <h1>Tratamientos</h1>
          <div className="admin-toolbar__meta">
            <span className={`admin-counter ${cantidadDestacados >= MAX_DESTACADOS ? "admin-counter--full" : ""}`}>
              {cantidadDestacados}/{MAX_DESTACADOS} destacados en Inicio
            </span>
          </div>
        </div>
        <Link to="/admin/tratamientos/nuevo" className="btn-brand btn-brand-primary">
          <i className="bi bi-plus-lg" aria-hidden="true"></i>
          Nuevo tratamiento
        </Link>
      </div>

      {loading ? (
        <Loader label="Cargando tratamientos" />
      ) : error ? (
        <p className="admin-form-error">{error}</p>
      ) : tratamientos.length === 0 ? (
        <p className="admin-empty">Todavía no cargaste ningún tratamiento.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Destacado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tratamientos.map((tratamiento) => (
                <tr key={tratamiento.id}>
                  <td>
                    <img src={tratamiento.imagen} alt="" className="admin-table__thumb" />
                  </td>
                  <td>{tratamiento.nombre}</td>
                  <td>{tratamiento.categoria}</td>
                  <td>{tratamiento.precioDesde ? formatPrecio(tratamiento.precioDesde) : "Consultar"}</td>
                  <td>{tratamiento.destacado ? "Sí" : "No"}</td>
                  <td>
                    <div className="admin-table__actions">
                      <Link to={`/admin/tratamientos/${tratamiento.id}/editar`}>Editar</Link>
                      <button
                        type="button"
                        className="is-danger"
                        onClick={() => setPendienteEliminar(tratamiento)}
                        disabled={eliminandoId === tratamiento.id}
                      >
                        {eliminandoId === tratamiento.id ? "Eliminando..." : "Eliminar"}
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
        title="Eliminar tratamiento"
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
