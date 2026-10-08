import { asyncHandler } from "../middleware/asyncHandler.js";
import { subirImagen } from "../lib/cloudinary.js";

// Devuelven la URL completa (https) de Cloudinary, que es la que el admin
// guarda después en el tratamiento o producto.
export const uploadTratamientoImagen = asyncHandler(async (req, res) => {
  const url = await subirImagen(req.file.buffer, "clinica/tratamientos");
  res.status(201).json({ url });
});

export const uploadProductoImagen = asyncHandler(async (req, res) => {
  const url = await subirImagen(req.file.buffer, "clinica/productos");
  res.status(201).json({ url });
});
