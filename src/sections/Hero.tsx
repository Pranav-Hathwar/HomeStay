import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, MousePointer2 } from 'lucide-react';
import MistBackground from '../components/MistBackground';
import MagneticButton from '../components/MagneticButton';
import { heroImages } from '../data/images';
import { siteConfig } from '../data/site';

const HEADLINE = ['Wake', 'up', 'in', 'the', 'mist.'];
const SLIDE_MS = 5500;

export default function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasPrice = siteConfig.pricePerNight && !siteConfig.pricePerNight.includes('_');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % heroImages.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line/40">
      {/* crossfading Ken-Burns slides — PC only (phone/tablet use a simple static background) */}
      <div className="absolute inset-0">
        {/* simple static background for phone + tablet (no images, glitch-free) */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'radial-gradient(120% 90% at 70% 20%, rgba(28,46,33,0.95), rgba(8,12,9,0.98) 70%), linear-gradient(180deg, #0d140f 0%, #080c09 100%)',
          }}
        />
        {heroImages.map((img, i) => (
          <motion.div
            key={img.src}
            className="absolute inset-0 hidden bg-cover bg-center lg:block"
            style={{
              backgroundImage: `url(${img.src})`,
              filter: 'brightness(1.06) saturate(1.32) contrast(1.12)',
              willChange: 'transform, opacity',
            }}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? (reduce ? 1 : 1.08) : 1,
            }}
            transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: SLIDE_MS / 1000 + 1.6, ease: 'linear' } }}
            role="img"
            aria-label={img.alt}
          />
        ))}
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

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-28 lg:grid-cols-[1fr_120px] lg:px-8">
        <motion.div className="min-w-0 max-w-3xl" style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-bright sm:text-sm"
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

          <motion.p
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 text-sm text-dim"
          >
            {hasPrice && (
              <>
                from <span className="font-display text-base text-fog">₹{siteConfig.pricePerNight}</span> / night ·{' '}
              </>
            )}
            Entire home · sleeps 8–10
          </motion.p>
        </motion.div>

        {/* slide counter + progress — PC only */}
        <div className="hidden items-end justify-start lg:flex lg:items-center lg:justify-center">
          <div className="glass rounded-3xl p-4">
            <div className="text-right font-display text-lg tracking-[0.2em] text-fog">
              0{active + 1}
              <span className="text-dim"> / 0{heroImages.length}</span>
            </div>
            <div className="mt-3 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={active}
                className="h-full rounded-full bg-gold-bright"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
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
