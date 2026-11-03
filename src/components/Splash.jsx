import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "./Logo.jsx";
import { Float, Spin } from "./motion.jsx";
import { loadFonts, wait } from "../utils/boot.js";

const NAME = Array.from("Pro-Cleaning");

/**
 * First-visit loading screen.
 * Stays up for a short minimum time (so the logo animation can play) and until
 * the web fonts are ready, then calls onReveal() — the parent mounts the site
 * underneath while this curtain slides away.
 */
export default function Splash({ onReveal }) {
  const reduce = useReducedMotion();
  const minMs = reduce ? 900 : 2400;

  useEffect(() => {
    document.documentElement.classList.remove("splash-pending");
    document.body.style.overflow = "hidden";

    let alive = true;
    Promise.all([Promise.race([loadFonts(), wait(3500)]), wait(minMs)]).then(() => {
      if (alive) onReveal();
    });

    return () => {
      alive = false;
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="splash"
      role="status"
      aria-live="polite"
      aria-label="Loading Pro-Cleaning & Handyman Services"
      initial={false}
      exit={reduce ? { opacity: 0 } : { y: "-100%" }}
      transition={{ duration: reduce ? 0.35 : 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="splash__bg" aria-hidden="true">
        <Float className="blob blob--gold" x={40} y={26} duration={9} />
        <Float className="blob blob--teal" x={-34} y={-22} duration={11} />
        <span className="grid-pattern" />
      </div>

      <motion.div
        className="splash__inner"
        exit={{ opacity: 0, y: -24, transition: { duration: 0.35, ease: "easeIn" } }}
      >
        <div className="splash__mark">
          <Spin className="splash__halo" duration={14} />
          <motion.span
            className="splash__glow"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.55] }}
            transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
          >
            <LogoMark size={104} animated />
          </motion.div>
        </div>

        <h1 className="splash__name" aria-hidden="true">
          {NAME.map((ch, i) => (
            <span className="split__mask" key={i}>
              <motion.span
                className={`split__word ${ch === "-" ? "splash__dash" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="splash__sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          &amp; Handyman Services
        </motion.p>

        <div className="splash__bar" aria-hidden="true">
          <motion.i
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: minMs / 1000, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <motion.span
          className="splash__place"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          Lancaster, PA
        </motion.span>
      </motion.div>

      {/* curved lip along the bottom edge so the curtain lifts like a wave */}
      <svg className="splash__curve" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 H1440 Q720 160 0 0 Z" fill="#173564" />
      </svg>
    </motion.div>
  );
}
