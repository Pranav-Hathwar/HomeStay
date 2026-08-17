import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Tv, BedDouble, Trees, Utensils, Bath, Users } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import TiltCard, { TiltLayer } from '../components/TiltCard';
import { property } from '../data/images';
import { EASE } from '../motion';
import { useIsMobile } from '../hooks/useIsMobile';

type Space = {
  icon: React.ElementType;
  title: string;
  meta: string;
  copy: string;
  image: string;
  imageAlt: string;
  accentColor: string;
};

const SPACES: Space[] = [
  {
    icon: Tv,
    title: 'The Hall',
    meta: 'Sleeps 5',
    copy: 'A large, bright living space with a full TV setup — the heart of the house for films, games and long lazy afternoons.',
    image: property.livingHall,
    imageAlt: 'The bright living hall with TV setup',
    accentColor: 'from-amber-950/60 to-stone-950/40',
  },
  {
    icon: BedDouble,
    title: 'The Bedroom',
    meta: 'Sleeps 2–3',
    copy: 'A private bedroom for quiet mornings, with the green pressing softly against the window. Clean linen, ample storage, and calm.',
    image: property.bedroom,
    imageAlt: 'Private bedroom with green window views (placeholder)',
    accentColor: 'from-emerald-950/60 to-teal-950/40',
  },
  {
    icon: Utensils,
    title: 'The Kitchen',
    meta: 'Fully equipped',
    copy: 'Gas stove, induction, microwave, air fryer, fridge — everything you need to cook a real meal after a day of trekking.',
    image: property.kitchen,
    imageAlt: 'Fully equipped kitchen (placeholder)',
    accentColor: 'from-orange-950/60 to-stone-950/40',
  },
  {
    icon: Bath,
    title: 'Bathrooms',
    meta: '2 hot-water baths',
    copy: 'Two full bathrooms with hot-water geysers — no waiting, no sharing with strangers.',
    image: property.bathroom,
    imageAlt: 'Clean bathroom with hot-water geyser',
    accentColor: 'from-cyan-950/60 to-slate-950/40',
  },
  {
    icon: Trees,
    title: 'Backyard Lounge',
    meta: 'Open all day',
    copy: 'An outdoor sitting area at the back of the house, looking straight into the green — for morning coffee, evening bonfires and long sunsets.',
    image: property.backyard,
    imageAlt: 'Backyard sitting area with green views (placeholder)',
    accentColor: 'from-green-950/60 to-emerald-950/40',
  },
  {
    icon: Users,
    title: 'Private & Whole',
    meta: 'Entire home',
    copy: 'The whole property is booked as one — no shared spaces, no strangers. Just your group and the valley.',
    image: property.houseFront,
    imageAlt: 'The full home stay exterior under terracotta roof',
    accentColor: 'from-stone-950/60 to-zinc-950/40',
  },
];

function RoomCard({ space, index }: { space: Space; index: number }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce || isMobile ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <Reveal key={space.title} delay={index * 0.07}>
      <TiltCard className="h-full">
        <article ref={ref} className="card card-hover flex h-full flex-col overflow-hidden">
          {/* Photo header with parallax */}
          <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${space.accentColor}`}>
            <motion.img
              src={space.image}
              alt={space.imageAlt}
              style={{ y: imgY }}
              className="absolute inset-0 h-[116%] w-full object-cover opacity-70 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <TiltLayer z={30}>
              <span className="absolute left-4 bottom-4 flex items-center gap-1.5 rounded-full border border-line/50 bg-ink/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold-bright backdrop-blur">
                {space.meta}
              </span>
            </TiltLayer>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <TiltLayer z={40}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-line/60 bg-moss/70 shadow-glow">
                <space.icon className="h-5 w-5 text-gold-bright" />
              </div>
            </TiltLayer>
            <TiltLayer z={22}>
              <h3 className="font-display text-xl text-fog">{space.title}</h3>
            </TiltLayer>
            <TiltLayer z={10}>
              <p className="mt-2 text-sm leading-relaxed text-dim">{space.copy}</p>
            </TiltLayer>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export default function TheStay() {
  return (
    <Section id="the-stay">
      {/* Feature banner */}
      <Reveal>
        <div className="relative overflow-hidden rounded-card-lg border border-line/50 shadow-glow">
          <img
            src={property.houseFront}
            alt="The private home stay exterior under its terracotta-tiled roof"
            className="h-[320px] w-full object-cover md:h-[460px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="eyebrow">The Stay</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-fog md:text-6xl">
              A whole house, all to yourselves.
            </h2>
            <p className="mt-4 max-w-xl text-dim">
              Booked as a whole — no shared spaces. A full kitchen, two hot-water bathrooms and open outdoor spaces
              support an easy 8–10 guests.
            </p>
          </div>

          {/* Stat chips */}
          <div className="absolute right-5 top-5 flex flex-col gap-2 sm:flex-row">
            {['Sleeps 8–10', '2 Bathrooms', 'Full Kitchen'].map((chip) => (
              <span key={chip} className="chip text-xs">{chip}</span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Section label */}
      <Reveal delay={0.05} className="mt-12">
        <p className="eyebrow">Spaces inside</p>
        <h3 className="mt-2 font-display text-3xl tracking-tight text-fog">
          Every room, explored.
        </h3>
      </Reveal>

      {/* 3D room cards grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1200px' }}>
        {SPACES.map((s, i) => (
          <RoomCard key={s.title} space={s} index={i} />
        ))}
      </div>

      {/* Placeholder notice */}
      <Reveal delay={0.1} className="mt-6">
        <p className="text-center text-xs text-faint/60 italic">
          Room photos coming soon — drop new images into <code className="rounded bg-ink/60 px-1.5 py-0.5 text-gold-bright/70">src/assets/</code> and update <code className="rounded bg-ink/60 px-1.5 py-0.5 text-gold-bright/70">src/data/images.ts</code> to publish them.
        </p>
      </Reveal>
    </Section>
  );
}
