import { Tv, BedDouble, Trees } from 'lucide-react';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import { property } from '../data/images';

const SPACES = [
  {
    icon: Tv,
    title: 'The Hall',
    meta: 'Sleeps 5',
    copy: 'A large, bright living space with a full TV setup — the heart of the house for films, games and long lazy afternoons.',
  },
  {
    icon: BedDouble,
    title: 'The Room',
    meta: 'Sleeps 2',
    copy: 'A private bedroom for quiet mornings, with the green pressing softly against the window.',
  },
  {
    icon: Trees,
    title: 'The Backyard Sitting Area',
    meta: 'Open all day',
    copy: 'An outdoor lounge at the back of the house, looking straight into the green — for morning coffee and long evenings.',
  },
];

export default function TheStay() {
  return (
    <section id="the-stay" className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
      {/* feature banner */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-line/50 shadow-glow">
          <img
            src={property.houseFront}
            alt="The Malnad cottage exterior under its terracotta-tiled roof"
            className="h-[320px] w-full object-cover md:h-[460px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">The Stay</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-fog md:text-6xl">
              A whole house, all to yourselves.
            </h2>
            <p className="mt-4 max-w-xl text-dim">
              Booked as a whole — no shared spaces. A full kitchen and two hot-water bathrooms
              support an easy 8–10 guests across these three spaces.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 3D tilt cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3" style={{ perspective: '1200px' }}>
        {SPACES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <TiltCard className="h-full">
              <article className="flex h-full flex-col rounded-[28px] border border-line/60 bg-card/90 p-7 transition-colors hover:border-gold/40 hover:shadow-glow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-line/60 bg-moss/70">
                  <s.icon className="h-6 w-6 text-gold-bright" />
                </div>
                <div className="text-xs uppercase tracking-[0.28em] text-gold-bright">{s.meta}</div>
                <h3 className="mt-2 font-display text-2xl text-fog">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{s.copy}</p>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
