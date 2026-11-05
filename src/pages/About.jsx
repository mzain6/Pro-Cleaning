import { motion } from "framer-motion";
import { CtaBand, Label, PageHeader } from "../components/ui.jsx";
import { Headline, Item, Reveal, Stagger, ease, slideLeft, slideRight } from "../components/motion.jsx";
import { reviewTopics, site, values } from "../data/content.js";

const jobs = [
  "Cleaning to prepare a rental for a new tenant",
  "A deep clean of a 93-year-old's home",
  "More jobs after that",
];

function Range() {
  return (
    <section className="section">
      <div className="container range">
        <Reveal variants={slideLeft} className="range__big">
          <span className="range__year">2021</span>
          <p>Tara Moore's Google review says we've worked with her since then.</p>
        </Reveal>

        <Reveal variants={slideRight} className="range__copy">
          <Label>Different jobs, same standard</Label>
          <Headline
            as="h2"
            className="display display--lg"
            text="Customers don't book us just once."
            inView
          />
          <p className="lead">
            The jobs vary. Tara Moore's review mentions a few of them:
          </p>
          <ol className="range__list">
            {jobs.map((j, i) => (
              <li key={j}>
                <span>{i + 1}</span>
                {j}
              </li>
            ))}
          </ol>
          <p className="range__credit">From Tara Moore's Google review.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section section--sand">
      <div className="container">
        <div className="head">
          <Label>How we work</Label>
          <Headline as="h2" className="display display--lg" text="Three habits customers notice." inView />
        </div>
        <Stagger className="values" stagger={0.12}>
          {values.map((v, i) => (
            <Item key={v.title} className="value">
              <span className="value__n">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Owners() {
  return (
    <section className="owners">
      <div className="container owners__grid">
        <Headline
          as="h2"
          className="display display--xl owners__title"
          text="Black-owned. *Women-owned.*"
          inView
        />
        <Reveal as="p" className="owners__text" delay={0.15}>
          That's who's behind {site.name}. Customers mention the team by name in their reviews.
        </Reveal>
      </div>
    </section>
  );
}

function Topics() {
  const max = Math.max(...reviewTopics.map((t) => t.count));
  return (
    <section className="section">
      <div className="container topics">
        <div className="topics__intro">
          <Label>In customers' words</Label>
          <Headline as="h2" className="display display--lg" text="What reviewers bring up." inView />
          <Reveal as="p" className="lead">
            Google picks out the topics that come up most in reviews. The number is how many reviews
            mention each one.
          </Reveal>
        </div>
        <ul className="bars">
          {reviewTopics.map((t, i) => (
            <li key={t.label}>
              <span className="bars__label">{t.label}</span>
              <span className="bars__track">
                <motion.i
                  initial={{ transform: "scaleX(0)" }}
                  whileInView={{ transform: `scaleX(${t.count / max})` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, delay: 0.12 * i, ease }}
                />
              </span>
              <b>{t.count}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        label="About"
        title="People who *notice* the details."
        text="Whoa Cleaning Services LLC is a Black-owned, women-owned house cleaning company. Here's what customers say we're like to work with."
      />
      <Range />
      <Values />
      <Owners />
      <Topics />
      <CtaBand title="Ready for a clean you *notice?*" />
    </>
  );
}
