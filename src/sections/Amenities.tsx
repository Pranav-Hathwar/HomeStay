import { motion } from 'framer-motion';
import {
  Wifi,
  Refrigerator,
  Tv,
  Microwave,
  Wind,
  Flame,
  Zap,
  Droplets,
  Fan,
  BatteryCharging,
  CircleParking,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import { AMENITIES } from '../data/site';
import { EASE } from '../motion';

// lucide has no air-fryer/induction icon; nearest sensible line-icons used.
const ICONS: Record<string, LucideIcon> = {
  'Wi-Fi': Wifi,
  Refrigerator: Refrigerator,
  'Full TV Setup': Tv,
  'Microwave Oven': Microwave,
  'Air Fryer': Wind,
  'Gas Stove': Flame,
  'Induction Cooktop': Zap,
  'Hot Water (Geyser)': Droplets,
  'Ceiling Fans': Fan,
  'Power Backup (Generator)': BatteryCharging,
  'Free Parking': CircleParking,
};

// A handful of headline comforts get bigger bento tiles; the rest sit compact.
const FEATURED: Record<string, { span: string; blurb: string }> = {
  'Hot Water (Geyser)': {
    span: 'col-span-2 row-span-2',
    blurb: 'Wake to a hot shower even when the valley is at its coldest.',
  },
  'Wi-Fi': {
    span: 'col-span-2',
    blurb: 'Stay connected, or don’t — fast enough to work, remote enough to disappear.',
  },
  'Power Backup (Generator)': {
    span: 'sm:col-span-2',
    blurb: 'A generator keeps the lights on through monsoon outages.',
  },
};

export default function Amenities() {
  return (
    <section className="relative border-y border-line/40 bg-moss/25 backdrop-blur-md py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Parallax distance={36}>
          <Reveal>
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Amenities</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
              Everything you need, nothing you don't.
            </h2>
            <p className="mt-3 text-sm text-dim">
              No air conditioning — at 906&nbsp;m the mountain air does the job.
            </p>
          </Reveal>
        </Parallax>

        <div className="mt-10 grid auto-rows-[112px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((name, i) => {
            const Icon = ICONS[name] ?? Wifi;
            const feat = FEATURED[name];
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: EASE }}
                whileHover={{ y: -5 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-line/60 bg-card/80 p-5 transition-colors hover:border-gold/40 hover:shadow-glow ${
                  feat?.span ?? ''
                }`}
              >
                {/* soft corner glow on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
                <span
                  className={`flex shrink-0 items-center justify-center rounded-xl border border-line/50 bg-moss/60 text-gold-bright transition-transform group-hover:scale-110 ${
                    feat ? 'h-12 w-12' : 'h-10 w-10'
                  }`}
                >
                  <Icon className={feat ? 'h-6 w-6' : 'h-5 w-5'} />
                </span>
                <div className="mt-3">
                  <span
                    className={`block text-fog ${feat ? 'font-display text-xl' : 'text-sm'}`}
                  >
                    {name}
                  </span>
                  {feat && (
                    <p className="mt-1.5 text-sm leading-relaxed text-dim">{feat.blurb}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
