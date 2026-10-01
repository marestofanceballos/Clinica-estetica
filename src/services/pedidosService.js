import api from "./api";

/**
 * Crea el pedido y devuelve el link de pago de Mercado Pago.
 * Solo se envían ids y cantidades: los precios los resuelve el backend.
 */
export function crearPedido({ items, comprador }) {
  return api
    .post("/pedidos", {
      items: items.map((item) => ({ id: item.id, cantidad: item.cantidad })),
      comprador,
    })
    .then((res) => res.data);
}

/**
 * Confirma el pago al volver de Mercado Pago. El backend verifica el
 * pago contra la API de Mercado Pago antes de marcar el pedido como pagado.
 */
export function confirmarPago({ paymentId, externalReference }) {
  return api
    .post("/pedidos/confirmar", { payment_id: paymentId, external_reference: externalReference })
    .then((res) => res.data);
}

// --- A partir de acá, uso exclusivo del panel de administración ---

export function getPedidos() {
  return api.get("/pedidos").then((res) => res.data);
}

export function marcarPedidoEnviado(id) {
  return api.patch(`/pedidos/${id}/enviado`).then((res) => res.data);
}
