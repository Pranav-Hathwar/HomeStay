import { Star, Quote } from 'lucide-react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import TiltCard from '../components/TiltCard';
import { REVIEWS } from '../data/site';

export default function Reviews() {
  const avg = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
      <Parallax distance={36}>
        <Reveal>
          <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Guest Reviews</p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
            Loved by the people who came for the quiet.
          </h2>
          <p className="mt-3 flex items-center gap-2 text-dim">
            <span className="flex items-center gap-1 text-gold-bright">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-display text-lg text-fog">{avg}</span>
            <span className="text-sm">· {REVIEWS.length} verified stays</span>
          </p>
        </Reveal>
      </Parallax>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1200px' }}>
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.08}>
            <TiltCard max={6} className="h-full">
              <article className="flex h-full flex-col rounded-[28px] border border-line/60 bg-card/90 p-7 transition-colors hover:border-gold/40 hover:shadow-glow">
                <Quote className="h-7 w-7 text-gold/50" aria-hidden />
                <div className="mt-4 flex items-center gap-1 text-gold-bright" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fog/90">“{r.quote}”</p>
                <footer className="mt-6 flex items-center justify-between border-t border-line/40 pt-4">
                  <div>
                    <div className="text-sm font-semibold text-fog">{r.name}</div>
                    <div className="text-xs text-dim">{r.place}</div>
                  </div>
                  <div className="text-xs text-faint">{r.date}</div>
                </footer>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
