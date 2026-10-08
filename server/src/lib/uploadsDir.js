import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Las imágenes nuevas se suben a Cloudinary. Esta carpeta solo se sigue
// sirviendo para las fotos que se subieron antes, mientras se reemplazan
// desde el admin.
export const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads");
