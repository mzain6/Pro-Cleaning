import { Fragment, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 160, damping: 16 } },
};

const container = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const viewport = { once: true, margin: "-70px" };

/** Fades + lifts its children into view as they scroll on screen. */
export function Reveal({ children, variants = fadeUp, delay = 0, className = "", as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers any <Item> children when scrolled into view. */
export function Stagger({ children, className = "", stagger = 0.1, delay = 0, as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
}

export function Item({ children, className = "", variants = fadeUp, as = "div", ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

/** Animated headline: each word rises into place. */
export function SplitText({ text, className = "", delay = 0, as = "h1", highlight = 0 }) {
  const Tag = motion[as] || motion.h1;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      variants={container(0.07, delay)}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className={`split__word ${i >= words.length - highlight ? "split__hl" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.7, ease } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/**
 * Number that counts up the first time it scrolls into view.
 * Driven by a motion value, so the text updates without re-rendering React.
 */
export function Counter({ to, decimals = 0, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const text = useTransform(value, (v) => v.toFixed(decimals) + suffix);

  useEffect(() => {
    if (reduce) {
      value.set(to);
      return;
    }
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, duration, reduce, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

/* ----------------------------------------------------------------------------
   Ambient loops.
   These animate the CSS `transform` property as a single string, which Motion
   hands to the browser's Web Animations API — so they run on the GPU
   compositor thread and stay smooth even when the main thread is busy.
---------------------------------------------------------------------------- */

/** Gently drifts/floats its content. Use x/y for the travel distance in px. */
export function Float({ children, className = "", x = 0, y = -12, duration = 6, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{
        transform: [
          "translate(0px, 0px)",
          `translate(${x}px, ${y}px)`,
          "translate(0px, 0px)",
        ],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Endless rotation. */
export function Spin({ className = "", duration = 40, reverse = false }) {
  return (
    <motion.span
      className={className}
      animate={{
        transform: reverse
          ? ["rotate(360deg)", "rotate(0deg)"]
          : ["rotate(0deg)", "rotate(360deg)"],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}
