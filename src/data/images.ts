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

// ── New real photos (src/assets/new_images/) ─────────────────────────────────
import hallImg         from '../assets/new_images/hall.webp';
import bedroomImg      from '../assets/new_images/bed_room.webp';
import kitchenImg      from '../assets/new_images/kitchen.webp';
import backyardImg     from '../assets/new_images/backyard_sitting.webp';
import houseFrontImg   from '../assets/new_images/full_house_front_view.webp';
import farmPondImg     from '../assets/new_images/farm_pool.webp';
import waterfallImg    from '../assets/new_images/Hidden_waterfall.webp';
import viewpointImg    from '../assets/new_images/view_point.webp';
import outdoorStoveImg from '../assets/new_images/outdoor_stove.webp';
import tentImg         from '../assets/new_images/tent_stay.webp';

export const property = {
  // Atmosphere / exteriors
  mistySunrise:   mudigere1,
  foggyPath:      mudigere5,
  houseFront:     houseFrontImg,   // full house front view
  houseSide:      mudigere3,
  houseCorner:    mudigere4,
  verandaOutlook: mudigere6,
  // Rooms
  livingHall: hallImg,
  bedroom:    bedroomImg,
  bathroom:   bathroom,
  kitchen:    kitchenImg,
  // Outdoors
  backyard: backyardImg,
  // Property Specials
  stream:       mudigere5,      // PLACEHOLDER — replace with stream photo when ready
  waterfall:    waterfallImg,
  viewpoint:    viewpointImg,
  farmPond:     farmPondImg,
  // TheStay extras
  outdoorStove: outdoorStoveImg,
  tent:         tentImg,
} as const;

// Four shots for the hero crossfade slider.
export const heroImages: { src: string; alt: string }[] = [
  { src: houseFrontImg, alt: 'The home stay full front view under a monsoon sky' },
  { src: mudigere5,     alt: 'A foggy meadow path winding into the green' },
  { src: mudigere2,     alt: 'The private home stay exterior under its terracotta roof' },
  { src: mudigere6,     alt: 'Veranda outlook across the Malnad valley at dawn' },
];

// ── Gallery with categories ───────────────────────────────────────────────────
export type GalleryCategory = 'all' | 'outdoors' | 'rooms' | 'kitchen' | 'specials';

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  label?: string;
};

export const galleryImages: GalleryImage[] = [
  // Outdoors / Exteriors
  { src: houseFrontImg, alt: 'Full front view of the home stay',            category: 'outdoors', label: 'House front' },
  { src: mudigere1,     alt: 'Misty sunrise over the fields',               category: 'outdoors', label: 'Sunrise mist' },
  { src: mudigere2,     alt: 'The home stay exterior under a terracotta roof', category: 'outdoors', label: 'Home exterior' },
  { src: mudigere5,     alt: 'A foggy path through the meadow',             category: 'outdoors', label: 'Meadow path' },
  { src: mudigere6,     alt: 'Veranda outlook into coffee country',          category: 'outdoors', label: 'Veranda view' },
  { src: backyardImg,   alt: 'Backyard sitting area with green views',       category: 'outdoors', label: 'Backyard' },
  // Rooms / Interiors
  { src: hallImg,       alt: 'The bright living hall',                       category: 'rooms', label: 'The Hall' },
  { src: bedroomImg,    alt: 'Private bedroom',                              category: 'rooms', label: 'Bedroom' },
  { src: bathroom,      alt: 'Bathroom with hot-water geyser',               category: 'rooms', label: 'Bathroom' },
  // Kitchen
  { src: kitchenImg,    alt: 'Fully equipped kitchen',                       category: 'kitchen', label: 'Kitchen' },
  // Property Specials
  { src: mudigere5,      alt: 'Private stream on the estate',                category: 'specials', label: 'Private stream' },
  { src: waterfallImg,   alt: 'Secret waterfall reached by off-road jeep',   category: 'specials', label: 'Secret waterfall' },
  { src: viewpointImg,   alt: 'Exclusive viewpoint over the Western Ghats',  category: 'specials', label: 'Exclusive viewpoint' },
  { src: farmPondImg,    alt: 'Farm pond for tubing on the estate',          category: 'specials', label: 'Farm pond' },
  { src: outdoorStoveImg, alt: 'Outdoor wood stove on the estate',           category: 'specials', label: 'Outdoor stove' },
  { src: tentImg,        alt: 'Tent stay under the open sky',                category: 'specials', label: 'Tent stay' },
];

export const GALLERY_TABS: { key: GalleryCategory; label: string }[] = [
  { key: 'all',      label: 'All Photos' },
  { key: 'outdoors', label: 'Outdoors' },
  { key: 'rooms',    label: 'Rooms' },
  { key: 'kitchen',  label: 'Kitchen' },
  { key: 'specials', label: "Property's Special" },
];

// Attraction photos keyed by the `img` field in site.ts.
export const attractionImages: Record<string, string> = {
  'ettina-bhuja.jpg':          ettinaBhuja,
  'devarmane.jpg':             devarmane,
  'fort.jpg':                  fort,
  'belur.jpg':                 belur,
  'bettada-bhaireshwara.jpg':  bettada,
  'dharmastala.jpg':           dharmastala,
  'kudremukh.jpg':             kudremukh,
};
