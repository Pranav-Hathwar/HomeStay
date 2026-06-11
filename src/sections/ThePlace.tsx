import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import MistBackground from '../components/MistBackground';
import { property } from '../data/images';
import { siteConfig } from '../data/site';

export default function ThePlace() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  return (
    <section id="the-place" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* parallax image with drifting fog */}
        <Reveal>
          <div
            ref={ref}
            className="relative overflow-hidden rounded-[32px] border border-line/50 bg-card shadow-glow"
          >
            <div className="relative h-[380px] overflow-hidden md:h-[520px]">
              <motion.img
                src={property.foggyPath}
                alt="A foggy meadow path drifting into the green near the homestay"
                style={{ y: imgY, willChange: 'transform' }}
                className="absolute inset-0 h-[120%] w-full object-cover"
              />
              <MistBackground intensity="subtle" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-line/60 bg-ink/50 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-gold-bright backdrop-blur">
              <MapPin className="h-3.5 w-3.5" />
              {siteConfig.coordsLabel}
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">The Place</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
              Where the monsoon <em className="not-italic text-gold-bright">arrives softly.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-dim">
              <span className="text-fog">Mungaru</span> is the first monsoon rain in Kannada — that
              brief silver hour when the hills turn green and the whole valley exhales. The cottage
              sits at 906&nbsp;m in the coffee-estate belt above Mudigere, wrapped in mist and close
              to the trailheads of the Western Ghats.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-dim">
              It's an entire private Malnad-style home — terracotta roof, an open veranda, a full
              kitchen and two hot-water bathrooms — booked as a whole, with no shared spaces. Just
              you, the fog, and the quiet.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
