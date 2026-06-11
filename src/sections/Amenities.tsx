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
import { AMENITIES } from '../data/site';

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

export default function Amenities() {
  return (
    <section className="relative border-y border-line/40 bg-moss/25 backdrop-blur-md py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Amenities</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
            Everything you need, nothing you don't.
          </h2>
          <p className="mt-3 text-sm text-dim">
            No air conditioning — at 906&nbsp;m the mountain air does the job.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((name, i) => {
            const Icon = ICONS[name] ?? Wifi;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -5 }}
                className="group flex items-center gap-3 rounded-2xl border border-line/60 bg-card/80 px-4 py-4 transition-colors hover:border-gold/40 hover:shadow-glow"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line/50 bg-moss/60 text-gold-bright transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm text-fog">{name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
