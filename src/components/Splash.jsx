import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "./Logo.jsx";
import { ease, rise } from "./motion.jsx";
import { loadFonts, wait } from "../utils/boot.js";

const NAME = Array.from("Whoa");

/**
 * First-visit loading scene.
 * Holds for a short minimum time (so the animation can play) and until the web fonts
 * are ready, then calls onReveal(). The parent mounts the site underneath while this
 * curtain wipes upward, so the page's own entrance animations play as it clears.
 *
 * Everything animates opacity or transform (the progress bar is a scaleX), so it
 * stays smooth even while fonts and the app are loading.
 */
export default function Splash({ onReveal }) {
  const reduce = useReducedMotion();
  const minMs = reduce ? 700 : 2300;

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
    // The curtain's exit is a `transform` string so it runs on the compositor thread.
    // That matters here: the site mounts underneath at the exact moment the curtain lifts,
    // and a main-thread animation would stutter while React renders the page.
    <motion.div
      className="splash"
      role="status"
      aria-live="polite"
      aria-label="Loading Whoa Cleaning Services"
      initial={false}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { transform: "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.3 : 0.95, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="splash__inner"
        exit={{ opacity: 0, transform: "translateY(-18px)", transition: { duration: 0.3, ease: "easeIn" } }}
      >
        <motion.div
          className="splash__mark"
          initial={{ opacity: 0, transform: "scale(0.6) rotate(-35deg)" }}
          animate={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
          transition={{ duration: 0.9, ease }}
        >
          <Sparkle size={76} color="var(--gold)" />
        </motion.div>

        <h1 className="splash__name" aria-hidden="true">
          {NAME.map((ch, i) => (
            <span className="mask" key={i}>
              <motion.span
                className="word"
                initial={{ transform: "translateY(110%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.75, delay: 0.55 + i * 0.07, ease }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="splash__sub" {...rise(1.1, 8, 0.6)}>
          Cleaning Services
        </motion.p>

        <div className="splash__bar" aria-hidden="true">
          <motion.i
            initial={{ transform: "scaleX(0)" }}
            animate={{ transform: "scaleX(1)" }}
            transition={{ duration: minMs / 1000, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </motion.div>

      {/* gold edge along the bottom of the curtain, like a squeegee line */}
      <span className="splash__edge" aria-hidden="true" />
    </motion.div>
  );
}
