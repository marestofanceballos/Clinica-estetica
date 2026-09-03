import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return next(new HttpError(401, "No hay sesión activa."));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.sub, username: payload.username };
    return next();
  } catch {
    return next(new HttpError(401, "Sesión inválida o vencida."));
  }
}
