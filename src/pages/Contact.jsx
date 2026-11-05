import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Copy, MessageSquare, Phone, Send } from "lucide-react";
import { CtaBand, Label, PageHeader } from "../components/ui.jsx";
import { Reveal, ease, slideLeft, slideRight } from "../components/motion.jsx";
import { services, site, toTell } from "../data/content.js";

const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

function buildMessage(f) {
  return (
    `Hi Whoa Cleaning, I'd like a quote.\n` +
    `Name: ${f.name}\n` +
    `Phone: ${f.phone}\n` +
    `Service: ${f.service}\n` +
    `When: ${f.when || "(flexible)"}\n` +
    `Details: ${f.message || "(none)"}`
  );
}

function QuoteForm() {
  const [params] = useSearchParams();
  const preset = services.find((s) => s.id === params.get("service"))?.title;
  const empty = { name: "", phone: "", service: preset ?? serviceOptions[0], when: "", message: "" };

  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | prepared | error
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const message = buildMessage(form);

  async function onSubmit(e) {
    e.preventDefault();

    // If an email-forwarding endpoint is set in data/content.js, deliver there.
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

    // Otherwise prepare the message so the customer can text or call in one tap.
    setStatus("prepared");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable: ignore */
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
            className="done"
            initial={{ opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <span className="done__icon">
              <Check size={28} strokeWidth={2.5} />
            </span>

            {status === "sent" ? (
              <>
                <h2 className="display display--md">Thanks, {form.name.split(" ")[0] || "friend"}.</h2>
                <p>We got your request and will get back to you shortly.</p>
              </>
            ) : (
              <>
                <h2 className="display display--md">Your message is ready.</h2>
                <p>Send it to us as a text, or call and tell us about the job. Either way we'll take it from there.</p>
                <pre className="done__msg">{message}</pre>
                <div className="done__actions">
                  <a className="btn btn--gold" href={`${site.smsHref}?&body=${encodeURIComponent(message)}`}>
                    <MessageSquare size={18} /> Send as text
                  </a>
                  <a className="btn btn--dark" href={site.phoneHref}>
                    <Phone size={18} /> Call us
                  </a>
                  <button type="button" className="btn btn--line" onClick={copy}>
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="display display--md">Request a quote</h2>
            <p className="form__intro">Tell us about the job and we'll reply with next steps.</p>

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
                  placeholder="(484) 555-0123"
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="form__row">
              <label>
                <span>Service</span>
                <select value={form.service} onChange={set("service")}>
                  {serviceOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>When would suit you?</span>
                <input value={form.when} onChange={set("when")} placeholder="A date or time frame" />
              </label>
            </div>

            <label>
              <span>Details</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Bedrooms, bathrooms, pets, anything we should know…"
              />
            </label>

            {status === "error" && (
              <p className="form__error" role="alert">
                Something went wrong sending that. Please call us at {site.phone}.
              </p>
            )}

            <button type="submit" className="btn btn--gold btn--lg btn--block" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send request"} <Send size={18} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Details() {
  return (
    <div className="reach">
      <Label>Fastest way</Label>
      <a href={site.phoneHref} className="reach__phone">
        {site.phone}
      </a>
      <p className="reach__line">
        <Clock size={16} /> {site.hours}. Call to confirm today's availability.
      </p>
      <div className="reach__actions">
        <a href={site.phoneHref} className="btn btn--gold">
          <Phone size={18} /> Call
        </a>
        <a href={site.smsHref} className="btn btn--line">
          <MessageSquare size={18} /> Text
        </a>
      </div>

      <h3 className="reach__sub">It helps to tell us</h3>
      <ul className="ticks ticks--plain">
        {toTell.map((t) => (
          <li key={t}>
            <span className="dot" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's talk about your *house.*"
        text="Call or text is quickest. If you'd rather write it down, fill in the form and we'll prepare a message for you to send."
      />
      <section className="section contact-section">
        <div className="container contact">
          <Reveal variants={slideLeft}>
            <Details />
          </Reveal>
          <Reveal variants={slideRight}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
      <CtaBand title="Prefer to just *call?*" text="We'll talk through what you need and find a time that works." />
    </>
  );
}
