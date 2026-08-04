// Datos de ejemplo (mock). Cuando conectes tu API REST,
// este archivo se reemplaza por la respuesta real del backend
// manteniendo la misma forma de objeto.
//
// Cada tratamiento puede incluir un objeto `detalle` con la información
// completa que se muestra en su página individual (/tratamientos/:id).
// Si un tratamiento no tiene `detalle`, alcanza con sumarlo siguiendo
// la misma estructura que "bioestimulacion-regeneracion" para que su
// página individual se genere automáticamente.

export const tratamientos = [
  {
    id: "bioestimulacion-regeneracion",
    nombre: "Bioestimulación / Regeneración",
    categoria: "Facial",
    resumen:
      "Tratamiento regenerador que mejora la hidratación, estimula la producción de colágeno y ayuda a definir los contornos del rostro de forma natural.",
    // TODO: definir precio real — no se incluyó un valor de referencia.
    precioDesde: null,
    imagen: "/tratamientos/bioestimulacion-regeneracion.jpg",
    destacado: true,
    detalle: {
      introduccion:
        "Tratamiento regenerador que mejora la hidratación, estimula la producción de colágeno y ayuda a definir los contornos del rostro de forma natural.",
      queEs:
        "Fórmula única que combina ácido hialurónico de diferentes pesos moleculares con trehalosa, un estabilizador muy eficaz.",
      queHace: [
        {
          titulo: "Hidrata profundo",
          texto:
            "La trehalosa retiene agua mucho más tiempo que el ácido hialurónico solo, y potencia el efecto hidratante.",
        },
        {
          titulo: "Bioestimulación / Regeneración",
          texto:
            "Modula la matriz extracelular y estimula colágeno y elastina. Por eso se lo ubica en la categoría de regeneradores, no solo de volumen.",
        },
        {
          titulo: "Mejora la geometría y contornos del rostro",
          texto:
            "Es su indicación principal: reposicionar sin dar volumen artificial. Muy usado para tercio medio, línea mandibular, surcos y flacidez leve.",
        },
      ],
      presentacion: "1 jeringa de 2 ml con 70 mg/2 ml de ácido hialurónico + trehalosa.",
    },
  },
];

export const categoriasTratamientos = ["Todos", "Facial"];
