const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CANTIDAD = 99;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Valida el payload del checkout (ítems + datos del comprador).
 * Devuelve un objeto `errores` (vacío si no hay errores), con la misma
 * forma que usan los formularios del frontend.
 */
export function validatePedido(payload) {
  const errores = {};
  const comprador = payload?.comprador ?? {};
  const items = payload?.items;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some(
      (item) =>
        !isNonEmptyString(item?.id) ||
        !Number.isInteger(item?.cantidad) ||
        item.cantidad < 1 ||
        item.cantidad > MAX_CANTIDAD
    )
  ) {
    errores.items = "El carrito no es válido.";
  }

  if (!isNonEmptyString(comprador.nombre)) {
    errores.nombre = "Ingresá tu nombre y apellido.";
  }

  if (!isNonEmptyString(comprador.telefono)) {
    errores.telefono = "Ingresá un teléfono de contacto.";
  }

  if (!isNonEmptyString(comprador.email) || !EMAIL_RE.test(comprador.email.trim())) {
    errores.email = "Ingresá un email válido.";
  }

  if (!isNonEmptyString(comprador.calle)) {
    errores.calle = "Ingresá la calle y el número.";
  }

  if (!isNonEmptyString(comprador.localidad)) {
    errores.localidad = "Ingresá la localidad.";
  }

  if (!isNonEmptyString(comprador.provincia)) {
    errores.provincia = "Ingresá la provincia.";
  }

  if (!isNonEmptyString(comprador.codigoPostal)) {
    errores.codigoPostal = "Ingresá el código postal.";
  }

  if (comprador.nota !== undefined && comprador.nota !== null && typeof comprador.nota !== "string") {
    errores.nota = "La nota no es válida.";
  }

  return errores;
}
