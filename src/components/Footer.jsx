import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Heart } from "lucide-react";
import Logo from "./Logo.jsx";
import { Stagger, Item } from "./motion.jsx";
import { navLinks, services, site } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Stagger className="footer__grid" stagger={0.12}>
          <Item className="footer__about">
            <Logo light size={52} />
            <p>
              Reliable handyman, drywall, remodeling, pressure washing and cleaning services for
              homes across Lancaster County and beyond.
            </p>
            <span className="badge badge--gold">
              <Heart size={14} fill="currentColor" /> Latino-owned local business
            </span>
          </Item>

          <Item>
            <h3 className="footer__title">Explore</h3>
            <ul className="footer__list">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </Item>

          <Item>
            <h3 className="footer__title">Services</h3>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to="/services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </Item>

          <Item>
            <h3 className="footer__title">Get in touch</h3>
            <ul className="footer__contact">
              <li>
                <Phone size={18} />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <MapPin size={18} />
                <a href={site.directionsUrl} target="_blank" rel="noreferrer">
                  {site.street}
                  <br />
                  {site.cityLine}
                </a>
              </li>
              <li>
                <Clock size={18} />
                <span>{site.hours}</span>
              </li>
            </ul>
          </Item>
        </Stagger>

        <div className="footer__areas">
          <span>Serving:</span>
          {site.areas.map((a) => (
            <span className="tag" key={a}>
              {a}
            </span>
          ))}
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Lancaster, Pennsylvania</p>
        </div>
      </div>
    </footer>
  );
}
