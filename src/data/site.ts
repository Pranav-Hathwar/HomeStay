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
  phone: '9180XXXXXXXX',            // <PHONE> WhatsApp number, digits only, country code first
  email: 'hello@example.com',       // <EMAIL>
  airbnbUrl: 'https://www.airbnb.co.in/', // <AIRBNB_LISTING_URL>
  instagramUrl: 'https://instagram.com/', // <INSTAGRAM_URL>
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

/** Prefilled WhatsApp link. */
export function whatsappUrl(message?: string): string {
  const text = message ?? "Hi Mungaru Homestays! I'd like to know more about the stay.";
  return `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(text)}`;
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
