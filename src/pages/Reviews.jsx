import { ExternalLink } from "lucide-react";
import { Counter, Headline, Item, Reveal, Stagger } from "../components/motion.jsx";
import { CtaBand, Label, PageHeader, StarRating } from "../components/ui.jsx";
import { reviewTopics, reviews, site } from "../data/content.js";

function Summary() {
  return (
    <section className="section summary-section">
      <div className="container summary">
        <Reveal className="summary__score">
          <div className="summary__big">
            <Counter to={site.rating} decimals={1} />
          </div>
          <StarRating value={site.rating} size={26} />
          <p>
            from <b>{site.reviewCount}</b> Google reviews
          </p>
        </Reveal>

        <Reveal className="summary__side" delay={0.1}>
          <Label>Mentioned most</Label>
          <ul className="chips">
            {reviewTopics.map((t) => (
              <li key={t.label}>
                {t.label} <b>{t.count}</b>
              </li>
            ))}
          </ul>
          <p className="summary__note">
            Topics Google picked out of the reviews. The profile lists six more.
          </p>
          <div className="summary__actions">
            <a href={site.profileUrl} target="_blank" rel="noreferrer" className="btn btn--dark">
              Read them on Google <ExternalLink size={16} />
            </a>
            <a href={site.profileUrl} target="_blank" rel="noreferrer" className="btn btn--line">
              Write a review
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewList() {
  return (
    <section className="section section--sand">
      <div className="container">
        <div className="head">
          <Label>In their words</Label>
          <Headline as="h2" className="display display--lg" text="Three customers, *quoted.*" inView />
        </div>
        <Stagger className="quotes" stagger={0.14}>
          {reviews.map((r, i) => (
            <Item as="article" key={r.name} className={`quote ${i === 0 ? "quote--lead" : ""}`}>
              <span className="quote__mark" aria-hidden="true">
                “
              </span>
              <blockquote className="quote__pull">{r.pull}</blockquote>
              <p className="quote__text">{r.text}</p>
              <footer className="quote__who">
                <StarRating value={5} size={16} />
                <span>
                  <b>{r.name}</b> · {r.meta}
                </span>
              </footer>
            </Item>
          ))}
        </Stagger>
        <Reveal className="center quotes__more">
          <a href={site.profileUrl} target="_blank" rel="noreferrer" className="btn btn--dark">
            Read all {site.reviewCount} reviews on Google <ExternalLink size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Reviews() {
  return (
    <>
      <PageHeader
        label="Reviews"
        title="What customers *say.*"
        text="4.7 stars across 27 Google reviews. Here are a few, in their own words."
      />
      <Summary />
      <ReviewList />
      <CtaBand />
    </>
  );
}
