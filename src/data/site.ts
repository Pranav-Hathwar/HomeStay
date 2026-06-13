// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — fill in the <PLACEHOLDERS> below before going live.
// ─────────────────────────────────────────────────────────────────────────────

export const ORIGIN = '13.04369,75.61125'; // homestay coords for map directions

export const siteConfig = {
  name: 'Mungaru Homestays',
  tagline: 'A private Malnad cottage in Gowdahalli Horati, Mudigere.',
  address:
    'Gowdahalli Horati, Mudigere, Chikkamagaluru District, Karnataka 577132, India',
  coords: ORIGIN,
  coordsLabel: '13.04369, 75.61125',
  coordsDMS: "13°02'37\"N 75°36'40\"E",
  elevation: '906 m',
  distanceFromBengaluru: '~252 km',

  // ── PLACEHOLDERS — replace these ──────────────────────────────────────────
  phone: '91 9945322145',            // <PHONE> WhatsApp number, digits only, country code first
  email: 'pranav4hathwar@gmail.com',       // <EMAIL>
  airbnbUrl: 'https://www.airbnb.co.in/', // <AIRBNB_LISTING_URL>
  instagramUrl: 'https://instagram.com/', // <INSTAGRAM_URL>
  pricePerNight: '600 per person',            // <PRICE> e.g. '4,500' — shown as "from ₹4,500 / night"
  siteUrl: 'https://home-stay-two.vercel.app', // <SITE_URL> canonical/OG/sitemap base, no trailing slash
  ogImage: '/og-image.jpg',         // <OG_IMAGE> 1200×630, placed in /public
  // ──────────────────────────────────────────────────────────────────────────

  mapsUrl: 'https://www.google.com/maps?q=13.04369,75.61125',
  mapsApiKey: import.meta.env.VITE_MAPS_API_KEY ?? '', // see .env (VITE_MAPS_API_KEY)
};

export type Attraction = {
  name: string;
  distance: string;
  type: string;
  coords: string;
  img: string; // key into attractionImages in data/images.ts
};

// Origin (homestay): 13.04369, 75.61125. Clicking opens directions FROM here TO dest.
export const ATTRACTIONS: Attraction[] = [
  { name: 'Ettina Bhuja',        distance: '~9 km',  type: 'Trek · Peak',       coords: '12.9785,75.5666', img: 'ettina-bhuja.jpg' },
  { name: 'Deveramane Betta',    distance: '~13 km', type: 'Viewpoint · Trek',  coords: '13.0569,75.5380', img: 'devarmane.jpg' },
  { name: 'Bettada Bhaireshwara',distance: '~18 km', type: 'Temple · Heritage', coords: '13.0462,75.6115', img: 'bettada-bhaireshwara.jpg' },
  { name: 'Manjarabad Fort',     distance: '~32 km', type: "Tipu's star fort",  coords: '12.9175,75.7584', img: 'fort.jpg' },
  { name: 'Belur Temple',        distance: '~39 km', type: 'Hoysala heritage',  coords: '13.1630,75.8603', img: 'belur.jpg' },
  { name: 'Dharmasthala',        distance: '~69 km', type: 'Pilgrimage',        coords: '12.9504,75.3809', img: 'dharmastala.jpg' },
  { name: 'Kudremukh',           distance: '~91 km', type: 'National park trek',coords: '13.1413,75.2537', img: 'kudremukh.jpg' },
];

export type Review = { name: string; place: string; date: string; stars: number; quote: string };

// Placeholder guest reviews — swap with real Airbnb/Google quotes before launch.
export const REVIEWS: Review[] = [
  { name: 'Ananya R.', place: 'Bengaluru', date: 'Aug 2025', stars: 5, quote: 'Woke up to clouds rolling through the valley. The whole house to ourselves, spotless, and the host guided us to a sunrise trek. Already planning our return.' },
  { name: 'Karthik & Meera', place: 'Mysuru', date: 'Jul 2025', stars: 5, quote: 'The monsoon view from the backyard is unreal. Hot water, full kitchen, fast Wi-Fi — wild outside, completely comfortable inside.' },
  { name: 'Daniel F.', place: 'Goa', date: 'Jun 2025', stars: 5, quote: 'Perfect base for Ettina Bhuja and Kudremukh. Quiet, private, and the directions on WhatsApp made everything effortless.' },
  { name: 'Sneha P.', place: 'Hyderabad', date: 'May 2025', stars: 5, quote: 'Came for a digital detox, left recharged. Birdsong, rain, coffee on the veranda. The photos do not do the green justice.' },
  { name: 'Rohan M.', place: 'Chennai', date: 'Apr 2025', stars: 5, quote: 'Booked the whole place for a family of nine. Everyone had space, the kids loved the hall, and the power backup held through a storm.' },
  { name: 'Aisha K.', place: 'Pune', date: 'Mar 2025', stars: 5, quote: 'Genuinely the most peaceful stay we have had in the Ghats. Thoughtful host, immaculate home, and that first-rain Mungaru magic.' },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: 'What are the check-in and check-out times?', a: 'Check-in is from 1:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can often be arranged — just ask on WhatsApp.' },
  { q: 'Is food provided?', a: 'The home has a full kitchen — gas stove, induction, fridge, microwave and air fryer — so you can cook freely. Home-cooked Malnad meals can be arranged on request for an extra charge.' },
  { q: 'Are pets allowed?', a: 'Well-behaved pets are welcome with prior notice. Please mention your pet when you message us so we can prepare the space.' },
  { q: 'How is the mobile network and Wi-Fi?', a: 'Wi-Fi is available throughout the house and is fast enough to work remotely. Mobile coverage is decent for Jio and Airtel; expect the occasional rural dropout.' },
  { q: 'How do we reach the homestay?', a: 'The cottage is ~252 km from Bengaluru, near Gowdahalli Horati, Mudigere, at 906 m. Tap any location on the Explore map for live driving directions from the doorstep.' },
];

export const AMENITIES = [
  'Wi-Fi',
  'Refrigerator',
  'Full TV Setup',
  'Microwave Oven',
  'Air Fryer',
  'Gas Stove',
  'Induction Cooktop',
  'Hot Water (Geyser)',
  'Ceiling Fans',
  'Power Backup (Generator)',
  'Free Parking',
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Google Maps directions deep-link (no API key required). */
export function directionsUrl(destCoords: string): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN}&destination=${destCoords}&travelmode=driving`;
}

/** Google Maps Embed (directions mode). Returns null if no API key configured. */
export function embedDirectionsUrl(destCoords: string): string | null {
  const key = siteConfig.mapsApiKey;
  if (!key) return null;
  return `https://www.google.com/maps/embed/v1/directions?key=${key}&origin=${ORIGIN}&destination=${destCoords}&mode=driving`;
}

/** Phone digits only (no spaces/+/dashes) — the format wa.me requires. */
export const phoneDigits = siteConfig.phone.replace(/\D/g, '');

/** Prefilled WhatsApp link. */
export function whatsappUrl(message?: string): string {
  const text = message ?? "Hi Mungaru Homestays! I'd like to know more about the stay.";
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`;
}

export function bookingMessage(checkIn: string, checkOut: string, guests: string): string {
  return (
    `Hi Mungaru Homestays! I'd like to check availability.\n\n` +
    `• Check-in: ${checkIn}\n` +
    `• Check-out: ${checkOut}\n` +
    `• Guests: ${guests}\n\n` +
    `Could you confirm if these dates are open?`
  );
}
