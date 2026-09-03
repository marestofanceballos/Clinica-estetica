import { createImageUploadMiddleware } from "./createImageUpload.js";
import { PRODUCTOS_UPLOADS_DIR } from "../lib/uploadsDir.js";

export const uploadProductoImagen = createImageUploadMiddleware(PRODUCTOS_UPLOADS_DIR);
