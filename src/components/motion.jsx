import { Fragment, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* Smoothness rule: animate opacity and the CSS `transform` property only, and write
   transforms as a string ("translateY(18px)") rather than using x / y / scale props.
   Framer hands a `transform` string to the browser's Web Animations API, so the
   animation runs on the compositor thread and keeps going at full frame rate even
   while React is rendering or the page is busy. The x / y / scale props are driven
   from JavaScript on the main thread instead, which is what makes entrances stutter. */

export const ease = [0.22, 1, 0.36, 1];

const up = (y) => `translateY(${y}px)`;
const side = (x) => `translateX(${x}px)`;

export const fadeUp = {
  hidden: { opacity: 0, transform: up(18) },
  show: { opacity: 1, transform: up(0), transition: { duration: 0.6, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const slideLeft = {
  hidden: { opacity: 0, transform: side(-24) },
  show: { opacity: 1, transform: side(0), transition: { duration: 0.65, ease } },
};

export const slideRight = {
  hidden: { opacity: 0, transform: side(24) },
  show: { opacity: 1, transform: side(0), transition: { duration: 0.65, ease } },
};

/** Props for a one-off entrance on mount: <motion.p {...rise(0.4)}>. */
export const rise = (delay = 0, y = 16, duration = 0.65) => ({
  initial: { opacity: 0, transform: up(y) },
  animate: { opacity: 1, transform: up(0) },
  transition: { duration, delay, ease },
});

const container = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const viewport = { once: true, margin: "-60px" };

/** Adds a delay to a variants object's "show" transition (a prop-level delay would be overridden by it). */
const withDelay = (variants, delay) =>
  delay
    ? { ...variants, show: { ...variants.show, transition: { ...variants.show.transition, delay } } }
    : variants;

/** Fades and lifts its children into view as they scroll on screen. */
export function Reveal({ children, variants = fadeUp, delay = 0, className = "", as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers any <Item> children when scrolled into view. */
export function Stagger({ children, className = "", stagger = 0.08, delay = 0, as = "div" }) {
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

/** "A clean home makes you say *whoa.*" -> words, with the starred ones set in italic. */
function parseWords(text) {
  let em = false;
  return text.split(" ").map((token) => {
    if (token.startsWith("*")) em = true;
    const word = { text: token.replace(/\*/g, ""), em };
    if (token.endsWith("*")) em = false;
    return word;
  });
}

/**
 * Headline whose words rise out of a mask. On a page's first screen it plays on
 * mount; further down the page pass inView so it plays when scrolled to.
 */
export function Headline({ text, as = "h2", className = "", delay = 0, inView = false }) {
  const Tag = motion[as] || motion.h2;
  const words = parseWords(text);
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };
  return (
    <Tag
      className={className}
      variants={container(0.055, delay)}
      initial="hidden"
      aria-label={text.replace(/\*/g, "")}
      {...trigger}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask" aria-hidden="true">
            <motion.span
              className={w.em ? "word em" : "word"}
              variants={{
                hidden: { transform: "translateY(105%)" },
                show: { transform: "translateY(0%)", transition: { duration: 0.7, ease } },
              }}
            >
              {w.text}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Number that counts up the first time it scrolls into view. */
export function Counter({ to, decimals = 0, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const text = useTransform(value, (v) => v.toFixed(decimals));

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
