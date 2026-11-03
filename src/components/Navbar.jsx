import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo.jsx";
import { ease } from "./motion.jsx";
import { navLinks, site } from "../data/content.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // close the drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  // lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <motion.header
      className={`nav ${solid ? "nav--solid" : ""}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Pro-Cleaning & Handyman Services — home">
          <Logo light={!solid} size={scrolled ? 40 : 46} />
        </Link>

        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav__link">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav__pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="nav__label">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <motion.a
            href={site.phoneHref}
            className="btn btn--primary btn--sm nav__call"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={16} />
            {site.phone}
          </motion.a>
          <button
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "inline-flex" }}
              >
                {open ? <X size={26} /> : <Menu size={26} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 72px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <motion.ul
              className="drawer__list"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) => `drawer__link ${isActive ? "is-active" : ""}`}
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="drawer__cta"
              >
                <a href={site.phoneHref} className="btn btn--primary btn--lg btn--block">
                  <Phone size={20} /> Call {site.phone}
                </a>
                <p>
                  {site.street}, {site.cityLine}
                </p>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
