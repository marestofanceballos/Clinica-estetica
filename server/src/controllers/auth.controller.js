import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";
import { HttpError } from "../utils/httpError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new HttpError(400, "Usuario y contraseña son obligatorios.");
  }

  const admin = await AdminUser.findOne({ username });
  const passwordOk = admin ? await bcrypt.compare(password, admin.passwordHash) : false;

  if (!admin || !passwordOk) {
    throw new HttpError(401, "Usuario o contraseña incorrectos.");
  }

  const token = jwt.sign({ sub: admin.id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // El token viaja en el cuerpo (y no en una cookie): el frontend y la API
  // están en dominios distintos y Safari bloquea las cookies entre sitios.
  res.json({ token, username: admin.username });
});

// El cierre de sesión lo hace el frontend borrando el token guardado.
export const logout = asyncHandler(async (req, res) => {
  res.json({ ok: true });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ username: req.admin.username });
});
