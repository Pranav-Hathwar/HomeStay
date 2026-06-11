import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import { galleryImages } from '../data/images';

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

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Gallery</p>
        <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
          A look around.
        </h2>
      </Reveal>

      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            onClick={() => setOpen(i)}
            aria-label={`Open image: ${img.alt}`}
            className={`group relative overflow-hidden rounded-[24px] border border-line/50 bg-card ${
              SPANS[i % SPANS.length]
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-line/60 bg-ink/50 text-fog opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
