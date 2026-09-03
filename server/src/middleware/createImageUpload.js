import crypto from "node:crypto";
import multer from "multer";
import { HttpError } from "../utils/httpError.js";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const EXTENSION_BY_MIMETYPE = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

/**
 * Crea un middleware de subida de una sola imagen (campo "imagen") hacia
 * `destDir`, con nombre único, validando formato (jpg/png/webp) y tamaño
 * máximo (5MB). Traduce los errores de multer al formato de error que ya
 * maneja errorHandler.js (HttpError → { error }).
 */
export function createImageUploadMiddleware(destDir) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, destDir),
    filename: (req, file, cb) => {
      const extension = EXTENSION_BY_MIMETYPE[file.mimetype];
      cb(null, `${crypto.randomUUID()}${extension}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE_BYTES },
    fileFilter: (req, file, cb) => {
      if (!EXTENSION_BY_MIMETYPE[file.mimetype]) {
        cb(new Error("Formato no permitido. Usá una imagen JPG, PNG o WEBP."));
        return;
      }
      cb(null, true);
    },
  });

  return function handleImageUpload(req, res, next) {
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
  };
}
