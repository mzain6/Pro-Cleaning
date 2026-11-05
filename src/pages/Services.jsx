import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CtaBand, LinkButton, PageHeader } from "../components/ui.jsx";
import { Headline, Item, Reveal, Stagger, ease, rise } from "../components/motion.jsx";
import { services } from "../data/content.js";

function Tick() {
  return (
    <svg className="tick" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity=".16" />
      <motion.path
        d="M7 12.5l3.2 3.2L17 8.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease, delay: 0.15 }}
      />
    </svg>
  );
}

function Picker() {
  const { hash } = useLocation();
  const fromHash = services.findIndex((s) => `#${s.id}` === hash);
  const [active, setActive] = useState(Math.max(0, fromHash));
  const tabs = useRef([]);

  useEffect(() => {
    if (fromHash >= 0) setActive(fromHash);
  }, [fromHash]);

  const s = services[active];

  const onKeyDown = (e) => {
    const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!move) return;
    e.preventDefault();
    const next = (active + move + services.length) % services.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section picker-section">
      <div className="container picker">
        <div className="picker__tabs" role="tablist" aria-label="Cleaning services" onKeyDown={onKeyDown}>
          {services.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => (tabs.current[i] = el)}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={i === active}
              aria-controls="picker-panel"
              tabIndex={i === active ? 0 : -1}
              className={`picker__tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {i === active && (
                <motion.span
                  layoutId="picker-bar"
                  className="picker__bar"
                  style={{ borderRadius: 12 }}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <span className="picker__num">0{i + 1}</span>
              <span className="picker__name">{x.title}</span>
            </button>
          ))}
        </div>

        <div className="picker__panel" role="tabpanel" id="picker-panel" aria-labelledby={`tab-${s.id}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.id}
              initial={{ opacity: 0, transform: "translateY(14px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-8px)", transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease }}
            >
              <span className="picker__index">0{active + 1}</span>
              <h2 className="display display--lg">{s.title}</h2>
              <p className="lead">{s.body}</p>

              <h3 className="picker__sub">Usually included</h3>
              <ul className="ticks">
                {s.includes.map((t, i) => (
                  <motion.li
                    key={t}
                    {...rise(0.06 * i + 0.1, 0, 0.4)}
                    initial={{ opacity: 0, transform: "translateX(-10px)" }}
                    animate={{ opacity: 1, transform: "translateX(0px)" }}
                  >
                    <Tick />
                    {t}
                  </motion.li>
                ))}
              </ul>

              <p className="picker__good">
                <b>Good for:</b> {s.goodFor}
              </p>
              <LinkButton to={`/contact?service=${s.id}`} variant="gold">
                Ask about this
              </LinkButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const know = [
  {
    title: "Tell us about the home.",
    text: "How many bedrooms and bathrooms, and roughly how big it is. It lets us plan the time and give you a straight answer.",
  },
  {
    title: "Rugs: send a photo.",
    text: "Text a photo with the size and what's on it. That's the quickest way to find out if we can help.",
  },
  {
    title: "Landlords: give us the dates.",
    text: "Tell us the move-out date and when the next tenant arrives so the clean fits the gap.",
  },
];

function GoodToKnow() {
  return (
    <section className="section section--sand">
      <div className="container know">
        <div className="know__intro">
          <Headline as="h2" className="display display--lg" text="Before you *book.*" inView />
          <Reveal as="p" className="lead">
            A little detail up front means fewer surprises on the day.
          </Reveal>
        </div>
        <Stagger className="know__list" stagger={0.1}>
          {know.map((k) => (
            <Item key={k.title} className="know__item">
              <h3>{k.title}</h3>
              <p>{k.text}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Pick the clean your home *needs.*"
        text="Five services, each described plainly. Not sure which one fits? Call and we'll help you choose."
      />
      <Picker />
      <GoodToKnow />
      <CtaBand />
    </>
  );
}
