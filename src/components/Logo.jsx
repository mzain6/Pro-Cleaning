/** Four-point sparkle: the brand's one recurring shape. */
export function Sparkle({ size = 24, className = "", color = "currentColor" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 9C33.6 23 41 30.4 55 32C41 33.6 33.6 41 32 55C30.4 41 23 33.6 9 32C23 30.4 30.4 23 32 9Z"
        fill={color}
      />
    </svg>
  );
}

export function LogoMark({ size = 40 }) {
  return (
    <span className="logo__mark" style={{ width: size, height: size }} aria-hidden="true">
      <Sparkle size={Math.round(size * 0.62)} color="var(--gold)" />
    </span>
  );
}

export default function Logo({ light = false, size = 40 }) {
  return (
    <span className={`logo ${light ? "logo--light" : ""}`}>
      <LogoMark size={size} />
      <span className="logo__text">
        <span className="logo__name">Whoa</span>
        <span className="logo__sub">Cleaning Services</span>
      </span>
    </span>
  );
}
