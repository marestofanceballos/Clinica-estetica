import { Link } from "react-router-dom";

/**
 * Botón de marca reutilizable.
 * - variant: "primary" | "outline" | "light"
 * - size: "md" | "sm"
 * - to: si se pasa, renderiza un <Link> de react-router
 * - href: si se pasa, renderiza un <a> (ej. WhatsApp, mailto)
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  icon,
  onClick,
  type = "button",
  className = "",
  ...rest
}) {
  const classes = `btn-brand btn-brand-${variant} ${size === "sm" ? "btn-brand-sm" : ""} ${className}`.trim();

  const content = (
    <>
      {icon && <i className={`bi ${icon}`} aria-hidden="true"></i>}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
