import { Router } from "express";
import { uploadImagen } from "../middleware/createImageUpload.js";
import { uploadTratamientoImagen, uploadProductoImagen } from "../controllers/uploads.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/tratamientos", requireAuth, uploadImagen, uploadTratamientoImagen);
router.post("/productos", requireAuth, uploadImagen, uploadProductoImagen);

export default router;
