import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import tratamientosRoutes from "./routes/tratamientos.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import uploadsRoutes from "./routes/uploads.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { UPLOADS_DIR } from "./lib/uploadsDir.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(UPLOADS_DIR));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tratamientos", tratamientosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/pedidos", pedidosRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use(errorHandler);

export default app;
