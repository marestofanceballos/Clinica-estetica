// Express 4 no reenvía automáticamente los rechazos de promesas de un
// controller async al error handler. Este wrapper evita repetir
// try/catch en cada controller.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
