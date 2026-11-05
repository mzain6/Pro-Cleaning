/* ----------------------------------------------------------------------------
   Business details and copy for the whole site. Edit here and every page updates.

   Source: the Google Maps profile for Whoa Cleaning Services LLC.
   NOT on the profile, so deliberately left out of the site until you supply them:
     - street address / service area      - weekly opening hours
     - prices                              - the owner's own story and photos
   The service descriptions and "usually included" lists are draft copy written
   from what customers mention in their reviews. Check them against what you
   actually offer.
---------------------------------------------------------------------------- */

const mapsQuery = encodeURIComponent("Whoa Cleaning Services LLC");

export const site = {
  name: "Whoa Cleaning Services LLC",
  phone: "(484) 262-9031",
  phoneHref: "tel:+14842629031",
  smsHref: "sms:+14842629031",
  // Google only shows today's closing time. Replace with the full schedule when known.
  hours: "Closes at 6 PM",
  rating: 4.7,
  reviewCount: 27,
  identity: ["Black-owned", "Women-owned"],
  profileUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  // Optional: paste a Formspree / Getform endpoint to have the quote form deliver by email.
  // Left empty, the form prepares a text message the customer can send in one tap.
  formEndpoint: "",
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export const services = [
  {
    id: "standard",
    title: "Standard cleaning",
    short: "The regular reset for the whole house.",
    body: "A dependable clean for the rooms you use every day. Surfaces get dusted and wiped down, kitchens and bathrooms get scrubbed, and the floors are vacuumed and mopped.",
    includes: [
      "Dusting and wiping down surfaces",
      "Kitchen counters, sinks and appliance fronts",
      "Bathrooms: toilets, tubs, showers and mirrors",
      "Vacuuming and mopping floors",
    ],
    goodFor: "Busy weeks, guests on the way, or keeping a routine going.",
  },
  {
    id: "deep",
    title: "Deep cleaning",
    short: "A fresh start for a house that needs one.",
    body: "For a home that has gone a while without a proper clean. We go past the surface into corners, edges and the buildup a regular clean leaves behind.",
    includes: [
      "Baseboards, ledges and corners",
      "Built-up grime in kitchens and bathrooms",
      "Bedrooms and spaces that turned into storage",
      "Floors, edge to edge",
    ],
    goodFor: "First-time cleans, seasonal resets and homes that have been neglected.",
  },
  {
    id: "rental",
    title: "Rental and move-out cleaning",
    short: "A unit that's ready for the next tenant.",
    body: "Landlords and property owners bring us in between tenants. Tell us the move-out date and the size of the place and we'll plan around it.",
    includes: [
      "Kitchens and bathrooms",
      "Floors and baseboards",
      "Closets, cabinets and storage spaces",
      "Doors, switches and fixtures wiped down",
    ],
    goodFor: "Landlords, property managers and anyone handing back keys.",
  },
  {
    id: "rugs",
    title: "Area rug cleaning",
    short: "Fresher rugs for living rooms and bedrooms.",
    body: "Rugs collect dust, spills and foot traffic. Tell us the size, the material and what's on it, and we'll tell you what we can do.",
    includes: [
      "Living room, bedroom and hallway rugs",
      "Stains and heavy-traffic areas: tell us what happened",
      "Send a photo and the size for a quicker answer",
    ],
    goodFor: "Rugs that look tired, smell stale or took a spill.",
  },
  {
    id: "rooms",
    title: "Room cleaning",
    short: "Just the rooms that need attention.",
    body: "You don't always need the whole house done. A bedroom that became a storage room, a kitchen before company, one space that needs work: tell us which rooms.",
    includes: [
      "Bedrooms and guest rooms",
      "Kitchens",
      "Bathrooms",
      "Living and dining areas",
    ],
    goodFor: "Specific rooms that have been put off for too long.",
  },
];

export const steps = [
  {
    title: "Call or text",
    text: "Tell us what needs cleaning and roughly when. One customer reached out on a Sunday night and was booked for the same week.",
  },
  {
    title: "Pick a time",
    text: "We confirm the day and when we'll arrive. Four reviews mention punctuality, so we treat showing up on time as part of the job.",
  },
  {
    title: "We clean, you look it over",
    text: "You come home to a house that feels reset, with the corners done too.",
  },
];

/* Reviews are quoted as they appear on Google. A trailing "…" means Google
   cut the text off there. Dates are left out on purpose ("4 years ago" goes stale). */
export const reviews = [
  {
    name: "Angel Harewood",
    meta: "Google Local Guide",
    pull: "My house was in a deep need for a fresh start and they provided it.",
    text: "…made my bedrooms actually look like bedrooms and not junk rooms.",
  },
  {
    name: "Tara Moore",
    meta: "Google review",
    pull: "Whoa cleaning has been providing exceptional service in many capacities for me since 2021.",
    text: "It began with cleaning to prepare for a new tenant at one of my properties, a deep cleaning for a 93 year old’s home I was POA for that then became …",
  },
  {
    name: "Sharmaine Stevenson",
    meta: "Google review",
    pull: "Empress and the team did an AMAZING job!",
    text: "I contacted them on Sunday night and they were able to fit me in for an appointment in the same week for a standard clean. …",
  },
];

/* Topics Google highlights from the reviews (number = reviews that mention it).
   The profile lists six more topics that aren't shown here. */
export const reviewTopics = [
  { label: "Attention to detail", count: 5 },
  { label: "Punctuality", count: 4 },
  { label: "Room cleaning", count: 2 },
  { label: "Area rug cleaning", count: 2 },
];

export const values = [
  {
    title: "Show up when we say.",
    text: "Customers bring up punctuality in four reviews. A cleaning appointment only works if you can plan your day around it.",
  },
  {
    title: "Look at the corners.",
    text: "Attention to detail is the topic reviewers mention most, in five reviews. It's the difference between tidy and clean.",
  },
  {
    title: "Treat every home like it matters.",
    text: "A rental between tenants, a family house that needed a fresh start, a relative's home: the standard stays the same.",
  },
];

export const toTell = [
  "Which service you're after, or what the problem is",
  "Roughly how big the home is (bedrooms and bathrooms)",
  "A date or time frame you have in mind",
  "Anything we should know: pets, stairs, special surfaces",
];
