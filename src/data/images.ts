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

/**
 * Property photography. Replace the right-hand imports to swap a shot.
 * (Interior slots are intentionally easy to extend as more photos arrive.)
 */
export const property = {
  // Atmosphere / exteriors
  mistySunrise: mudigere1,
  foggyPath: mudigere5,
  houseFront: mudigere2,
  houseSide: mudigere3,
  houseCorner: mudigere4,
  verandaOutlook: mudigere6,
  // Interiors (more coming later — add keys here)
  livingHall: mudigere4,
  bathroom: bathroom,
} as const;

// Four shots for the hero crossfade slider.
export const heroImages: { src: string; alt: string }[] = [
  { src: mudigere4, alt: 'The home stay and its terracotta-tiled roof under a monsoon sky' },
  { src: mudigere5, alt: 'A foggy meadow path winding into the green' },
  { src: mudigere2, alt: 'The private home stay exterior under its terracotta roof' },
  { src: mudigere6, alt: 'Veranda outlook across the Malnad valley at dawn' },
];

// Gallery tiles (bento sizing handled in the Gallery component).
export const galleryImages: { src: string; alt: string }[] = [
  { src: mudigere1, alt: 'Misty sunrise over the fields' },
  { src: mudigere2, alt: 'The home stay exterior under a terracotta roof' },
  { src: mudigere3, alt: 'The house from the side, framed by green' },
  { src: mudigere4, alt: 'The bright living hall' },
  { src: mudigere5, alt: 'A foggy path through the meadow' },
  { src: mudigere6, alt: 'Veranda outlook into coffee country' },
  { src: bathroom, alt: 'Bathroom with hot-water geyser' },
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
