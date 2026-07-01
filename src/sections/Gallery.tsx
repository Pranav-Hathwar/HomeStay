import { useState, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Expand } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { galleryImages } from '../data/images';
import { EASE } from '../motion';

// Loads only when a tile is first opened.
const Lightbox = lazy(() => import('../components/Lightbox'));

// Bento spans (Tailwind classes) keyed by tile index for a mixed-size grid.
const SPANS = [
  'sm:col-span-2 sm:row-span-2',
  'sm:row-span-1',
  'sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
  'sm:row-span-1',
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <Section id="gallery">
      <SectionHeading eyebrow="Gallery" title="A look around." />

      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
            onClick={() => setOpen(i)}
            aria-label={`Open image: ${img.alt}`}
            className={`group relative overflow-hidden rounded-card border border-line/50 bg-card ${
              SPANS[i % SPANS.length]
            }`}
          >
            {/* Inner zoom wrapper keeps the hover transform off the layout element
                so it can't fight the shared-layout morph into the lightbox. */}
            <div className="absolute inset-0 overflow-hidden rounded-card">
              <motion.img
                layoutId={reduce ? undefined : `tile-${i}`}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-line/60 bg-ink/50 text-fog opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
          </motion.button>
        ))}
      </div>

      <Suspense fallback={null}>
        <Lightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      </Suspense>
    </Section>
  );
}
