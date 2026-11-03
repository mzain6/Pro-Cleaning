import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, Wrench } from "lucide-react";
import { LogoMark } from "../components/Logo.jsx";
import { CtaBand, PageHeader, SectionHeading, Stars } from "../components/ui.jsx";
import { Counter, Item, Reveal, Stagger, popIn, slideLeft, slideRight } from "../components/motion.jsx";
import { process, services, site, values } from "../data/content.js";

function Story() {
  return (
    <section className="section">
      <div className="container split">
        <Reveal variants={slideLeft} className="split__visual">
          <div className="about-art">
            <motion.span
              className="about-art__ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="about-art__card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <LogoMark size={110} animated />
              <strong>Pro-Cleaning</strong>
              <span>&amp; Handyman Services LLC</span>
            </motion.div>
            <motion.span
              className="about-art__chip about-art__chip--a"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wrench size={16} /> Repairs
            </motion.span>
            <motion.span
              className="about-art__chip about-art__chip--b"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={16} /> Cleaning
            </motion.span>
          </div>
        </Reveal>

        <Reveal variants={slideRight} className="split__copy">
          <span className="eyebrow">Our story</span>
          <h2 className="h2">A local team that treats your home like its own.</h2>
          <p className="lead">
            Pro-Cleaning &amp; Handyman Services LLC is a Latino-owned business on Laurel Street
            in Lancaster, Pennsylvania. We built our name on two things: doing the job properly,
            and leaving the space cleaner than we found it.
          </p>
          <p>
            Whether it's a ceiling leak that can't wait, a wall that needs to be smooth and paint
            ready, a pressure-washing refresh or a remodel, customers tell us the same things —
            we're <b>prompt</b>, we <b>communicate</b>, and the work looks <b>great</b>. We're proud
            to serve Lancaster, York, Lititz, Ephrata, Millersville and Columbia.
          </p>
          <div className="about-badges">
            <span className="badge badge--gold">
              <Heart size={14} fill="currentColor" /> Latino-owned
            </span>
            <span className="badge">
              <MapPin size={14} /> Lancaster, PA
            </span>
            <span className="badge">
              <Stars size={13} /> {site.rating.toFixed(1)} on Google
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section section--cream-2">
      <div className="container">
        <SectionHeading
          eyebrow="What we stand for"
          title="Three promises behind every job"
          text="They're simple, and we hold ourselves to them."
        />
        <Stagger className="grid grid--3" stagger={0.12}>
          {values.map((v, i) => (
            <Item key={v.title}>
              <motion.div
                className="card value-card"
                whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
              >
                <span className="value-card__num">0{i + 1}</span>
                <span className="icon-box">
                  <v.icon size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ByTheNumbers() {
  return (
    <section className="section section--dark numbers">
      <div className="why__bg" aria-hidden="true" />
      <div className="container">
        <Stagger className="stats__grid stats__grid--dark" stagger={0.12}>
          <Item variants={popIn} className="stat">
            <strong>
              <Counter to={5} decimals={1} />
            </strong>
            <span>Google rating</span>
          </Item>
          <Item variants={popIn} className="stat">
            <strong>
              <Counter to={site.reviewCount} />
            </strong>
            <span>Customer reviews</span>
          </Item>
          <Item variants={popIn} className="stat">
            <strong>
              <Counter to={site.areas.length} />
            </strong>
            <span>Cities served</span>
          </Item>
          <Item variants={popIn} className="stat">
            <strong>
              <Counter to={services.length} />
            </strong>
            <span>Core services</span>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <SectionHeading eyebrow="How we work" title="From first call to final clean-up" />
        <div className="timeline">
          <motion.span
            className="timeline__line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {process.map((p, i) => (
            <Reveal key={p.title} className="timeline__item" variants={i % 2 ? slideRight : slideLeft}>
              <span className="timeline__dot">
                <p.icon size={18} />
              </span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        crumb="About"
        eyebrow="About us"
        title="Local, reliable and proud of the work."
        text="Meet the team behind Lancaster's repair, remodel and clean-up crew."
      />
      <Story />
      <Values />
      <ByTheNumbers />
      <Timeline />
      <CtaBand title="Let's take care of your home." />
    </>
  );
}
