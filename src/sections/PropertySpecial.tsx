import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Waves, MapPin, MessageCircle, Sparkles, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import { PROPERTY_SPECIALS, type SpecialExperience, specialWhatsappUrl, siteConfig } from '../data/site';
import { property } from '../data/images';

const SPECIAL_IMAGES: Record<string, string> = {
  stream: property.stream,
  waterfall: property.waterfall,
  viewpoint: property.viewpoint,
  'farm-pond': property.farmPond,
};

const TYPE_GRADIENTS: Record<string, string> = {
  walk: 'from-teal-950 via-cyan-950/80 to-emerald-950',
  jeep: 'from-stone-950 via-slate-950/80 to-zinc-950',
  onsite: 'from-blue-950 via-cyan-950/80 to-teal-950',
};

const TYPE_ACCENT: Record<string, string> = {
  walk: 'text-teal-300 border-teal-500/40 bg-teal-900/40',
  jeep: 'text-amber-300 border-amber-500/40 bg-amber-900/30',
  onsite: 'text-blue-300 border-blue-500/40 bg-blue-900/40',
};

function TypeBadge({ type }: { type: SpecialExperience['type'] }) {
  const labels: Record<string, string> = { walk: 'Easy Walk', jeep: 'Jeep Adventure', onsite: 'On Property' };
  return (
    // Fixed-height badge row — whitespace-nowrap prevents wrapping on any card.
    <div className="flex h-8 items-center">
      <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${TYPE_ACCENT[type]}`}>
        {type === 'jeep' && <span className="text-xs">🚙</span>}
        {type === 'walk' && <span className="text-xs">🥾</span>}
        {type === 'onsite' && <span className="text-xs">🛟</span>}
        {labels[type]}
      </span>
    </div>
  );
}

function SpecialCard({ exp, index }: { exp: SpecialExperience; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  const img = SPECIAL_IMAGES[exp.id];

  return (
    <Reveal delay={index * 0.09} className="h-full">
      <motion.article
        ref={ref}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        // h-full ensures all cards stretch to the tallest card in the row.
        className="group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-line/50 bg-card shadow-glow"
      >
        {/* Fixed-height photo header */}
        <div className={`relative h-52 shrink-0 overflow-hidden bg-gradient-to-br ${TYPE_GRADIENTS[exp.type]}`}>
          {img && (
            <motion.img
              src={img}
              alt={exp.title}
              style={{ y: imgY }}
              className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {/* light bottom scrim to protect the distance chip and emoji */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-line/50 bg-ink/60 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-bright backdrop-blur">
            <MapPin className="h-3 w-3" />
            {exp.distance}
          </span>

          <div className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border border-line/50 bg-ink/60 text-2xl backdrop-blur-sm shadow-lg transition-transform duration-500 group-hover:scale-110">
            {exp.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 bg-card p-6">
          {/* Badge row: fixed height so text below always starts at the same point */}
          <TypeBadge type={exp.type} />

          <div>
            <h3 className="font-display text-2xl tracking-tight text-fog">{exp.title}</h3>
            <p className="mt-1 text-sm font-medium italic text-gold-bright/80">{exp.tagline}</p>
          </div>

          {/* flex-1 pushes nothing below — description fills remaining space */}
          <p className="flex-1 text-sm leading-relaxed text-dim">{exp.description}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function PropertySpecial() {
  return (
    <Section id="property-special" tone="band" divider>
      {/* Header */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Property's Special"
          title={<>Experiences you <em className="not-italic text-gold-bright">won't find</em> anywhere else.</>}
          intro="Private streams, secret waterfalls, ridge viewpoints, and farm-pond floats — all arranged by us, all on or near the estate."
        />
      </div>

      {/* Jeep adventure banner */}
      <Reveal delay={0.05} className="mt-10">
        <div className="flex flex-col gap-3 rounded-card-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-stone-950/60 to-amber-950/30 p-4 backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-amber-900/40 text-xl">
            🚙
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-amber-200">Off-road jeep adventures — exclusively ours.</p>
            <p className="mt-0.5 text-sm text-amber-200/60">
              The waterfall and viewpoint locations involve crazy slushy terrain and steep inclines. Our jeeps handle terrain no regular vehicle can. Charges apply per person.
            </p>
          </div>
          <a
            href={specialWhatsappUrl('Jeep Adventure')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-amber-400/50 bg-amber-900/40 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-900/60"
          >
            <Waves className="h-4 w-4" />
            Book jeep
          </a>
        </div>
      </Reveal>

      {/* Cards — items-stretch (CSS grid default) makes all cards the same height */}
      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PROPERTY_SPECIALS.map((exp, i) => (
          <SpecialCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>

      {/* Single shared contact strip */}
      <Reveal delay={0.15} className="mt-8">
        <div className="flex flex-col items-center gap-5 rounded-card-lg border border-line/40 bg-ink/40 p-6 text-center backdrop-blur sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Sparkles className="h-5 w-5 text-gold-bright" />
          </div>
          <div>
            <p className="font-display text-xl text-fog">Interested in any of these experiences?</p>
            <p className="mt-2 max-w-sm text-sm text-dim">
              All experiences are arranged directly by your host. Contact us for availability, pricing, and to plan your day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={specialWhatsappUrl('Property Specials')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp for more info
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line/60 bg-ink/40 px-6 py-3 text-sm text-fog transition hover:bg-white/5"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
