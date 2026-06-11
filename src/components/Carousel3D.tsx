import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import type { Attraction } from '../data/site';
import { attractionImages } from '../data/images';

/**
 * Coverflow-style 3D depth carousel. The centre card sits flat and forward;
 * neighbours scale down, rotate on Y and recede on Z, with the next card
 * peeking in. Prev/next buttons, dots, and horizontal drag/swipe. Clicking the
 * active card calls onSelect (→ route map).
 */
export default function Carousel3D({
  items,
  onSelect,
}: {
  items: Attraction[];
  onSelect: (a: Attraction) => void;
}) {
  const [active, setActive] = useState(0);
  const n = items.length;

  const go = (dir: number) => setActive((i) => (i + dir + n) % n);

  return (
    <div className="select-none">
      <div
        className="relative h-[400px] sm:h-[440px]"
        style={{ perspective: '1400px' }}
      >
        {/* drag surface */}
        <motion.div
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, i) => {
            // shortest signed distance on the ring
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const hidden = abs > 2;

            return (
              <motion.div
                key={item.name}
                className="absolute left-1/2 top-1/2 h-[360px] w-[280px] sm:h-[400px] sm:w-[320px]"
                style={{ transformStyle: 'preserve-3d', marginLeft: -140, marginTop: -180 }}
                animate={{
                  x: offset * 190,
                  z: -abs * 240,
                  rotateY: offset * -34,
                  scale: isActive ? 1 : 0.82,
                  opacity: hidden ? 0 : isActive ? 1 : 0.55,
                  filter: isActive ? 'brightness(1)' : 'brightness(0.55)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                onClick={() => (isActive ? onSelect(item) : setActive(i))}
                role="button"
                tabIndex={hidden ? -1 : 0}
                aria-label={`${item.name}, ${item.distance}, ${item.type}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isActive) onSelect(item);
                }}
              >
                <div
                  className={`group relative h-full w-full overflow-hidden rounded-[26px] border bg-card shadow-glow transition-colors ${
                    isActive ? 'border-gold/50' : 'border-line/50'
                  }`}
                >
                  <img
                    src={attractionImages[item.img]}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[0.68rem] uppercase tracking-[0.28em] text-gold-bright">
                      {item.type}
                    </div>
                    <h3 className="mt-1 font-display text-2xl text-fog">{item.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-dim">
                      <MapPin className="h-3.5 w-3.5 text-gold-bright" />
                      {item.distance}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-line/60 bg-ink/60 px-3 py-1.5 text-xs text-fog backdrop-blur">
                      Route <ArrowUpRight className="h-3.5 w-3.5 text-gold-bright" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous attraction"
          className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/60 bg-ink/60 text-fog backdrop-blur transition hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next attraction"
          className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line/60 bg-ink/60 text-fog backdrop-blur transition hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setActive(i)}
            aria-label={`Go to ${item.name}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? 'w-7 bg-gold-bright' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
