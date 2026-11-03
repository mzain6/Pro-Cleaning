import { useEffect } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Phone } from "lucide-react";
import { site } from "../data/content.js";

/** Thin gold bar across the top that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Sticky call button — mostly useful on phones. Appears after a little scrolling. */
export function FloatingCall() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 320));

  return (
    <motion.a
      href={site.phoneHref}
      className="fab"
      aria-label={`Call ${site.phone}`}
      initial={false}
      animate={show ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.6, opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ pointerEvents: show ? "auto" : "none" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="fab__pulse" aria-hidden="true" />
      <Phone size={24} />
    </motion.a>
  );
}

/** Sets the document title for each page. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Pro-Cleaning & Handyman Services LLC`
      : "Pro-Cleaning & Handyman Services LLC | Lancaster, PA";
  }, [title]);
}

/** Wraps a page so it fades/slides in and out between routes. */
export function PageTransition({ children, title }) {
  usePageTitle(title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
