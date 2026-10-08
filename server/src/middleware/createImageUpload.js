import multer from "multer";
import { HttpError } from "../utils/httpError.js";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const MIMETYPES_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];

// La imagen queda en memoria (req.file.buffer) y el controller la sube a
// Cloudinary: el disco de Render se borra en cada reinicio.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!MIMETYPES_PERMITIDOS.includes(file.mimetype)) {
      cb(new Error("Formato no permitido. Usá una imagen JPG, PNG o WEBP."));
      return;
    }
    cb(null, true);
  },
});

/**
 * Middleware de subida de una sola imagen (campo "imagen"), validando
 * formato (jpg/png/webp) y tamaño máximo (5MB). Traduce los errores de
 * multer al formato de error que ya maneja errorHandler.js
 * (HttpError → { error }).
 */
export function uploadImagen(req, res, next) {
  upload.single("imagen")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new HttpError(400, "La imagen no puede superar los 5MB."));
      }
      return next(new HttpError(400, err.message));
    }

    if (err) {
      return next(new HttpError(400, err.message));
    }

    if (!req.file) {
      return next(new HttpError(400, "No se recibió ninguna imagen."));
    }

    return next();
  });
}
