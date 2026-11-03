import { useId } from "react";
import { motion } from "framer-motion";

/**
 * Brand mark: a rounded badge with a gold roof (home), a wrench (handyman)
 * and a sparkle (cleaning). Wordmark sits beside it.
 *
 *  - mark only:    <Logo showText={false} />
 *  - on dark bg:   <Logo light />
 *  - draw-in anim: <Logo animated />
 */
export function LogoMark({ size = 44, animated = false }) {
  const uid = useId().replace(/:/g, "");
  const bg = `bg-${uid}`;
  const gold = `gold-${uid}`;
  const shine = `shine-${uid}`;

  const draw = animated
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.1, ease: "easeInOut", delay: 0.2 },
      }
    : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Pro-Cleaning & Handyman Services logo"
      className="logo__mark"
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D4584" />
          <stop offset="1" stopColor="#0A1A33" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD97A" />
          <stop offset="1" stopColor="#F5A524" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="17" fill={`url(#${bg})`} />
      <rect width="64" height="32" rx="17" fill={`url(#${shine})`} />

      {/* roof */}
      <motion.path
        d="M10 29 L32 10 L54 29"
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw}
      />

      {/* wrench */}
      <g
        transform="translate(17 25) scale(1.2)"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
          {...(animated
            ? {
                initial: { pathLength: 0, opacity: 0 },
                animate: { pathLength: 1, opacity: 1 },
                transition: { duration: 1.3, ease: "easeInOut", delay: 0.5 },
              }
            : {})}
        />
      </g>

      {/* sparkle (clean) — wrapped so the animated transform doesn't clobber the position */}
      <g transform="translate(16 44)">
        <motion.path
          d="M0-6C.8-2 2-.8 6 0 2 .8.8 2 0 6-.8 2-2 .8-6 0-2-.8-.8-2 0-6Z"
          fill={`url(#${gold})`}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          {...(animated
            ? {
                initial: { scale: 0, rotate: -90, opacity: 0 },
                animate: { scale: 1, rotate: 0, opacity: 1 },
                transition: { type: "spring", stiffness: 200, damping: 12, delay: 1.4 },
              }
            : {})}
        />
      </g>
      <circle cx="50" cy="45" r="1.7" fill={`url(#${gold})`} opacity="0.85" />
    </svg>
  );
}

export default function Logo({ size = 44, showText = true, light = false, animated = false }) {
  return (
    <span className={`logo ${light ? "logo--light" : ""}`}>
      <LogoMark size={size} animated={animated} />
      {showText && (
        <span className="logo__text">
          <span className="logo__name">
            Pro<span>-</span>Cleaning
          </span>
          <span className="logo__sub">&amp; Handyman Services</span>
        </span>
      )}
    </span>
  );
}
