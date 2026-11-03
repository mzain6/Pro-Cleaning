import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { Counter, Item, Reveal, Stagger, popIn } from "../components/motion.jsx";
import { CtaBand, PageHeader, SectionHeading, Stars } from "../components/ui.jsx";
import { quickQuotes, reviewTopics, reviews, site } from "../data/content.js";

function Summary() {
  const max = Math.max(...reviewTopics.map((t) => t.count));
  return (
    <section className="section">
      <div className="container summary">
        <Reveal className="summary__score">
          <div className="summary__big">
            <Counter to={site.rating} decimals={1} />
          </div>
          <Stars size={26} />
          <p>
            Based on <b>{site.reviewCount}</b> Google reviews
          </p>
          <motion.a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            See us on Google <ExternalLink size={16} />
          </motion.a>
        </Reveal>

        <Reveal className="summary__topics">
          <h2 className="h3">What customers mention most</h2>
          <ul>
            {reviewTopics.map((t, i) => (
              <li key={t.label}>
                <span>{t.label}</span>
                <div className="bar">
                  <motion.i
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(t.count / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <b>{t.count}</b>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCards() {
  return (
    <section className="section section--cream-2">
      <div className="container">
        <SectionHeading
          eyebrow="Real customer reviews"
          title="What people say about working with us"
          text="Pulled from our public Google reviews — including our replies."
        />
        <Stagger className="reviews" stagger={0.14}>
          {reviews.map((r) => (
            <Item key={r.name}>
              <motion.article className="review" whileHover={{ y: -6 }}>
                <Quote className="review__q" size={44} />
                <header className="review__head">
                  <span className="avatar">{r.name.charAt(0)}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <small>{r.meta}</small>
                  </div>
                  <Stars size={15} />
                </header>
                <p className="review__text">{r.text}</p>
                <div className="review__reply">
                  <b>Response from the owner</b>
                  <p>{r.reply}</p>
                </div>
              </motion.article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function QuickQuotes() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="In a nutshell" title="More kind words" />
        <Stagger className="grid grid--3" stagger={0.12}>
          {quickQuotes.map((q) => (
            <Item key={q.text} variants={popIn}>
              <motion.figure className="quote-tile" whileHover={{ y: -6, rotate: -0.6 }}>
                <span className="stars stars--gold">
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                </span>
                <blockquote>"{q.text}"</blockquote>
                <figcaption>— {q.name}</figcaption>
              </motion.figure>
            </Item>
          ))}
        </Stagger>
        <Reveal className="center mt-lg">
          <motion.a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn--dark"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            Read all {site.reviewCount} reviews on Google <ExternalLink size={16} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Reviews() {
  return (
    <>
      <PageHeader
        crumb="Reviews"
        eyebrow="Customer reviews"
        title="Five stars, one review at a time."
        text="Our reputation is built on showing up, communicating and doing great work."
      />
      <Summary />
      <ReviewCards />
      <QuickQuotes />
      <CtaBand title="Join our list of happy customers." />
    </>
  );
}
