import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Flame, MousePointer2 } from 'lucide-react';
import MistBackground from '../components/MistBackground';
import MagneticButton from '../components/MagneticButton';

const HEADLINE = ['Wake', 'up', 'in', 'the', 'mist.'];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line/40">
      {/* full-bleed looping video background — webm/mp4 with an instant poster
          fallback; plays on mobile too (muted + playsInline). Static poster
          under prefers-reduced-motion. */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
          style={{ filter: 'brightness(1.02) saturate(1.08) contrast(1.05)' }}
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* warm sunrise bloom — adds golden light instead of darkening (screen blend) */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(65% 55% at 82% 14%, rgba(227,201,140,0.24), rgba(227,201,140,0.06) 42%, transparent 66%)',
          }}
        />
        {/* left scrim — protects the headline/subtitle, lets the right of the photo shine */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(96deg, rgba(8,12,9,0.86) 0%, rgba(8,12,9,0.55) 30%, rgba(8,12,9,0.18) 55%, rgba(8,12,9,0) 80%)',
          }}
        />
        {/* grounding vignette at the base + soft top fade for the nav */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.2) 30%, transparent 52%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,12,9,0.5) 0%, transparent 16%)' }}
        />
        {/* gentle cinematic corner vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(125% 105% at 50% 42%, transparent 52%, rgba(6,10,8,0.55) 100%)',
          }}
        />
      </div>

      {/* signature cloudy-mountain mist over the hero — kept light so the photo stays clear */}
      <MistBackground mountains intensity="subtle" />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-28 lg:px-8">
        <motion.div className="min-w-0 max-w-3xl" style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mb-5"
          >
            Gowdahalli Horati · Mudigere · 906m
          </motion.p>

          <h1
            className="font-display text-[3.2rem] font-semibold leading-[0.92] tracking-tight text-fog sm:text-7xl lg:text-8xl"
            style={{ textShadow: '0 2px 28px rgba(6,10,8,0.55)' }}
          >
            {HEADLINE.map((word, i) => (
              <span key={i} className="mr-[0.25em] inline-block align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: 18 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word === 'mist.' ? <em className="not-italic text-gold-bright">{word}</em> : word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={false}
            className="mt-6 max-w-xl text-base text-dim sm:text-lg md:text-xl"
            style={{ textShadow: '0 1px 18px rgba(6,10,8,0.6)' }}
          >
            A quiet Malnad cottage above the coffee country — green views, hot-water baths,
            a full kitchen, and the slow rhythm of monsoon mornings.
          </motion.p>

          <motion.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <MagneticButton
              href="#book"
              spotlight
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold/15 px-6 py-3.5 text-sm font-semibold text-gold-bright shadow-glow transition-colors hover:bg-gold/25 sm:w-auto"
            >
              Check Availability
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="#explore"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line/60 bg-ink/30 px-6 py-3.5 text-sm font-semibold text-fog backdrop-blur transition-colors hover:bg-white/5 sm:w-auto"
            >
              <Compass className="h-4 w-4" /> Explore Nearby
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm text-dim"
          >
            <span className="font-medium text-fog">Entire home</span>
            <span className="text-line">·</span>
            <span>Sleeps 8–10</span>
            <span className="text-line">·</span>
            <span>Whole place, your group only</span>
          </motion.div>

          {/* on-site caretaker note — bonfire + food runs, billed at actuals */}
          <motion.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="glass mt-5 flex max-w-xl items-start gap-3 rounded-2xl px-4 py-3.5 shadow-[0_8px_30px_rgba(6,10,8,0.35)]"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/15">
              <Flame className="h-3.5 w-3.5 text-gold-bright" />
            </span>
            <p className="text-xs leading-relaxed text-dim sm:text-[0.82rem]">
              <span className="font-medium text-fog">A caretaker is on hand</span> to set up your bonfire and
              make food runs — the nearest town is ~20 km away. Fuel, their meals and any extras are billed at actuals.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-4 flex items-center gap-2 text-xs text-dim lg:left-8 lg:text-sm"
      >
        <MousePointer2 className="h-4 w-4 animate-bounce text-gold-bright" />
        Scroll to drift deeper into the valley
      </motion.div>
    </section>
  );
}
