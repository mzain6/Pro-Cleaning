import {
  Hammer,
  Wrench,
  Sparkles,
  Droplets,
  PaintRoller,
  SprayCan,
  Zap,
  MessageCircle,
  BadgeCheck,
  Handshake,
  Smile,
  ClipboardList,
  Phone,
  Brush,
} from "lucide-react";

/* ----------------------------------------------------------------------------
   Business details — taken from the Google Maps profile.
   Edit here and every page updates.
---------------------------------------------------------------------------- */
const street = "407 Laurel St";
const cityLine = "Lancaster, PA 17603";
const fullAddress = `${street}, ${cityLine}`;

export const site = {
  name: "Pro-Cleaning & Handyman Services LLC",
  phone: "(717) 869-9924",
  phoneHref: "tel:+17178699924",
  smsNumber: "+17178699924",
  street,
  cityLine,
  fullAddress,
  // Google only lists "Closes 8 pm" — replace with the full weekly schedule when known.
  hours: "Open until 8 PM",
  rating: 5.0,
  reviewCount: 16,
  areas: ["Lancaster", "York", "Lititz", "Ephrata", "Millersville", "Columbia"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`Pro-Cleaning & Handyman Services LLC ${fullAddress}`),
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(fullAddress),
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`,
  // Optional: paste a Formspree / Getform endpoint here to have the quote form deliver by email.
  formEndpoint: "",
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

/* ----------------------------------------------------------------------------
   Services
---------------------------------------------------------------------------- */
export const serviceFilters = ["All", "Interior", "Exterior", "Cleaning", "Remodeling"];

export const services = [
  {
    id: "drywall",
    icon: PaintRoller,
    category: "Interior",
    title: "Drywall Repair & Installation",
    blurb:
      "Damaged walls and ceilings repaired or newly installed, with texture matching and a smooth finish that's ready for paint.",
    points: [
      "Wall cracks & seam stress",
      "Water-damaged sheetrock",
      "Door-knob punctures & dents",
      "Full panel installation",
    ],
  },
  {
    id: "ceiling",
    icon: Droplets,
    category: "Interior",
    title: "Ceiling & Leak Repair",
    blurb:
      "Ceiling stains and leak damage dealt with quickly, then restored so the room looks like nothing ever happened.",
    points: ["Ceiling stain repair", "Leak-damage restoration", "Patch, prime & finish"],
  },
  {
    id: "handyman",
    icon: Wrench,
    category: "Interior",
    title: "General Handyman Repairs",
    blurb:
      "The small-to-medium jobs that pile up around a home — handled by one reliable crew instead of five different calls.",
    points: ["Interior home repairs", "Fixes & touch-ups", "Last-minute jobs welcome"],
  },
  {
    id: "remodeling",
    icon: Hammer,
    category: "Remodeling",
    title: "Remodeling Projects",
    blurb:
      "Kitchen, bathroom and interior refreshes planned and finished with care — from framing to a paint-ready surface.",
    points: ["Kitchen updates", "Bathroom updates", "New wall framing"],
  },
  {
    id: "pressure",
    icon: SprayCan,
    category: "Exterior",
    title: "Pressure Washing",
    blurb:
      "Bring driveways, siding, patios and walkways back to life and boost your curb appeal in a single visit.",
    points: ["Driveways & walkways", "Siding & exteriors", "Patios & decks"],
  },
  {
    id: "cleaning",
    icon: Sparkles,
    category: "Cleaning",
    title: "Professional Cleaning",
    blurb:
      "Detail-oriented cleaning that customers describe as \"amazing\" — and we always clean up after our own work too.",
    points: ["Home cleaning", "Post-project clean-up", "Detail-focused results"],
  },
];

/* ----------------------------------------------------------------------------
   Why choose us — each point comes straight from what customers say on Google.
---------------------------------------------------------------------------- */
export const reasons = [
  {
    icon: Zap,
    title: "Prompt & Reliable",
    text: "\"Timeliness\" is the #1 thing customers mention. We show up, and we get it done efficiently.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    text: "You're kept updated on progress from the first call to the final walkthrough.",
  },
  {
    icon: BadgeCheck,
    title: "Craftsmanship You Can See",
    text: "Smooth, texture-matched finishes that look original — not like a repair.",
  },
  {
    icon: Smile,
    title: "We Clean Up After Ourselves",
    text: "Every job ends with the space tidied up. Our name is Pro-Cleaning for a reason.",
  },
];

export const process = [
  {
    icon: Phone,
    title: "Call or message us",
    text: "Tell us what's going on — a quick description or a few photos is plenty.",
  },
  {
    icon: ClipboardList,
    title: "Get a clear plan",
    text: "We explain the scope of the work and what it will take before we begin.",
  },
  {
    icon: Hammer,
    title: "We do the work",
    text: "Our team handles the repair, install or project with attention to detail.",
  },
  {
    icon: Brush,
    title: "Clean & done",
    text: "We tidy up and walk you through the result so you're happy before we leave.",
  },
];

export const values = [
  {
    icon: Handshake,
    title: "Trust first",
    text: "We treat every home like our own and every customer like a neighbor — because they are.",
  },
  {
    icon: Zap,
    title: "Respect your time",
    text: "Show up when we say, keep you in the loop, and finish efficiently.",
  },
  {
    icon: BadgeCheck,
    title: "Finish it properly",
    text: "Smooth walls, matched textures, tidy job sites. The details are the job.",
  },
];

/* ----------------------------------------------------------------------------
   Reviews — quoted from the public Google reviews.
---------------------------------------------------------------------------- */
export const reviews = [
  {
    name: "Jasmin Hernandez",
    meta: "Local Guide · 8 reviews",
    text: "I had a terrible leak in my bedroom that was coming from the roof of the apartment I rent. Elisandro and his team came in and had the work done within an efficient amount of time. He was great at keeping me updated on the progress…",
    reply:
      "Thank you so much for the wonderful review! We're thrilled to hear that Elisandro and the team were able to take care of your ceiling leak efficiently and leave you happy with the results.",
  },
  {
    name: "Randy Graffa",
    meta: "Google reviewer",
    text: "Pro-Cleaning did a great job with the pressure washing and some additional remodeling projects. If looking for a handyman in Lancaster, PA, call these guys. Highly recommended.",
    reply:
      "Firstly, thank you for choosing us, and secondly, we are very grateful and happy to have achieved your satisfaction within the project for which you selected us. Thank you again, and you can count on us anytime.",
  },
  {
    name: "Jessica Sload",
    meta: "Google reviewer",
    text: "I would recommend this company to anyone. Very professional and outstanding work I needed done at the last minute. Everything was done correctly and quickly for the job I needed done and he even cleaned everything up when he was done.",
    reply: "Thank you very much for your words.",
  },
];

export const quickQuotes = [
  { text: "They were very prompt and professional and did an amazing job cleaning.", name: "Google reviewer" },
  { text: "Thank you Elisandro for your excellent work.", name: "Google reviewer" },
  { text: "Very professional and outstanding work I needed done at the last minute.", name: "Jessica Sload" },
];

// Topics Google highlights from the 16 reviews.
export const reviewTopics = [
  { label: "Timeliness", count: 4 },
  { label: "Spectacular work", count: 2 },
  { label: "Communication", count: 2 },
  { label: "Work done", count: 2 },
  { label: "Cleaning", count: 2 },
];

export const faqs = [
  {
    q: "Which areas do you serve?",
    a: "We're based on Laurel St in Lancaster, PA and serve Lancaster, York, Lititz, Ephrata, Millersville and Columbia. Not sure if you're in range? Just give us a call.",
  },
  {
    q: "How do I get a quote?",
    a: "Call us at (717) 869-9924 or send a message through the contact page with a short description of the job. Photos help a lot.",
  },
  {
    q: "Can you match my existing wall texture after a drywall repair?",
    a: "Yes. Texture matching and a smooth, paint-ready finish are a core part of every drywall repair we do.",
  },
  {
    q: "Do you take last-minute jobs?",
    a: "Many of our customers reach out when something needs fixing right away. Call us and we'll do our best to fit you in.",
  },
  {
    q: "Will you clean up after the job?",
    a: "Always. Customers regularly mention that we leave the space spotless — it's part of how we work.",
  },
];
