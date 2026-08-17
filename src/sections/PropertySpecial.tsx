import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Waves, MapPin, MessageCircle, ChevronRight, Sparkles, IndianRupee } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import { PROPERTY_SPECIALS, type SpecialExperience, specialWhatsappUrl, siteConfig } from '../data/site';
import { property } from '../data/images';
import { EASE } from '../motion';

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

function TypeBadge({ type, paid }: { type: SpecialExperience['type']; paid: boolean }) {
  const labels: Record<string, string> = {
    walk: 'Easy Walk',
    jeep: 'Jeep Adventure',
    onsite: 'On Property',
  };
  return (
    <div className="flex flex-wrap gap-2">
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${TYPE_ACCENT[type]}`}>
        {type === 'jeep' && <span className="text-xs">🚙</span>}
        {type === 'walk' && <span className="text-xs">🥾</span>}
        {type === 'onsite' && <span className="text-xs">🛟</span>}
        {labels[type]}
      </span>
      {paid && (
        <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-bright">
          <IndianRupee className="h-3 w-3" />
          Per person
        </span>
      )}
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
    <Reveal delay={index * 0.09}>
      <motion.article
        ref={ref}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="group relative flex flex-col overflow-hidden rounded-card-lg border border-line/50 bg-card shadow-glow"
      >
        {/* Photo / gradient header */}
        <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${TYPE_GRADIENTS[exp.type]}`}>
          {img && (
            <motion.img
              src={img}
              alt={exp.title}
              style={{ y: imgY }}
              className="absolute inset-0 h-[116%] w-full object-cover opacity-50 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-70"
            />
          )}
          {/* Overlay gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Distance chip */}
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-line/50 bg-ink/60 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-bright backdrop-blur">
            <MapPin className="h-3 w-3" />
            {exp.distance}
          </span>

          {/* Emoji + icon cluster */}
          <div className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border border-line/50 bg-ink/60 text-2xl backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-500">
            {exp.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <TypeBadge type={exp.type} paid={exp.paid} />

          <div>
            <h3 className="font-display text-2xl tracking-tight text-fog">{exp.title}</h3>
            <p className="mt-1 text-sm font-medium text-gold-bright/80 italic">{exp.tagline}</p>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-dim">{exp.description}</p>

          <MagneticButton
            href={specialWhatsappUrl(exp.title)}
            target="_blank"
            rel="noreferrer"
            className="mt-auto group/btn inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold-bright transition-colors hover:bg-gold/20"
          >
            <MessageCircle className="h-4 w-4" />
            Ask Arjun
            <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </MagneticButton>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function PropertySpecial() {
  return (
    <Section id="property-special" tone="band" divider>
      {/* Section header */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Property's Special"
          title={<>Experiences you <em className="not-italic text-gold-bright">won't find</em> anywhere else.</>}
          intro="Private streams, secret waterfalls, ridge viewpoints, and farm-pond floats — all arranged by us, all on or near the estate."
        />
        <Reveal delay={0.1} className="shrink-0">
          <MagneticButton
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-ink/40 px-5 py-3 text-sm text-fog backdrop-blur transition hover:bg-white/5"
          >
            <Sparkles className="h-4 w-4 text-gold-bright" />
            Call Arjun to arrange
          </MagneticButton>
        </Reveal>
      </div>

      {/* Jeep adventure banner */}
      <Reveal delay={0.05} className="mt-10">
        <div className="flex flex-col gap-3 rounded-card-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-stone-950/60 to-amber-950/30 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5 backdrop-blur">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-amber-900/40 text-xl">
            🚙
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-amber-200">Off-road jeep adventures — exclusively ours.</p>
            <p className="mt-0.5 text-sm text-amber-200/60">
              The waterfall and viewpoint locations involve crazy slushy terrain and steep inclines. Our local jeeps handle terrain no regular vehicle can. Charges apply per person.
            </p>
          </div>
          <MagneticButton
            href={specialWhatsappUrl('Jeep Adventure')}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-900/40 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-900/60 whitespace-nowrap"
          >
            <Waves className="h-4 w-4" />
            Book jeep
          </MagneticButton>
        </div>
      </Reveal>

      {/* Experience cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PROPERTY_SPECIALS.map((exp, i) => (
          <SpecialCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <Reveal delay={0.15} className="mt-10">
        <div className="rounded-card border border-line/40 bg-ink/40 p-5 text-center backdrop-blur sm:p-6">
          <p className="text-sm text-dim">
            All experiences are arranged directly by your host.{' '}
            <strong className="text-fog">Contact Arjun</strong> to plan your day —
            availability and pricing vary by season.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
            >
              📞 {siteConfig.phone} (Arjun)
            </a>
            <a
              href={specialWhatsappUrl('Property Specials')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line/60 bg-ink/40 px-5 py-2.5 text-sm text-fog transition hover:bg-white/5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Arjun
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
