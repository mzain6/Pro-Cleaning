import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, ChevronDown, PaintRoller } from "lucide-react";
import { CtaBand, LinkButton, PageHeader, SectionHeading } from "../components/ui.jsx";
import { Item, Reveal, Stagger, ease, slideLeft, slideRight } from "../components/motion.jsx";
import { faqs, serviceFilters, services } from "../data/content.js";

const drywallItems = [
  "Wall cracks",
  "Water-damaged sheetrock",
  "Door-knob punctures",
  "Seam stress",
  "Ceiling stains",
  "Full panel installations",
];

function DrywallSpotlight() {
  return (
    <section className="section">
      <div className="container spotlight">
        <Reveal variants={slideLeft} className="spotlight__copy">
          <span className="eyebrow">Our specialty</span>
          <h2 className="h2">Drywall repair &amp; installation</h2>
          <p className="lead">
            Interior walls and ceilings need to stay smooth and structurally sound to protect
            insulation, keep your home looking its best and support finished interior surfaces.
            We repair damaged surfaces and install new wall framing and panels — with careful
            texture matching and smooth finishes, ready for paint.
          </p>
          <ul className="checks">
            {drywallItems.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.07 * i, duration: 0.45, ease }}
              >
                <span>
                  <Check size={14} strokeWidth={3} />
                </span>
                {d}
              </motion.li>
            ))}
          </ul>
          <LinkButton to="/contact" className="btn btn--primary">
            Get a drywall quote
          </LinkButton>
        </Reveal>

        <Reveal variants={slideRight} className="spotlight__visual">
          <div className="wall">
            <motion.div
              className="wall__panel wall__panel--1"
              initial={{ rotate: -6, y: 30 }}
              whileInView={{ rotate: -3, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span>Before</span>
              <svg viewBox="0 0 120 80" aria-hidden="true">
                <path
                  d="M10 10 L35 30 L28 44 L58 60 L50 78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="94" cy="34" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              <small>Cracks &amp; punctures</small>
            </motion.div>
            <motion.div
              className="wall__panel wall__panel--2"
              initial={{ rotate: 6, y: 40 }}
              whileInView={{ rotate: 3, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            >
              <span>After</span>
              <PaintRoller size={52} strokeWidth={1.6} />
              <small>Smooth, paint-ready</small>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceGrid() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="section section--cream-2">
      <div className="container">
        <SectionHeading
          eyebrow="All services"
          title="Whatever the job, we've got it"
          text="Filter by type to see what we do."
        />

        <LayoutGroup>
          <div className="filters" role="tablist" aria-label="Filter services">
            {serviceFilters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`filters__btn ${filter === f ? "is-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="filters__pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{f}</span>
              </button>
            ))}
          </div>

          <div className="grid grid--2">
            <AnimatePresence mode="popLayout">
              {list.map((s) => (
                <motion.article
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease }}
                  whileHover={{ y: -6 }}
                  className="card service-wide"
                >
                  <span className="icon-box">
                    <s.icon size={28} />
                  </span>
                  <div>
                    <span className="tag tag--soft">{s.category}</span>
                    <h3>{s.title}</h3>
                    <p>{s.blurb}</p>
                    <ul className="mini-list">
                      {s.points.map((p) => (
                        <li key={p}>
                          <Check size={15} strokeWidth={3} /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container container--narrow">
        <SectionHeading eyebrow="FAQ" title="Questions we hear a lot" />
        <Stagger className="faq" stagger={0.08}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Item key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease }}
                      className="faq__a"
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader
        crumb="Services"
        eyebrow="Our services"
        title="Repairs, remodels & a spotless finish."
        text="Drywall, ceilings, remodeling, pressure washing and cleaning — handled by one prompt, professional team."
      />
      <DrywallSpotlight />
      <ServiceGrid />
      <Faq />
      <CtaBand title="Got a project in mind?" />
    </>
  );
}
