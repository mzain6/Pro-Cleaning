import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BeforeAfter from "../components/BeforeAfter.jsx";
import { Counter, Headline, Item, Reveal, Stagger, ease, rise } from "../components/motion.jsx";
import { CallButton, CtaBand, Label, LinkButton, StarRating } from "../components/ui.jsx";
import { reviewTopics, reviews, services, site, steps } from "../data/content.js";

/* ------------------------------------------------------------------ HERO */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <section className="hero" ref={ref}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.div {...rise(0, 10, 0.5)}>
            <Label>Whoa Cleaning Services LLC</Label>
          </motion.div>

          <Headline
            as="h1"
            className="display display--hero hero__title"
            text="A clean home makes you say *whoa.*"
            delay={0.15}
          />

          <motion.p className="lead hero__lede" {...rise(0.7)}>
            We clean houses: regular cleans, deep cleans, rental turnovers and area rugs. We show up
            when we say we will, and we look at the corners.
          </motion.p>

          <motion.div className="hero__actions" {...rise(0.85)}>
            <CallButton />
            <LinkButton to="/contact" variant="line">
              Request a quote
            </LinkButton>
          </motion.div>

          <motion.ul
            className="hero__proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <li>{site.identity.join(" · ")}</li>
          </motion.ul>
        </div>

        <motion.div className="hero__art" {...rise(0.35, 24, 0.9)}>
          <motion.span className="hero__sun" style={{ y: sunY }} aria-hidden="true" />
          <motion.span className="hero__outline" style={{ y: outlineY }} aria-hidden="true" />
          <BeforeAfter />
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- TRUST */
function TrustBand() {
  const topic = (label) => reviewTopics.find((t) => t.label === label)?.count ?? 0;
  const items = [
    { n: <Counter to={site.rating} decimals={1} />, label: "average rating on Google" },
    { n: <Counter to={site.reviewCount} />, label: "Google reviews" },
    { n: <Counter to={topic("Attention to detail")} />, label: "reviews mention attention to detail" },
    { n: <Counter to={topic("Punctuality")} />, label: "reviews mention punctuality" },
  ];
  return (
    <section className="band">
      <Stagger className="container band__grid" stagger={0.1}>
        {items.map((it) => (
          <Item key={it.label} className="band__item">
            <strong>{it.n}</strong>
            <span>{it.label}</span>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}

/* -------------------------------------------------------------- SERVICES */
function ServicesList() {
  return (
    <section className="section">
      <div className="container svcs">
        <div className="svcs__intro">
          <Label>What we clean</Label>
          <Headline
            as="h2"
            className="display display--lg"
            text="Five kinds of clean, one phone number."
            inView
          />
          <Reveal as="p" className="lead">
            Pick the one that fits, or call and describe the house. We'll tell you which makes sense.
          </Reveal>
          <Reveal delay={0.1}>
            <LinkButton to="/services" variant="dark">
              See what's included
            </LinkButton>
          </Reveal>
        </div>

        <Stagger className="svcs__list" as="ul" stagger={0.07}>
          {services.map((s, i) => (
            <Item as="li" key={s.id}>
              <Link to={`/services#${s.id}`} className="svc">
                <span className="svc__num">0{i + 1}</span>
                <span className="svc__main">
                  <span className="svc__title">{s.title}</span>
                  <span className="svc__text">{s.short}</span>
                </span>
                <ArrowUpRight className="svc__arrow" size={22} />
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- BOOKING */
function HowItWorks() {
  return (
    <section className="section section--sand">
      <div className="container">
        <div className="head head--split">
          <div>
            <Label>Booking</Label>
            <Headline as="h2" className="display display--lg" text="Booking is a phone call." inView />
          </div>
          <Reveal as="p" className="lead">
            No long forms to wade through. Call or text, and we'll sort out the rest from there.
          </Reveal>
        </div>

        <Stagger className="steps" stagger={0.14}>
          {steps.map((s, i) => (
            <Item key={s.title} className="step">
              <motion.span
                className="step__rule"
                variants={{
                  hidden: { transform: "scaleX(0)" },
                  show: { transform: "scaleX(1)", transition: { duration: 0.9, ease } },
                }}
              />
              <span className="step__n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- REVIEWS */
function ReviewFeature() {
  const big = reviews[0];
  const rest = [reviews[2], reviews[1]];
  return (
    <section className="section section--blush">
      <div className="container feature">
        <Reveal className="feature__main">
          <Label>What customers say</Label>
          <blockquote className="feature__quote">“{big.pull}”</blockquote>
          <div className="feature__who">
            <StarRating value={5} size={18} />
            <span>
              <b>{big.name}</b> · {big.meta}
            </span>
          </div>
          <LinkButton to="/reviews" variant="dark">
            Read more reviews
          </LinkButton>
        </Reveal>

        <Stagger className="feature__side" stagger={0.12}>
          {rest.map((r) => (
            <Item as="figure" key={r.name} className="mini">
              <blockquote>“{r.pull}”</blockquote>
              <figcaption>
                <b>{r.name}</b>, {r.meta}
              </figcaption>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <ServicesList />
      <HowItWorks />
      <ReviewFeature />
      <CtaBand />
    </>
  );
}
