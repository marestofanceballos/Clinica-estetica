import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../src/lib/db.js";
import { Tratamiento } from "../src/models/Tratamiento.js";
import { Producto } from "../src/models/Producto.js";
import { AdminUser } from "../src/models/AdminUser.js";
import { tratamientos } from "../../src/data/tratamientos.js";
import { productos } from "../../src/data/productos.js";

function toTratamientoRow(t) {
  return {
    nombre: t.nombre,
    categoria: t.categoria,
    resumen: t.resumen,
    imagen: t.imagen,
    precioDesde: t.precioDesde ?? null,
    destacado: Boolean(t.destacado),
    introduccion: t.detalle?.introduccion ?? null,
    queEs: t.detalle?.queEs ?? null,
    queHace: t.detalle?.queHace ?? [],
    presentacion: t.detalle?.presentacion ?? null,
    indicaciones: t.detalle?.indicaciones ?? [],
  };
}

async function seedTratamientos() {
  for (const t of tratamientos) {
    const row = toTratamientoRow(t);
    await Tratamiento.findByIdAndUpdate(t.id, { _id: t.id, ...row }, { upsert: true, new: true });
    console.log(`  ✓ ${t.id}`);
  }
}

function toProductoRow(p) {
  return {
    nombre: p.nombre,
    categoria: p.categoria,
    precio: p.precio,
    stock: p.stock ?? 0,
    imagen: p.imagen,
    imagenes: p.imagenes?.length ? p.imagenes : [p.imagen],
    resumen: p.resumen,
    descripcion: p.descripcion ?? p.resumen,
    destacado: Boolean(p.destacado),
  };
}

async function seedProductos() {
  for (const p of productos) {
    const row = toProductoRow(p);
    await Producto.findByIdAndUpdate(p.id, { _id: p.id, ...row }, { upsert: true, new: true });
    console.log(`  ✓ ${p.id}`);
  }
}

async function seedAdmin() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error("Definí ADMIN_USERNAME y ADMIN_PASSWORD en server/.env antes de seedear.");
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await AdminUser.findOneAndUpdate(
    { username: ADMIN_USERNAME },
    { username: ADMIN_USERNAME, passwordHash },
    { upsert: true, new: true }
  );
  console.log(`  ✓ admin "${ADMIN_USERNAME}"`);
}

async function main() {
  await connectDB();

  console.log("Sembrando tratamientos...");
  await seedTratamientos();

  console.log("Sembrando productos...");
  await seedProductos();

  console.log("Sembrando usuario admin...");
  await seedAdmin();

  console.log("Listo.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
