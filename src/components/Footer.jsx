import { Link } from "react-router-dom";
import { MessageSquare, Phone } from "lucide-react";
import Logo from "./Logo.jsx";
import { navLinks, services, site } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light size={46} />
          <p>
            House cleaning for people who want it done on time and done properly. {site.identity.join(" and ")}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="footer__title">Pages</h3>
          <ul className="footer__list">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="footer__title">Cleaning</h3>
          <ul className="footer__list">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Get in touch</h3>
          <a href={site.phoneHref} className="footer__phone">
            {site.phone}
          </a>
          <ul className="footer__list footer__list--tight">
            <li>
              <a href={site.smsHref}>
                <MessageSquare size={15} /> Text us
              </a>
            </li>
            <li>
              <a href={site.phoneHref}>
                <Phone size={15} /> Call us
              </a>
            </li>
            <li className="footer__hours">{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <a href={site.profileUrl} target="_blank" rel="noreferrer">
            Find us on Google
          </a>
        </p>
      </div>
    </footer>
  );
}
