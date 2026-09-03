import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads");
export const TRATAMIENTOS_UPLOADS_DIR = path.join(UPLOADS_DIR, "tratamientos");
export const PRODUCTOS_UPLOADS_DIR = path.join(UPLOADS_DIR, "productos");

fs.mkdirSync(TRATAMIENTOS_UPLOADS_DIR, { recursive: true });
fs.mkdirSync(PRODUCTOS_UPLOADS_DIR, { recursive: true });
