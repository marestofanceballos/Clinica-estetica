// Firma visual de la marca: una línea continua que evoca el perfil
// de un rostro (frente, nariz, labios, mentón) — referencia directa
// a la "armonización de contornos faciales". Se reutiliza como
// separador entre secciones en lugar de un divisor genérico.
export default function ContourDivider({ className = "" }) {
  return (
    <svg
      className={`contour-divider ${className}`}
      viewBox="0 0 1200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 30 C 120 30, 160 8, 220 10 C 270 12, 285 34, 320 36 C 345 37, 355 20, 380 18 C 410 16, 425 40, 460 42 C 500 44, 520 14, 560 12 C 610 10, 630 44, 680 44 C 720 44, 735 22, 770 20 C 810 18, 830 38, 870 38 C 920 38, 940 16, 980 16 C 1040 16, 1080 30, 1200 30"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="600" cy="28" r="3" fill="currentColor" />
    </svg>
  );
}
