import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Tv, BedDouble, Trees, Utensils, Bath, Users, Tent, Flame, Droplets } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import { property } from '../data/images';
import { useIsMobile } from '../hooks/useIsMobile';
import { EASE } from '../motion';

type Space = {
  icon: React.ElementType;
  title: string;
  meta: string;
  image: string;
  imageAlt: string;
};

const SPACES: Space[] = [
  {
    icon: Tv,
    title: 'The Hall',
    meta: 'Sleeps 5',
    image: property.livingHall,
    imageAlt: 'The bright living hall with TV setup',
  },
  {
    icon: BedDouble,
    title: 'The Bedroom',
    meta: 'Sleeps 2–3',
    image: property.bedroom,
    imageAlt: 'Private bedroom',
  },
  {
    icon: Utensils,
    title: 'The Kitchen',
    meta: 'Fully equipped',
    image: property.kitchen,
    imageAlt: 'Fully equipped kitchen',
  },
  {
    icon: Bath,
    title: 'Bathrooms',
    meta: '2 hot-water baths',
    image: property.bathroom,
    imageAlt: 'Clean bathroom with hot-water geyser',
  },
  {
    icon: Trees,
    title: 'Backyard Lounge',
    meta: 'Open all day',
    image: property.backyard,
    imageAlt: 'Backyard sitting area with green views',
  },
  {
    icon: Users,
    title: 'Private & Whole',
    meta: 'Entire home',
    image: property.houseFront,
    imageAlt: 'The full home stay exterior',
  },
  {
    icon: Tent,
    title: 'Tent Stay',
    meta: 'Under the open sky',
    image: property.tent,
    imageAlt: 'Tent stay on the estate',
  },
  {
    icon: Flame,
    title: 'Outdoor Stove',
    meta: 'Wood-fire cooking',
    image: property.outdoorStove,
    imageAlt: 'Outdoor wood stove',
  },
  {
    icon: Droplets,
    title: 'Hande Bath',
    meta: 'Traditional hot water',
    image: property.bathroom,
    imageAlt: 'Traditional hande hot water bath',
  },
];

function RoomCard({ space, index }: { space: Space; index: number }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce || isMobile ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <motion.article
        ref={ref}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="group relative h-full overflow-hidden rounded-card-lg border border-line/40 shadow-glow"
        style={{ minHeight: 260 }}
      >
        {/* Full-bleed photo */}
        <motion.img
          src={space.image}
          alt={space.imageAlt}
          style={{ y: imgY }}
          className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Thin bottom gradient — only enough to protect the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

        {/* Name + meta anchored at the bottom */}
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line/50 bg-ink/60 backdrop-blur-sm">
            <space.icon className="h-5 w-5 text-gold-bright" />
          </div>
          <div>
            <p className="font-display text-lg leading-tight text-fog">{space.title}</p>
            <p className="text-xs text-gold-bright/80">{space.meta}</p>
          </div>
        </div>
      </motion.article>
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
              Booked as a whole — no shared spaces. A full kitchen, two hot-water bathrooms and open outdoor spaces support an easy 8–10 guests.
            </p>
          </div>
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
        <h3 className="mt-2 font-display text-3xl tracking-tight text-fog">Every room, explored.</h3>
      </Reveal>

      {/* Photo grid */}
      <div className="mt-8 grid auto-rows-[260px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SPACES.map((s, i) => (
          <RoomCard key={s.title} space={s} index={i} />
        ))}
      </div>
    </Section>
  );
}
