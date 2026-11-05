import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { ease } from "./motion.jsx";
import { navLinks, site } from "../data/content.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

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
      className={`nav ${solid ? "nav--solid" : ""} ${open ? "nav--open" : ""}`}
      initial={{ transform: "translateY(-80px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Whoa Cleaning Services, home">
          <Logo light={open} size={42} />
        </Link>

        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className="nav__link">
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="nav__underline"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={site.phoneHref} className="btn btn--gold btn--sm nav__call">
            <Phone size={16} />
            {site.phone}
          </a>
          <button
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="drawer__list"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, transform: "translateY(16px)" },
                    show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.45, ease } },
                  }}
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
                className="drawer__cta"
                variants={{
                  hidden: { opacity: 0, transform: "translateY(16px)" },
                  show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.45, ease } },
                }}
              >
                <a href={site.phoneHref} className="btn btn--gold btn--lg btn--block">
                  <Phone size={20} /> Call {site.phone}
                </a>
                <p>{site.hours}</p>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
