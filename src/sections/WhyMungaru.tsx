import { motion } from 'framer-motion';
import { Trees, Coffee, Mountain, Home } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { EASE } from '../motion';

const FEATURES = [
  {
    icon: Trees,
    title: 'Peaceful Seclusion',
    copy: 'A whole house to yourselves, set apart in the green. No neighbours, no noise — only birdsong and rain.',
  },
  {
    icon: Coffee,
    title: 'Coffee Country',
    copy: 'Tucked into the estate belt of Chikkamagaluru, where the air smells of wet earth and roasting beans.',
  },
  {
    icon: Mountain,
    title: 'Trek Base Camp',
    copy: 'Ettina Bhuja, Deveramane and Kudremukh are all within reach. Wake early, climb into the clouds.',
  },
  {
    icon: Home,
    title: 'Full Home Comforts',
    copy: 'Hot water, a full kitchen, power backup, fast Wi-Fi and a TV setup — wild outside, easy inside.',
  },
];

export default function WhyMungaru() {
  return (
    <Section tone="band" divider>
      <SectionHeading
        eyebrow="Why Mungaru"
        title="Four reasons the valley keeps people coming back."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            whileHover={{ y: -8 }}
            className="card card-hover group relative overflow-hidden p-7"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-sm tracking-[0.3em] text-gold-bright">
                0{i + 1}
              </span>
              <f.icon className="h-6 w-6 text-gold-bright transition-transform duration-500 group-hover:scale-110" />
            </div>
            <h3 className="font-display text-2xl text-fog">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{f.copy}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
