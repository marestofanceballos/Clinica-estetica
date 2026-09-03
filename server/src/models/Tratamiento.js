import mongoose from "mongoose";

const beneficioSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
  },
  { _id: false }
);

const tratamientoSchema = new mongoose.Schema(
  {
    // El _id es el slug (ej. "sculptra"), para mantener las URLs
    // /tratamientos/:id legibles y estables. Se define al crear y no
    // se modifica al editar.
    _id: { type: String },
    nombre: { type: String, required: true },
    categoria: { type: String, required: true, default: "Facial" },
    resumen: { type: String, required: true },
    imagen: { type: String, required: true },
    precioDesde: { type: Number, default: null },
    destacado: { type: Boolean, default: false },
    introduccion: { type: String, default: null },
    queEs: { type: String, default: null },
    // El orden del array es el orden en que se muestran los beneficios.
    queHace: { type: [beneficioSchema], default: [] },
    presentacion: { type: String, default: null },
    indicaciones: { type: [String], default: [] },
  },
  { timestamps: true }
);

tratamientoSchema.index({ destacado: 1 });

tratamientoSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Tratamiento = mongoose.model("Tratamiento", tratamientoSchema);
