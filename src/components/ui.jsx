import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Phone, ArrowRight } from "lucide-react";
import { Float, Reveal, SplitText, ease } from "./motion.jsx";
import { site } from "../data/content.js";

export function Stars({ size = 18, count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i, type: "spring", stiffness: 260, damping: 14 }}
          style={{ display: "inline-flex" }}
        >
          <Star size={size} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, text, align = "center", light = false }) {
  return (
    <Reveal className={`heading heading--${align} ${light ? "heading--light" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
}

/** Dark banner at the top of every inner page. */
export function PageHeader({ eyebrow, title, text, crumb }) {
  return (
    <section className="page-header">
      <div className="page-header__bg" aria-hidden="true">
        <Float className="blob blob--gold" x={40} y={20} duration={14} />
        <Float className="blob blob--teal" x={-30} y={-25} duration={16} />
      </div>
      <div className="container page-header__inner">
        <motion.nav
          className="crumbs"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{crumb}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            {eyebrow}
          </motion.span>
        )}
        <SplitText text={title} className="h1 page-header__title" delay={0.15} highlight={2} />
        {text && (
          <motion.p
            className="page-header__text"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
          >
            {text}
          </motion.p>
        )}
      </div>
      <Wave />
    </section>
  );
}

export function Wave({ fill = "var(--cream)" }) {
  return (
    <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 C 240 90, 480 0, 720 30 S 1200 80, 1440 25 V80 H0 Z" fill={fill} />
    </svg>
  );
}

export function CallButton({ className = "btn btn--primary", children }) {
  return (
    <motion.a
      href={site.phoneHref}
      className={className}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      <Phone size={18} />
      {children ?? site.phone}
    </motion.a>
  );
}

export function LinkButton({ to, children, className = "btn btn--ghost", icon = true }) {
  return (
    <motion.span style={{ display: "inline-flex" }} whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
      <Link to={to} className={className}>
        {children}
        {icon && <ArrowRight size={18} />}
      </Link>
    </motion.span>
  );
}

/** Call-to-action band used at the bottom of pages. */
export function CtaBand({ title = "Ready to fix it, fresh it, finish it?", text }) {
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal className="cta-band__card">
          <motion.span
            className="cta-band__glow"
            aria-hidden="true"
            animate={{
              transform: ["scale(1)", "scale(1.25)", "scale(1)"],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="cta-band__copy">
            <h2 className="h2">{title}</h2>
            <p>
              {text ??
                "Call now or send us the details — we'll get back to you quickly with a clear plan."}
            </p>
          </div>
          <div className="cta-band__actions">
            <CallButton />
            <LinkButton to="/contact" className="btn btn--outline-light">
              Request a Quote
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
