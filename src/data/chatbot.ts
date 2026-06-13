// Rule-based chatbot knowledge base. Keyword-matched, zero backend.
// Anything not confidently matched falls back to a WhatsApp handoff.
import { siteConfig, FAQS, AMENITIES } from './site';

export type Intent = {
  id: string;
  /** Shown as a quick-reply chip when `chip` is true. */
  label: string;
  chip?: boolean;
  keywords: string[];
  answer: string;
  /** Surface a "Chat on WhatsApp" button under this answer. */
  handoff?: boolean;
};

const priceSet = siteConfig.pricePerNight && !siteConfig.pricePerNight.includes('_');

// Curated intents first (higher quality than the raw FAQ), then the FAQs.
export const INTENTS: Intent[] = [
  {
    id: 'price',
    label: 'Pricing',
    chip: true,
    keywords: ['price', 'cost', 'rate', 'tariff', 'charge', 'how much', 'per night', 'budget', 'expensive'],
    answer: priceSet
      ? `It's ₹${siteConfig.pricePerNight} per night. The whole home is booked just for your group — no shared spaces. For exact totals on your dates, tap below to message us.`
      : `Rates vary by season and group size. Tap below and we'll share current pricing on WhatsApp.`,
    handoff: true,
  },
  {
    id: 'book',
    label: 'Book / availability',
    chip: true,
    keywords: ['book', 'booking', 'available', 'availability', 'reserve', 'dates', 'vacancy', 'free on'],
    answer:
      "Happy to help you book! You can send your dates through the booking form on this page, or message us directly on WhatsApp for the fastest confirmation.",
    handoff: true,
  },
  {
    id: 'location',
    label: 'How to reach',
    chip: true,
    keywords: ['where', 'location', 'reach', 'directions', 'address', 'map', 'far', 'distance', 'bengaluru', 'bangalore'],
    answer: `We're near ${siteConfig.address.split(',').slice(0, 2).join(', ')}, at ${siteConfig.elevation} — about ${siteConfig.distanceFromBengaluru} from Bengaluru. Use the Explore map on this page to draw live driving directions from any nearby spot.`,
  },
  {
    id: 'capacity',
    label: 'How many guests',
    chip: true,
    keywords: ['guests', 'people', 'sleep', 'capacity', 'how many', 'group', 'family', 'rooms'],
    answer:
      "The home comfortably sleeps 8–10 across the hall, bedroom and backyard lounge, booked as a whole — perfect for families or groups.",
  },
  {
    id: 'amenities',
    label: 'Amenities',
    chip: true,
    keywords: ['amenities', 'facilities', 'wifi', 'wi-fi', 'kitchen', 'geyser', 'hot water', 'tv', 'parking', 'ac', 'air conditioning', 'power', 'generator'],
    answer: `You get: ${AMENITIES.join(', ')}. No AC — at 906 m the mountain air does the job.`,
  },
];

// Fold the FAQ entries in as fallback intents (keywords from the question words).
const STOP = new Set(['what', 'the', 'are', 'and', 'is', 'do', 'we', 'how', 'to', 'a', 'of', 'on', 'for', 'you', 'our', 'check']);
for (const f of FAQS) {
  INTENTS.push({
    id: `faq-${f.q.slice(0, 12)}`,
    label: f.q,
    keywords: f.q.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)),
    answer: f.a,
  });
}

export const GREETING =
  "Hi! I'm the Mungaru helper 🌿 Ask me about pricing, availability, how to reach us, or amenities — or tap a question below.";

export const FALLBACK =
  "I want to get that exactly right for you — let me hand you to us on WhatsApp for a quick answer.";

/** Pick the best-matching intent for a free-text message, or null. */
export function matchIntent(text: string): Intent | null {
  const q = text.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) if (q.includes(kw)) score += kw.includes(' ') ? 2 : 1;
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore > 0 ? best : null;
}
