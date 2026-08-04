// Datos de ejemplo (mock) de la tienda.
// Al conectar el backend, reemplazar por la respuesta de tu API REST
// (por ejemplo GET /api/productos) manteniendo esta misma forma de objeto.

export const productos = [
  {
    id: "serum-vitamina-c",
    nombre: "Sérum Vitamina C 20%",
    categoria: "Skincare",
    precio: 28000,
    stock: 14,
    imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Antioxidante y luminosidad inmediata para todo tipo de piel.",
    descripcion:
      "Fórmula concentrada al 20% de vitamina C estabilizada que ilumina el tono de piel, unifica manchas y protege frente al daño ambiental. Uso diario en rutina matutina.",
    destacado: true,
  },
  {
    id: "crema-acido-hialuronico",
    nombre: "Crema Ácido Hialurónico",
    categoria: "Skincare",
    precio: 24500,
    stock: 20,
    imagen: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600428853876-fb5a850b444c?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Hidratación profunda de larga duración, textura ligera.",
    descripcion:
      "Combina ácido hialurónico de distinto peso molecular para hidratar en profundidad y mantener la piel con aspecto turgente durante todo el día.",
    destacado: true,
  },
  {
    id: "protector-solar-fps50",
    nombre: "Protector Solar FPS 50",
    categoria: "Skincare",
    precio: 22000,
    stock: 30,
    imagen: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Protección de amplio espectro con toque seco, sin dejar residuo blanco.",
    descripcion:
      "Filtros de última generación que protegen frente a UVA/UVB y luz azul, con acabado invisible ideal para uso bajo maquillaje.",
    destacado: true,
  },
  {
    id: "limpiador-facial-suave",
    nombre: "Limpiador Facial Suave",
    categoria: "Skincare",
    precio: 18500,
    stock: 25,
    imagen: "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Limpieza respetuosa del manto hidrolipídico, apto piel sensible.",
    descripcion:
      "Gel-crema de limpieza sin sulfatos agresivos, formulado para retirar impurezas sin resecar ni alterar el equilibrio natural de la piel.",
    destacado: false,
  },
  {
    id: "contorno-ojos",
    nombre: "Contorno de Ojos Reafirmante",
    categoria: "Skincare",
    precio: 26500,
    stock: 12,
    imagen: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Reduce bolsas y líneas finas en la zona más delicada del rostro.",
    descripcion:
      "Activos descongestivos y reafirmantes en una textura fresca de rápida absorción, ideal para aplicar mañana y noche.",
    destacado: false,
  },
  {
    id: "mascarilla-arcilla-rosa",
    nombre: "Mascarilla de Arcilla Rosa",
    categoria: "Skincare",
    precio: 16000,
    stock: 18,
    imagen: "https://images.unsplash.com/photo-1600428853876-fb5a850b444c?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1600428853876-fb5a850b444c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Purifica y matifica sin resecar, uso 2 veces por semana.",
    descripcion:
      "Arcilla rosa de origen mineral que absorbe el exceso de sebo y deja la piel visiblemente más suave y luminosa tras cada uso.",
    destacado: false,
  },
  {
    id: "aceite-facial-nutritivo",
    nombre: "Aceite Facial Nutritivo",
    categoria: "Skincare",
    precio: 27500,
    stock: 10,
    imagen: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Blend de aceites botánicos que nutre y da elasticidad a la piel.",
    descripcion:
      "Mezcla de aceites de rosa mosqueta, jojoba y escualano vegetal para pieles secas o desvitalizadas, ideal en rutina nocturna.",
    destacado: false,
  },
  {
    id: "kit-post-tratamiento",
    nombre: "Kit Post-Tratamiento",
    categoria: "Kits",
    precio: 39000,
    stock: 15,
    imagen: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop",
    imagenes: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop",
    ],
    resumen: "Set recomendado para el cuidado de la piel después de cada sesión.",
    descripcion:
      "Incluye limpiador suave, crema reparadora y protector solar en tamaño viaje, pensado especialmente para el cuidado post-procedimiento.",
    destacado: true,
  },
];

export const categoriasProductos = ["Todos", "Skincare", "Kits"];
