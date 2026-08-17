// Typed image map — swap photos here and every section updates.
// Drop a new file in src/assets/ and re-point the import; nothing else changes.

import mudigere1 from '../assets/mudigere1.webp';
import mudigere2 from '../assets/mudigere2.webp';
import mudigere3 from '../assets/mudigere3.webp';
import mudigere4 from '../assets/mudigere4.webp';
import mudigere5 from '../assets/mudigere5.webp';
import mudigere6 from '../assets/mudigere6.webp';
import bathroom from '../assets/bathroom.webp';

import belur from '../assets/belur.webp';
import devarmane from '../assets/devarmane.webp';
import dharmastala from '../assets/dharmastala.webp';
import fort from '../assets/fort.webp';
import kudremukh from '../assets/kudremukh.webp';
import bettada from '../assets/bettada-bhaireshwara.webp';
import ettinaBhuja from '../assets/yetinabuja.webp';

export const property = {
  // Atmosphere / exteriors
  mistySunrise: mudigere1,
  foggyPath: mudigere5,
  houseFront: mudigere2,
  houseSide: mudigere3,
  houseCorner: mudigere4,
  verandaOutlook: mudigere6,
  // Rooms — drop the real shots here when ready
  livingHall: mudigere4,
  bedroom: mudigere2,          // PLACEHOLDER — replace with bedroom photo
  bathroom: bathroom,
  // Kitchen — PLACEHOLDER — replace with kitchen photo
  kitchen: mudigere3,
  // Outdoors
  backyard: mudigere6,         // PLACEHOLDER — replace with backyard/sitting-area photo
  // Property Specials — PLACEHOLDER gradient cards until real shots arrive
  stream: mudigere5,           // PLACEHOLDER — replace with stream photo
  waterfall: mudigere1,        // PLACEHOLDER — replace with waterfall photo
  viewpoint: mudigere6,        // PLACEHOLDER — replace with viewpoint photo
  farmPond: mudigere3,         // PLACEHOLDER — replace with farm-pond photo
} as const;

// Four shots for the hero crossfade slider.
export const heroImages: { src: string; alt: string }[] = [
  { src: mudigere4, alt: 'The home stay and its terracotta-tiled roof under a monsoon sky' },
  { src: mudigere5, alt: 'A foggy meadow path winding into the green' },
  { src: mudigere2, alt: 'The private home stay exterior under its terracotta roof' },
  { src: mudigere6, alt: 'Veranda outlook across the Malnad valley at dawn' },
];

// ── Gallery with categories ───────────────────────────────────────────────────
export type GalleryCategory = 'all' | 'outdoors' | 'rooms' | 'kitchen' | 'specials';

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  label?: string; // shown as a caption chip in the lightbox
};

export const galleryImages: GalleryImage[] = [
  // Outdoors / Exteriors
  { src: mudigere1, alt: 'Misty sunrise over the fields', category: 'outdoors', label: 'Sunrise mist' },
  { src: mudigere2, alt: 'The home stay exterior under a terracotta roof', category: 'outdoors', label: 'Home exterior' },
  { src: mudigere3, alt: 'The house from the side, framed by green', category: 'outdoors', label: 'Garden side' },
  { src: mudigere5, alt: 'A foggy path through the meadow', category: 'outdoors', label: 'Meadow path' },
  { src: mudigere6, alt: 'Veranda outlook into coffee country', category: 'outdoors', label: 'Veranda view' },
  // Rooms / Interiors
  { src: mudigere4, alt: 'The bright living hall', category: 'rooms', label: 'The Hall' },
  { src: bathroom, alt: 'Bathroom with hot-water geyser', category: 'rooms', label: 'Bathroom' },
  // PLACEHOLDER slots — will auto-display once the real images are added
  // Kitchen — PLACEHOLDER (swap mudigere3 with kitchen photo)
  { src: mudigere3, alt: 'Kitchen with gas stove, induction, microwave and air fryer (placeholder)', category: 'kitchen', label: 'Kitchen' },
  // Property Specials — PLACEHOLDER
  { src: mudigere5, alt: 'Private stream on the estate (placeholder)', category: 'specials', label: 'Private stream' },
  { src: mudigere1, alt: 'Secret waterfall reached by off-road jeep (placeholder)', category: 'specials', label: 'Secret waterfall' },
  { src: mudigere6, alt: 'Exclusive viewpoint over the Western Ghats (placeholder)', category: 'specials', label: 'Exclusive viewpoint' },
  { src: mudigere3, alt: 'Farm pond for tubing on the estate (placeholder)', category: 'specials', label: 'Farm pond' },
];

export const GALLERY_TABS: { key: GalleryCategory; label: string }[] = [
  { key: 'all', label: 'All Photos' },
  { key: 'outdoors', label: 'Outdoors' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'specials', label: "Property's Special" },
];

// Attraction photos keyed by the `img` field in site.ts.
export const attractionImages: Record<string, string> = {
  'ettina-bhuja.jpg': ettinaBhuja,
  'devarmane.jpg': devarmane,
  'fort.jpg': fort,
  'belur.jpg': belur,
  'bettada-bhaireshwara.jpg': bettada,
  'dharmastala.jpg': dharmastala,
  'kudremukh.jpg': kudremukh,
};
