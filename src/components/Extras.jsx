import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageSquare, Phone } from "lucide-react";
import { ease } from "./motion.jsx";
import { site } from "../data/content.js";

/** Sets the document title for each page. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Whoa Cleaning Services LLC`
      : "Whoa Cleaning Services LLC | House Cleaning";
  }, [title]);
}

/**
 * Wraps a page so it cross-fades between routes.
 * Opacity only on purpose: transforming a whole page forces the browser to
 * build one enormous GPU layer, which is what makes page changes stutter.
 */
export function PageTransition({ children, title }) {
  usePageTitle(title);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
    >
      {children}
    </motion.div>
  );
}

/** Phone-only call/text bar that slides up after a little scrolling. */
export function MobileCallBar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 280));

  return (
    <motion.div
      className="callbar"
      initial={false}
      animate={{ transform: show ? "translateY(0%)" : "translateY(110%)" }}
      transition={{ duration: 0.35, ease }}
      aria-hidden={!show}
    >
      <a href={site.phoneHref} className="btn btn--gold" tabIndex={show ? 0 : -1}>
        <Phone size={18} /> Call
      </a>
      <a href={site.smsHref} className="btn btn--line" tabIndex={show ? 0 : -1}>
        <MessageSquare size={18} /> Text
      </a>
    </motion.div>
  );
}
