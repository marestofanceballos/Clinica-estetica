import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";
import { HttpError } from "../utils/httpError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  };
}

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

  res.cookie("token", token, cookieOptions());
  res.json({ username: admin.username });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", { ...cookieOptions(), maxAge: undefined });
  res.json({ ok: true });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ username: req.admin.username });
});
