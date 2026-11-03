import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Hammer,
  Sparkles,
  SprayCan,
  Heart,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import { LogoMark } from "../components/Logo.jsx";
import {
  CallButton,
  CtaBand,
  LinkButton,
  SectionHeading,
  Stars,
  Wave,
} from "../components/ui.jsx";
import {
  Counter,
  Float,
  Item,
  Reveal,
  SplitText,
  Spin,
  Stagger,
  ease,
  popIn,
  slideLeft,
  slideRight,
} from "../components/motion.jsx";
import { process, quickQuotes, reasons, reviews, services, site } from "../data/content.js";

/* ------------------------------------------------------------------ HERO */
function Hero() {
  const chips = [
    { icon: Hammer, label: "Drywall", cls: "chip--a", dur: 5.5 },
    { icon: SprayCan, label: "Pressure Washing", cls: "chip--b", dur: 6.5 },
    { icon: Sparkles, label: "Cleaning", cls: "chip--c", dur: 7 },
  ];

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <Float className="blob blob--gold" x={60} y={30} duration={14} />
        <Float className="blob blob--teal" x={-50} y={-30} duration={17} />
        <span className="grid-pattern" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <SplitText
            as="h1"
            className="h1 hero__title"
            text="Your home, repaired, refreshed & done right."
            delay={0.2}
            highlight={2}
          />

          <motion.p
            className="hero__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
          >
            Drywall repair, leak &amp; ceiling fixes, remodeling, pressure washing and professional
            cleaning — from one trusted, Latino-owned team in Lancaster, PA.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
          >
            <CallButton className="btn btn--primary btn--lg" />
            <LinkButton to="/contact" className="btn btn--outline-light btn--lg">
              Request a Quote
            </LinkButton>
          </motion.div>

          <motion.ul
            className="hero__facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <li>
              <MapPin size={16} /> Serving Lancaster &amp; nearby
            </li>
            <li>
              <Heart size={16} /> Latino-owned
            </li>
            <li>
              <Sparkles size={16} /> Clean job sites
            </li>
          </motion.ul>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <Spin className="ring ring--1" duration={45} />
          <Spin className="ring ring--2" duration={60} reverse />

          <Float className="hero__card" y={-14} duration={6}>
            <LogoMark size={132} animated />
            <strong>Pro-Cleaning</strong>
            <span>&amp; Handyman Services</span>
            <div className="hero__card-rating">
              <Stars size={16} />
              <small>{site.rating.toFixed(1)} on Google</small>
            </div>
          </Float>

          {chips.map(({ icon: Icon, label, cls, dur }, i) => (
            <motion.div
              key={label}
              className={`chip-slot ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2, type: "spring", stiffness: 200, damping: 14 }}
            >
              <Float className="chip" y={-10} duration={dur} delay={0.4 * i}>
                <Icon size={18} />
                {label}
              </Float>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Wave />
    </section>
  );
}

/* ----------------------------------------------------------------- STATS */
function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <Stagger className="stats__grid" stagger={0.12}>
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
              <Heart size={30} fill="currentColor" />
            </strong>
            <span>Latino-owned</span>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- SERVICES */
function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="One crew for every job around the house"
          text="From a cracked wall to a full remodel — you call once, we handle the rest."
        />
        <Stagger className="grid grid--3" stagger={0.09}>
          {services.map((s) => (
            <Item key={s.id}>
              <motion.article
                className="card service-card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.span
                  className="icon-box"
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <s.icon size={26} />
                </motion.span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <Link to="/services" className="card__link">
                  Learn more <ArrowUpRight size={16} />
                </Link>
              </motion.article>
            </Item>
          ))}
        </Stagger>
        <Reveal className="center mt-lg">
          <LinkButton to="/services" className="btn btn--dark">
            See all services
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- WHY */
function Why() {
  return (
    <section className="section section--dark why">
      <div className="why__bg" aria-hidden="true" />
      <div className="container why__inner">
        <Reveal variants={slideLeft} className="why__intro">
          <span className="eyebrow eyebrow--light">Why Lancaster calls us</span>
          <h2 className="h2">Fast, friendly and finished properly.</h2>
          <p className="lead lead--light">
            Don't take our word for it — these are the things customers keep saying in their 5-star
            Google reviews.
          </p>
          <LinkButton to="/reviews" className="btn btn--primary">
            Read the reviews
          </LinkButton>
        </Reveal>

        <Stagger className="why__grid" stagger={0.12}>
          {reasons.map((r) => (
            <Item key={r.title} variants={slideRight}>
              <motion.div className="why-card" whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.09)" }}>
                <span className="icon-box icon-box--gold">
                  <r.icon size={24} />
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </motion.div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- PROCESS */
function Process() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Simple from the first call to the final clean-up"
        />
        <Stagger className="steps" stagger={0.15}>
          {process.map((s, i) => (
            <Item key={s.title} className="step">
              <div className="step__num">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 * i }}
                >
                  {i + 1}
                </motion.span>
              </div>
              <span className="icon-box icon-box--sm">
                <s.icon size={22} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- TESTIMONIALS */
const slides = [
  { text: reviews[2].text, name: reviews[2].name },
  { text: reviews[1].text, name: reviews[1].name },
  { text: quickQuotes[0].text, name: quickQuotes[0].name },
  { text: reviews[0].text, name: reviews[0].name },
];

function Testimonials() {
  const [[index, dir], setPage] = useState([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (step) => setPage(([i]) => [(i + step + slides.length) % slides.length, step]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const s = slides[index];

  return (
    <section className="section section--cream-2 testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Kind words"
          title="Neighbors who trust us with their homes"
          text={`${site.rating.toFixed(1)} stars across ${site.reviewCount} Google reviews.`}
        />
        <Reveal className="slider">
          <Quote className="slider__quote" size={72} />
          <div
            className="slider__stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                className="slider__slide"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d > 0 ? 70 : -70 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d > 0 ? -70 : 70 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease }}
              >
                <Stars size={20} />
                <blockquote>{s.text}</blockquote>
                <figcaption>— {s.name}, Google review</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="slider__controls">
            <button onClick={() => go(-1)} aria-label="Previous review">
              <ChevronLeft size={22} />
            </button>
            <div className="slider__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show review ${i + 1}`}
                  className={i === index ? "is-active" : ""}
                  onClick={() => setPage([i, i > index ? 1 : -1])}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next review">
              <ChevronRight size={22} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- AREAS */
function Areas() {
  const loop = [...site.areas, ...site.areas, ...site.areas, ...site.areas];
  return (
    <section className="areas">
      <div className="container">
        <SectionHeading
          eyebrow="Service area"
          title="Proudly serving Lancaster County & York"
          text="Not on the list? Give us a call — we'll tell you straight away if we can help."
        />
      </div>
      <div className="marquee" aria-hidden="true">
        <motion.div
          className="marquee__track"
          animate={{ transform: ["translateX(0%)", "translateX(-50%)"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((a, i) => (
            <span className="marquee__item" key={i}>
              <MapPin size={20} /> {a}, PA
            </span>
          ))}
        </motion.div>
      </div>
      <ul className="sr-only">
        {site.areas.map((a) => (
          <li key={a}>{a}, PA</li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <Why />
      <Process />
      <Testimonials />
      <Areas />
      <CtaBand />
    </>
  );
}
