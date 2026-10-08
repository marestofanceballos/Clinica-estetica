import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import { getPedidos, marcarPedidoEnviado, deletePedido } from "../services/pedidosService";
import { formatPrecio } from "../utils/format";
import "../styles/admin.css";

const ESTADO_LABEL = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  enviado: "Enviado",
};

function formatFecha(fecha) {
  return new Date(fecha).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
}

function mensajeEliminar(pedido) {
  if (pedido.estado === "pendiente") {
    return `¿Eliminar el pedido de ${pedido.comprador.nombre}? Esta acción no se puede deshacer.`;
  }

  const estado = pedido.estado === "pagado" ? "pago" : "enviado";
  return `Este pedido ya está ${estado}. ¿Eliminarlo igual? Esta acción no se puede deshacer y no devuelve el stock.`;
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actualizandoId, setActualizandoId] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [pendienteEliminar, setPendienteEliminar] = useState(null);

  useEffect(() => {
    getPedidos()
      .then((data) => setPedidos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const marcarEnviado = async (pedido) => {
    setActualizandoId(pedido.id);
    try {
      const actualizado = await marcarPedidoEnviado(pedido.id);
      setPedidos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)));
    } catch (err) {
      alert(err.message);
    } finally {
      setActualizandoId(null);
    }
  };

  const confirmarEliminar = async () => {
    const pedido = pendienteEliminar;
    setPendienteEliminar(null);

    setEliminandoId(pedido.id);
    try {
      await deletePedido(pedido.id);
      setPedidos((prev) => prev.filter((p) => p.id !== pedido.id));
    } catch (err) {
      alert(err.message);
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <h1>Pedidos</h1>
      </div>

      {loading ? (
        <Loader label="Cargando pedidos" />
      ) : error ? (
        <p className="admin-form-error">{error}</p>
      ) : pedidos.length === 0 ? (
        <p className="admin-empty">Todavía no hay pedidos.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Comprador</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{formatFecha(pedido.createdAt)}</td>
                  <td>{pedido.comprador.nombre}</td>
                  <td>{pedido.comprador.telefono}</td>
                  <td className="admin-table__multiline">
                    <span>{pedido.direccion.calle}</span>
                    <span>
                      {pedido.direccion.localidad}, {pedido.direccion.provincia} (CP{" "}
                      {pedido.direccion.codigoPostal})
                    </span>
                    {pedido.nota && <span>Nota: {pedido.nota}</span>}
                  </td>
                  <td className="admin-table__multiline">
                    {pedido.items.map((item) => (
                      <span key={item.productoId}>
                        {item.nombre} x {item.cantidad}
                      </span>
                    ))}
                  </td>
                  <td>{formatPrecio(pedido.total)}</td>
                  <td>
                    <span className={`admin-estado admin-estado--${pedido.estado}`}>
                      {ESTADO_LABEL[pedido.estado]}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      {pedido.estado === "pagado" && (
                        <button
                          type="button"
                          onClick={() => marcarEnviado(pedido)}
                          disabled={actualizandoId === pedido.id}
                        >
                          {actualizandoId === pedido.id ? "Guardando..." : "Marcar como enviado"}
                        </button>
                      )}
                      <button
                        type="button"
                        className="is-danger"
                        onClick={() => setPendienteEliminar(pedido)}
                        disabled={eliminandoId === pedido.id}
                        aria-label="Eliminar pedido"
                      >
                        <i className="bi bi-trash3" aria-hidden="true"></i>
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
        title="Eliminar pedido"
        message={pendienteEliminar ? mensajeEliminar(pendienteEliminar) : ""}
        confirmLabel="Eliminar"
        onConfirm={confirmarEliminar}
        onCancel={() => setPendienteEliminar(null)}
      />
    </div>
  );
}
