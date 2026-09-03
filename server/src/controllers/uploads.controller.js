import { asyncHandler } from "../middleware/asyncHandler.js";

export const uploadTratamientoImagen = asyncHandler(async (req, res) => {
  const url = `${req.protocol}://${req.get("host")}/uploads/tratamientos/${req.file.filename}`;
  res.status(201).json({ url });
});

export const uploadProductoImagen = asyncHandler(async (req, res) => {
  const url = `${req.protocol}://${req.get("host")}/uploads/productos/${req.file.filename}`;
  res.status(201).json({ url });
});
