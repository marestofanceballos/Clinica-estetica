import api from "./api";

export function uploadTratamientoImagen(file) {
  const formData = new FormData();
  formData.append("imagen", file);

  return api.post("/uploads/tratamientos", formData).then((res) => res.data);
}

export function uploadProductoImagen(file) {
  const formData = new FormData();
  formData.append("imagen", file);

  return api.post("/uploads/productos", formData).then((res) => res.data);
}
