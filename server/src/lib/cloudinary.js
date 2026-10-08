import { v2 as cloudinary } from "cloudinary";
import { HttpError } from "../utils/httpError.js";

// Se configura recién al usarlo (y no al importar el módulo) para que el
// resto de la API siga funcionando aunque falten las credenciales.
function configurar() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new HttpError(503, "La subida de imágenes no está configurada.");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Sube una imagen (buffer en memoria) a la carpeta indicada de Cloudinary
 * y devuelve su URL pública (https).
 */
export async function subirImagen(buffer, carpeta) {
  configurar();

  try {
    const resultado = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: carpeta, resource_type: "image" }, (err, result) =>
          err ? reject(err) : resolve(result)
        )
        .end(buffer);
    });

    return resultado.secure_url;
  } catch (err) {
    console.error("Cloudinary rechazó la imagen:", err?.message ?? err);
    throw new HttpError(502, "No pudimos guardar la imagen. Probá de nuevo en unos minutos.");
  }
}
