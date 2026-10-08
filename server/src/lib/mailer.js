const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const formatPrecio = (valor) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(valor);

function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Los mails se envían con la API HTTP de Brevo (y no por SMTP) porque
// Render bloquea el SMTP en el plan gratis. GMAIL_USER es el remitente
// de todos los correos y el destinatario del aviso de nuevo pedido.
function getRemitente() {
  const user = process.env.GMAIL_USER;
  const apiKey = process.env.BREVO_API_KEY;

  if (!user || !apiKey) {
    throw new Error("Faltan GMAIL_USER o BREVO_API_KEY en server/.env.");
  }

  return { user, apiKey };
}

async function enviarMail({ apiKey, from, to, subject, text, html }) {
  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: from },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`Brevo respondió ${res.status}: ${detalle}`);
  }
}

function formatDireccion(direccion) {
  return `${direccion.calle}, ${direccion.localidad}, ${direccion.provincia} (CP ${direccion.codigoPostal})`;
}

/**
 * Envía al comprador la confirmación de su compra, a la dirección de
 * email que cargó en el checkout.
 */
export async function enviarConfirmacionAlComprador(pedido) {
  const { user, apiKey } = getRemitente();

  const { comprador, direccion, items, total } = pedido;
  const direccionTexto = formatDireccion(direccion);

  const text = [
    `¡Hola ${comprador.nombre}!`,
    "",
    "Gracias por tu compra. Recibimos tu pago y ya estamos preparando tu pedido.",
    "",
    "Productos:",
    ...items.map((item) => `- ${item.nombre} x ${item.cantidad}`),
    "",
    `Total pagado: ${formatPrecio(total)}`,
    "",
    `Dirección de envío: ${direccionTexto}`,
    "Si algún dato de la dirección no es correcto, respondé este email y lo corregimos.",
  ].join("\n");

  const html = `
    <p>¡Hola ${escapeHtml(comprador.nombre)}!</p>
    <p>Gracias por tu compra. Recibimos tu pago y ya estamos preparando tu pedido.</p>
    <p><strong>Productos:</strong></p>
    <ul>${items.map((item) => `<li>${escapeHtml(item.nombre)} x ${item.cantidad}</li>`).join("")}</ul>
    <p><strong>Total pagado:</strong> ${formatPrecio(total)}</p>
    <p><strong>Dirección de envío:</strong> ${escapeHtml(direccionTexto)}<br>
    Si algún dato de la dirección no es correcto, respondé este email y lo corregimos.</p>
  `;

  await enviarMail({
    apiKey,
    from: user,
    to: comprador.email,
    subject: "Confirmamos tu compra en Armonización Orofacial",
    text,
    html,
  });
}

/**
 * Envía el aviso de "nuevo pedido" desde y hacia GMAIL_USER.
 */
export async function enviarAvisoNuevoPedido(pedido) {
  const { user, apiKey } = getRemitente();

  const { comprador, direccion, items, total, nota } = pedido;
  const direccionTexto = formatDireccion(direccion);

  const text = [
    `Comprador: ${comprador.nombre}`,
    `Teléfono: ${comprador.telefono}`,
    `Dirección de envío: ${direccionTexto}`,
    "",
    "Productos:",
    ...items.map((item) => `- ${item.nombre} x ${item.cantidad}`),
    "",
    `Total: ${formatPrecio(total)}`,
    ...(nota ? ["", `Nota: ${nota}`] : []),
  ].join("\n");

  const html = `
    <p><strong>Comprador:</strong> ${escapeHtml(comprador.nombre)}<br>
    <strong>Teléfono:</strong> ${escapeHtml(comprador.telefono)}<br>
    <strong>Dirección de envío:</strong> ${escapeHtml(direccionTexto)}</p>
    <p><strong>Productos:</strong></p>
    <ul>${items.map((item) => `<li>${escapeHtml(item.nombre)} x ${item.cantidad}</li>`).join("")}</ul>
    <p><strong>Total:</strong> ${formatPrecio(total)}</p>
    ${nota ? `<p><strong>Nota:</strong> ${escapeHtml(nota)}</p>` : ""}
  `;

  await enviarMail({
    apiKey,
    from: user,
    to: user,
    subject: "Nuevo pedido en Armonización Orofacial",
    text,
    html,
  });
}
