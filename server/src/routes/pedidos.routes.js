import { Router } from "express";
import { list, create, confirmar, marcarEnviado } from "../controllers/pedidos.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/", create);
router.post("/confirmar", confirmar);
router.get("/", requireAuth, list);
router.patch("/:id/enviado", requireAuth, marcarEnviado);

export default router;
