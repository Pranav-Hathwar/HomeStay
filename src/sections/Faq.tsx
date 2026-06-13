import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import { FAQS } from '../data/site';
import { EASE } from '../motion';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-y border-line/40 bg-forest/30 backdrop-blur-md py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <Parallax distance={30}>
          <Reveal>
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">FAQ</p>
            <h2 className="mt-3 text-balance font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
              Good to know before you come.
            </h2>
          </Reveal>
        </Parallax>

        <div className="mt-10 divide-y divide-line/40 border-y border-line/40">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg text-fog md:text-xl">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/60 text-gold-bright"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-dim">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
