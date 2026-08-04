/**
 * Simula el envío de una solicitud de turno.
 * No realiza ninguna petición real: resuelve luego de un pequeño delay
 * para poder mostrar estados de carga/éxito en la UI.
 *
 * TODO backend: reemplazar por `api.post('/turnos', datosFormulario)` con Axios,
 * apuntando a tu API Node/Express + MongoDB.
 */
export function solicitarTurno(datosFormulario) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, mensaje: "Solicitud recibida", datos: datosFormulario });
    }, 900);
  });
}
