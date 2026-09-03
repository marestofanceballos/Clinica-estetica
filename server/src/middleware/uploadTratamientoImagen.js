import { createImageUploadMiddleware } from "./createImageUpload.js";
import { TRATAMIENTOS_UPLOADS_DIR } from "../lib/uploadsDir.js";

export const uploadTratamientoImagen = createImageUploadMiddleware(TRATAMIENTOS_UPLOADS_DIR);
