import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    // El _id es el slug (ej. "serum-vitamina-c"), para mantener las URLs
    // /tienda/:id legibles y estables. Se define al crear y no se modifica al editar.
    _id: { type: String },
    nombre: { type: String, required: true },
    categoria: { type: String, required: true, default: "Skincare" },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    imagen: { type: String, required: true },
    // Galería para la página de detalle. Si no se carga desde el admin,
    // se completa con [imagen] para que la tienda pública siempre tenga
    // al menos una foto para mostrar.
    imagenes: { type: [String], default: [] },
    resumen: { type: String, required: true },
    descripcion: { type: String, default: null },
    destacado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productoSchema.index({ destacado: 1 });

productoSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Producto = mongoose.model("Producto", productoSchema);
