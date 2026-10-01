import mongoose from "mongoose";

export const ESTADOS_PEDIDO = ["pendiente", "pagado", "enviado"];

// Copia de los datos del producto al momento de la compra: si después
// cambia el precio o el nombre en la tienda, el pedido no se altera.
const itemSchema = new mongoose.Schema(
  {
    productoId: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const pedidoSchema = new mongoose.Schema(
  {
    comprador: {
      nombre: { type: String, required: true },
      telefono: { type: String, required: true },
      email: { type: String, required: true },
    },
    direccion: {
      calle: { type: String, required: true },
      localidad: { type: String, required: true },
      provincia: { type: String, required: true },
      codigoPostal: { type: String, required: true },
    },
    nota: { type: String, default: null },
    items: { type: [itemSchema], required: true },
    total: { type: Number, required: true },
    estado: { type: String, enum: ESTADOS_PEDIDO, default: "pendiente" },
    // Id del pago en Mercado Pago. Se completa al confirmar el pago.
    pagoId: { type: String, default: null },
    pagadoEn: { type: Date, default: null },
    enviadoEn: { type: Date, default: null },
  },
  { timestamps: true }
);

pedidoSchema.index({ createdAt: -1 });

pedidoSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Pedido = mongoose.model("Pedido", pedidoSchema);
