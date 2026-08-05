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
    imagen: "https://i.postimg.cc/Zq1gT8g5/Tratamiento-1.jpg",
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

      presentacion:
        "1 jeringa de 2 ml con 70 mg/2 ml de ácido hialurónico + trehalosa.",
    },
  },

  {
    id: "acido-hialuronico-caha",
    nombre: "Ácido hialurónico + CaHA",
    categoria: "Facial",
    resumen:
      "Combina ácido hialurónico e hidroxiapatita de calcio para aportar un efecto lifting inmediato y estimular la producción de colágeno a largo plazo.",
    imagen: "https://i.postimg.cc/brQjXCwS/Tratamiento-2.jpg",
    destacado: true,

    detalle: {
      introduccion:
        "El nombre lo dice: AH de ácido hialurónico + CaHA de calcio.",

      queEs:
        "Es un tratamiento que combina ácido hialurónico con hidroxiapatita de calcio para conseguir un efecto inmediato y, a la vez, favorecer la regeneración y firmeza de la piel a largo plazo.",

      queHace: [
        {
          titulo: "Efecto inmediato - Ácido hialurónico",
          texto:
            "Da estructura y lifting instantáneo, hidrata y ayuda a reposicionar los tejidos.",
        },
        {
          titulo: "Efecto a largo plazo - Hidroxiapatita de calcio",
          texto:
            "Las microesferas de hidroxiapatita de calcio actúan en la dermis profunda y favorecen la bioestimulación, estimulando la producción de colágeno tipo I y III. Esto ayuda a mejorar la flacidez, la laxitud y la firmeza que el ácido hialurónico por sí solo no logra.",
        },
        {
          titulo: "En resumen",
          texto:
            "Levanta ahora y continúa mejorando la calidad y firmeza de la piel durante los meses siguientes.",
        },
      ],

      indicaciones: [
        "Tercio medio e inferior del rostro principalmente.",
        "Pérdida de contorno mandibular.",
        "Surcos nasolabiales profundos.",
        "Flacidez o descolgamiento leve a moderado.",
      ],

      presentacion:
        "Ácido hialurónico + hidroxiapatita de calcio.",
    },
  },

  {
  id: "sculptra",
  nombre: "Sculptra",
  categoria: "Facial",
  resumen:
    "Bioestimulador de colágeno a base de Ácido Poli-L-Láctico que actúa de forma progresiva para mejorar la firmeza, elasticidad y calidad de la piel.",
  imagen: "https://i.postimg.cc/Gh7XLPTh/Tratamiento-3.jpg",
  destacado: true,

  detalle: {
    introduccion:
      "Sculptra es un bioestimulador de colágeno a base de Ácido Poli-L-Láctico (PLLA), diseñado para estimular progresivamente la producción natural de colágeno.",

    queEs:
      "Es un polvo liofilizado de Ácido Poli-L-Láctico (PLLA), un polímero biocompatible y biodegradable. Se reconstituye con agua estéril y se inyecta para estimular la producción de colágeno.",

    queHace: [
      {
        titulo: "Estimula la producción de colágeno",
        texto:
          "El Ácido Poli-L-Láctico (PLLA) actúa como un inductor de colágeno, estimulando a los fibroblastos para producir nuevo colágeno tipo I.",
      },
      {
        titulo: "Actúa de forma progresiva",
        texto:
          "A diferencia de los tratamientos que generan un resultado inmediato, Sculptra produce cambios progresivos y naturales. Los primeros resultados pueden comenzar a observarse entre las 4 y 8 semanas, con una evolución que continúa durante los meses siguientes.",
      },
      {
        titulo: "Mejora la calidad de la piel",
        texto:
          "La estimulación de colágeno ayuda a mejorar la firmeza, elasticidad y apariencia general de la piel, contribuyendo a reducir la apariencia de arrugas finas y flacidez.",
      },
      {
        titulo: "Resultado natural",
        texto:
          "El efecto se desarrolla gradualmente a medida que el organismo produce su propio colágeno, por lo que el resultado es progresivo y natural.",
      },
    ],

    indicaciones: [
      "Pérdida de volumen relacionada con el paso del tiempo: pómulos, sienes y mejillas hundidas.",
      "Flacidez y laxitud facial.",
      "Flacidez y laxitud del cuello.",
      "Mejora de la calidad de la piel.",
      "Mejora de firmeza y elasticidad.",
      "Arrugas finas.",
    ],

    presentacion:
      "Ácido Poli-L-Láctico (PLLA), un polímero biocompatible y biodegradable.",
  },
},

{
  id: "hidratacion-profunda-neauvia",
  nombre: "Hidratación profunda",
  categoria: "Facial",
  resumen:
    "Hidratante inyectable que combina ácido hialurónico, aminoácidos e hidroxiapatita de calcio para revitalizar, hidratar y mejorar la calidad de la piel.",
  imagen: "https://i.postimg.cc/X7GC59Df/Tratamiento-4.jpg",
  // Esta foto es más vertical que el resto: mostrarla completa en vez de recortarla.
  imagenCompleta: true,
  destacado: true,

  detalle: {
    introduccion:
      "Es el hidratante inyectable con un plus: hidrata profundamente, revitaliza y mejora la calidad general de la piel sin aportar volumen.",

    queEs:
      "Hidrogel de ácido hialurónico no reticulado 18 mg/ml + glicina + L-prolina + 0,01% de hidroxiapatita de calcio. Es uno de los tratamientos más suaves del portfolio de Neauvia, por lo que puede aplicarse de manera superficial. No aporta volumen.",

    queHace: [
      {
        titulo: "Hidratación profunda",
        texto:
          "El ácido hialurónico no reticulado retiene agua y ayuda a conseguir un efecto glow, jugoso y de piel hidratada desde el interior.",
      },
      {
        titulo: "Bioestimulación ligera",
        texto:
          "La glicina y la L-prolina son aminoácidos que participan en la formación de colágeno. El 0,01% de hidroxiapatita de calcio aporta una microdosis que favorece la estimulación de los fibroblastos sin generar volumen.",
      },
      {
        titulo: "Mejora la calidad de la piel",
        texto:
          "Ayuda a mejorar la textura, el tono, la elasticidad y la luminosidad de la piel. No está indicado para rellenar arrugas profundas ni para generar un efecto lifting.",
      },
    ],

    indicaciones: [
      "Piel apagada o deshidratada.",
      "Piel fotoenvejecida.",
      "Poros abiertos y textura irregular.",
      "Líneas finas.",
      "Tratamiento preventivo en pieles jóvenes de 25 a 35 años.",
      "Preparación de la piel antes del verano o recuperación después del verano.",
      "Cuello y escote.",
      "Dorso de las manos.",
      "Cara, incluyendo ojeras superficiales.",
    ],

    presentacion:
      "Hidrogel de ácido hialurónico no reticulado 18 mg/ml + glicina + L-prolina + 0,01% de hidroxiapatita de calcio.",
  },
},
{
  id: "neauvia-stimulate",
  nombre: "Neauvia Stimulate",
  categoria: "Facial",
  resumen:
    "Relleno de última generación que combina ácido hialurónico, hidroxiapatita de calcio y aminoácidos para aportar volumen inmediato y estimular la producción de colágeno.",
  imagen: "https://i.postimg.cc/FHsb65wN/Tratamiento-5.jpg",
  destacado: false,

  detalle: {
    introduccion:
      "Neauvia Stimulate combina ácido hialurónico, hidroxiapatita de calcio, glicina y L-prolina para aportar volumen inmediato y favorecer la producción de colágeno a largo plazo.",

    queEs:
      "Es un relleno de última generación que combina ácido hialurónico reticulado con PEG (26 mg/ml), 1% de hidroxiapatita de calcio, glicina y L-prolina. Viene en una jeringa estéril de 1 ml y de un solo uso.",

    queHace: [
      {
        titulo: "Efecto inmediato",
        texto:
          "Ayuda a recuperar el volumen perdido en zonas como pómulos, mentón, mandíbula y surcos.",
      },
      {
        titulo: "Efecto a largo plazo - Bioestimulación",
        texto:
          "Durante las siguientes semanas y meses, la piel comienza a producir colágeno propio. Esto ayuda a conseguir una piel más densa, firme y con mejor calidad, además del efecto de volumen.",
      },
      {
        titulo: "Mejora la calidad de la piel",
        texto:
          "Se utiliza especialmente cuando existe flacidez leve y pérdida de densidad, no solamente cuando falta volumen.",
      },
    ],

    duracion:
      "El resultado inmediato puede observarse en el momento. La mejora de la calidad de la piel aparece progresivamente entre el primer y tercer mes. La duración es de aproximadamente 10 a 12 meses, aunque puede variar según cada persona.",

    aplicacion:
      "Es un procedimiento médico realizado en consultorio. Se aplica con una cánula fina en planos profundos, con anestesia local en la zona y siguiendo la evaluación profesional correspondiente.",

    presentacion:
      "Jeringa estéril de 1 ml, de un solo uso.",
  },
},

{
  id: "mesopeel-jessner-pro",
  nombre: "Mesopeel® Jessner Pro",
  categoria: "Facial",
  resumen:
    "Peeling químico de profundidad media-superficial que ayuda a mejorar signos de envejecimiento, firmeza, textura y tono de la piel.",
  imagen: "https://i.postimg.cc/wxQmY4XW/Tratamiento-6.jpg",
  destacado: false,

  detalle: {
    introduccion:
      "Mesopeel® Jessner Pro de Mesoestetic es un peeling químico de profundidad media-superficial y de amplio espectro, indicado especialmente para pieles con signos de envejecimiento grado I y II.",

    queEs:
      "Es un peeling químico diseñado para mejorar diferentes alteraciones de la piel y favorecer una apariencia más uniforme, luminosa y rejuvenecida.",

    queHace: [
      {
        titulo: "Mejora los signos de envejecimiento",
        texto:
          "Ayuda a mejorar la apariencia de líneas de expresión y arrugas superficiales.",
      },
      {
        titulo: "Mejora la firmeza",
        texto:
          "Está indicado para pieles que presentan pérdida de firmeza.",
      },
      {
        titulo: "Mejora poros y textura",
        texto:
          "Ayuda a mejorar la apariencia de poros dilatados y de una textura irregular.",
      },
      {
        titulo: "Unifica el tono y aporta luminosidad",
        texto:
          "Está indicado para pieles apagadas, opacas y con tono irregular, así como para casos de fotoenvejecimiento grado I y II.",
      },
    ],

    indicaciones: [
      "Líneas de expresión y arrugas superficiales.",
      "Pérdida de firmeza.",
      "Poros dilatados.",
      "Piel apagada u opaca.",
      "Tono irregular.",
      "Fotoenvejecimiento grado I y II.",
      "Textura irregular.",
    ],

    presentacion:
      "Peeling químico Mesopeel® Jessner Pro de Mesoestetic.",
  },
},


];

export const categoriasTratamientos = ["Todos", "Facial"];