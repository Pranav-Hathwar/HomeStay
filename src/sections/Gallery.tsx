import { useState, lazy, Suspense, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Expand } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { galleryImages, GALLERY_TABS, type GalleryCategory } from '../data/images';
import { EASE } from '../motion';

const Lightbox = lazy(() => import('../components/Lightbox'));

// Bento spans — re-applied to the filtered sub-array by position.
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
  const [activeTab, setActiveTab] = useState<GalleryCategory>('all');
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (activeTab === 'all' ? galleryImages : galleryImages.filter((img) => img.category === activeTab)),
    [activeTab]
  );

  // When lightbox opens on a filtered view, map back to the full array index.
  function openLightbox(filteredIdx: number) {
    const img = filtered[filteredIdx];
    const globalIdx = galleryImages.indexOf(img);
    setOpen(globalIdx);
  }

  return (
    <Section id="gallery">
      <SectionHeading eyebrow="Gallery" title="A look around." />

      {/* Category tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {GALLERY_TABS.map((tab) => {
          const count = tab.key === 'all' ? galleryImages.length : galleryImages.filter((i) => i.category === tab.key).length;
          return (
            <motion.button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setOpen(null); }}
              whileTap={{ scale: 0.96 }}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-gold/60 bg-gold/15 text-gold-bright'
                  : 'border-line/50 bg-ink/30 text-dim hover:text-fog hover:border-line/70'
              }`}
            >
              {activeTab === tab.key && (
                <motion.span
                  layoutId="gallery-tab-bg"
                  className="absolute inset-0 rounded-full border border-gold/60 bg-gold/15"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-gold-bright/70' : 'text-faint'}`}>
                  {count}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-6 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((img, i) => (
            <motion.button
              key={img.src + img.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: EASE }}
              onClick={() => openLightbox(i)}
              aria-label={`Open image: ${img.alt}`}
              className={`group relative overflow-hidden rounded-card border border-line/50 bg-card ${SPANS[i % SPANS.length]}`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-card">
                <motion.img
                  layoutId={reduce ? undefined : `tile-${galleryImages.indexOf(img)}`}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {img.label && (
                <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-line/50 bg-ink/60 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-fog opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  {img.label}
                </span>
              )}
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-line/60 bg-ink/50 text-fog opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <Suspense fallback={null}>
        <Lightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      </Suspense>
    </Section>
  );
}
