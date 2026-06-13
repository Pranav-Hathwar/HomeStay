import { motion } from 'framer-motion';
import { Mountain, Users, Footprints, Navigation } from 'lucide-react';
import CountUp from '../components/CountUp';
import { EASE } from '../motion';

const STATS = [
  { icon: Mountain, value: '906 m', label: 'Elevation' },
  { icon: Users, value: '8–10', label: 'Guests' },
  { icon: Footprints, value: '~9 km', label: 'to Ettina Bhuja' },
  { icon: Navigation, value: '252 km', label: 'from Bengaluru' },
];

export default function StatStrip() {
  return (
    <section className="relative z-10 border-b border-line/40 bg-forest/25 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-line/30 px-4 py-8 sm:divide-x lg:grid-cols-4 lg:px-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="flex flex-col items-center gap-1 px-2 py-4 text-center sm:px-6"
          >
            <s.icon className="mb-1 h-5 w-5 text-gold-bright" />
            <div className="font-display text-3xl text-fog md:text-4xl">
              <CountUp value={s.value} />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-dim">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
