import { Router } from "express";
import { list, getById, create, update, remove } from "../controllers/productos.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", list);
router.get("/:id", getById);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
