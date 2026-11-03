import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Copy, MapPin, MessageCircle, Navigation, Phone, Send } from "lucide-react";
import { PageHeader, SectionHeading } from "../components/ui.jsx";
import { Item, Reveal, Stagger, ease, slideLeft, slideRight } from "../components/motion.jsx";
import { services, site } from "../data/content.js";

const serviceOptions = [...services.map((s) => s.title), "Something else"];

const empty = { name: "", phone: "", service: serviceOptions[0], city: site.areas[0], message: "" };

function buildMessage(f) {
  return (
    `Hi Pro-Cleaning & Handyman, I'd like a quote.\n` +
    `Name: ${f.name}\n` +
    `Phone: ${f.phone}\n` +
    `Service: ${f.service}\n` +
    `City: ${f.city}\n` +
    `Details: ${f.message || "(none)"}`
  );
}

function QuoteForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | prepared | error
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const message = buildMessage(form);

  async function onSubmit(e) {
    e.preventDefault();

    // If an email-forwarding endpoint is configured in data/content.js, deliver there.
    if (site.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Otherwise prepare the message so the customer can text or call us in one tap.
    setStatus("prepared");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  const reset = () => {
    setForm(empty);
    setStatus("idle");
  };

  return (
    <div className="form-card">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" || status === "prepared" ? (
          <motion.div
            key="done"
            className="form-done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
          >
            <motion.span
              className="form-done__icon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.15 }}
            >
              <Check size={34} strokeWidth={3} />
            </motion.span>

            {status === "sent" ? (
              <>
                <h3>Thanks, {form.name.split(" ")[0] || "friend"}!</h3>
                <p>We got your request and will get back to you shortly.</p>
              </>
            ) : (
              <>
                <h3>Your request is ready</h3>
                <p>
                  Send it to us as a text, or call and tell us about the job. Either way we'll take
                  it from there.
                </p>
                <pre className="form-done__msg">{message}</pre>
                <div className="form-done__actions">
                  <a
                    className="btn btn--primary"
                    href={`sms:${site.smsNumber}?body=${encodeURIComponent(message)}`}
                  >
                    <MessageCircle size={18} /> Send as text
                  </a>
                  <a className="btn btn--dark" href={site.phoneHref}>
                    <Phone size={18} /> Call us
                  </a>
                  <button type="button" className="btn btn--ghost-dark" onClick={copy}>
                    {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </>
            )}
            <button type="button" className="link-btn" onClick={reset}>
              Start a new request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            noValidate={false}
          >
            <h2 className="h3">Request a quote</h2>
            <p className="form__intro">Tell us about the job — we'll reply with next steps.</p>

            <div className="form__row">
              <label>
                <span>Your name</span>
                <input required value={form.name} onChange={set("name")} placeholder="Jane Smith" autoComplete="name" />
              </label>
              <label>
                <span>Phone number</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(717) 555-0123"
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="form__row">
              <label>
                <span>Service needed</span>
                <select value={form.service} onChange={set("service")}>
                  {serviceOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Your city</span>
                <select value={form.city} onChange={set("city")}>
                  {site.areas.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label>
              <span>Project details</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us what needs fixing, cleaning or building…"
              />
            </label>

            {status === "error" && (
              <p className="form__error" role="alert">
                Something went wrong sending that. Please call us at {site.phone}.
              </p>
            )}

            <motion.button
              type="submit"
              className="btn btn--primary btn--lg btn--block"
              disabled={status === "sending"}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === "sending" ? "Sending…" : "Send request"} <Send size={18} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCards() {
  const cards = [
    {
      icon: Phone,
      title: "Call us",
      body: <a href={site.phoneHref}>{site.phone}</a>,
      note: "Fastest way to reach us",
    },
    {
      icon: MapPin,
      title: "Visit us",
      body: (
        <a href={site.directionsUrl} target="_blank" rel="noreferrer">
          {site.street}, {site.cityLine}
        </a>
      ),
      note: "Tap for directions",
    },
    {
      icon: Clock,
      title: "Hours",
      body: <span>{site.hours}</span>,
      note: "Call to confirm availability",
    },
  ];

  return (
    <Stagger className="info-cards" stagger={0.12}>
      {cards.map((c) => (
        <Item key={c.title}>
          <motion.div className="info-card" whileHover={{ x: 6 }}>
            <span className="icon-box">
              <c.icon size={22} />
            </span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <small>{c.note}</small>
            </div>
          </motion.div>
        </Item>
      ))}
    </Stagger>
  );
}

export default function Contact() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="Get in touch"
        title="Let's talk about your project."
        text="Call, text or send us the details. We keep you updated every step of the way."
      />

      <section className="section">
        <div className="container contact">
          <Reveal variants={slideLeft} className="contact__side">
            <InfoCards />
            <div className="areas-box">
              <h3>We serve</h3>
              <div className="areas-box__tags">
                {site.areas.map((a) => (
                  <span className="tag" key={a}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal variants={slideRight} className="contact__main">
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="section section--cream-2 map-section">
        <div className="container">
          <SectionHeading
            eyebrow="Find us"
            title="Based on Laurel Street, Lancaster"
            text={`${site.street}, ${site.cityLine}`}
          />
          <Reveal className="map">
            <iframe
              title="Map showing Pro-Cleaning & Handyman Services LLC in Lancaster, PA"
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <motion.a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary map__btn"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <Navigation size={18} /> Get directions
            </motion.a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
