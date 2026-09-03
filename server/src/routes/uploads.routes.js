import { Router } from "express";
import { uploadTratamientoImagen as uploadTratamientoMiddleware } from "../middleware/uploadTratamientoImagen.js";
import { uploadProductoImagen as uploadProductoMiddleware } from "../middleware/uploadProductoImagen.js";
import { uploadTratamientoImagen, uploadProductoImagen } from "../controllers/uploads.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/tratamientos", requireAuth, uploadTratamientoMiddleware, uploadTratamientoImagen);
router.post("/productos", requireAuth, uploadProductoMiddleware, uploadProductoImagen);

export default router;
