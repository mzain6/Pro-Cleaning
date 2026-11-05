import { useId } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Headline, Reveal, rise } from "./motion.jsx";
import { Sparkle } from "./Logo.jsx";
import { site } from "../data/content.js";

/** Small section label with the brand sparkle. */
export function Label({ children, light = false }) {
  return (
    <span className={`label ${light ? "label--light" : ""}`}>
      <Sparkle size={13} />
      {children}
    </span>
  );
}

/** Star rating that fills partially (4.7 shows 4 full stars and 70% of the fifth). */
export function StarRating({ value = 5, size = 18 }) {
  const uid = useId().replace(/:/g, "");
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`${uid}-${i}`}>
                <stop offset={fill} stopColor="currentColor" />
                <stop offset={fill} stopColor="currentColor" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"
              fill={`url(#${uid}-${i})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

export function CallButton({ variant = "gold", children, className = "" }) {
  return (
    <a href={site.phoneHref} className={`btn btn--${variant} ${className}`}>
      <Phone size={18} />
      {children ?? site.phone}
    </a>
  );
}

export function LinkButton({ to, children, variant = "gold", arrow = true, className = "" }) {
  return (
    <Link to={to} className={`btn btn--${variant} ${className}`}>
      {children}
      {arrow && <ArrowRight size={18} className="btn__arrow" />}
    </Link>
  );
}

/** Heading block at the top of every inner page. */
export function PageHeader({ label, title, text }) {
  return (
    <header className="page-head">
      <Sparkle size={420} className="page-head__spark" />
      <div className="container page-head__inner">
        <motion.div {...rise(0, 10, 0.5)}>
          <Label>{label}</Label>
        </motion.div>
        <Headline as="h1" className="display display--xl page-head__title" text={title} delay={0.1} />
        {text && (
          <motion.p className="lead page-head__text" {...rise(0.4, 14, 0.6)}>
            {text}
          </motion.p>
        )}
      </div>
    </header>
  );
}

/** Closing band at the bottom of pages: the phone number, big. */
export function CtaBand({ title = "Let's make your house say *whoa.*", text }) {
  return (
    <section className="cta">
      <div className="container cta__grid">
        <div className="cta__copy">
          <Headline as="h2" className="display display--lg" text={title} inView />
          <Reveal as="p" className="cta__text">
            {text ?? "Call or text and tell us what you need. We'll talk it through and find a time."}
          </Reveal>
        </div>
        <Reveal className="cta__action" delay={0.1}>
          <a href={site.phoneHref} className="cta__phone">
            {site.phone}
          </a>
          <p className="cta__meta">
            Call or text · {site.hours}
          </p>
          <LinkButton to="/contact" variant="line-light">
            Request a quote
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
