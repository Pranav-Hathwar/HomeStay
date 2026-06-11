import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

const LINKS = [
  { label: 'The Place', href: '#the-place' },
  { label: 'The Stay', href: '#the-stay' },
  { label: 'Explore', href: '#explore' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-line/40 bg-ink/70 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
          <a
            href="#top"
            className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Mungaru Home Stay"
          >
            <BrandLogo className="h-14 w-auto sm:h-16" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-dim transition-colors hover:text-fog"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#book"
              className="rounded-full border border-gold/70 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
            >
              Book Now
            </a>
            <button className="rounded-full border border-line/60 px-3 py-2 text-sm text-fog">
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className="absolute left-0 top-0 h-0.5 w-full rounded bg-fog" />
              <span className="absolute left-0 top-[5px] h-0.5 w-full rounded bg-fog" />
              <span className="absolute left-0 top-[10px] h-0.5 w-full rounded bg-fog" />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-5">
              <a
                href="#top"
                onClick={() => setOpen(false)}
                className="shrink-0"
                aria-label="Mungaru Home Stay"
              >
                <BrandLogo className="h-12 w-auto" />
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60"
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 rounded bg-fog" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 rounded bg-fog" />
                </span>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                  className="border-b border-line/30 py-5 font-display text-3xl text-fog"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="block rounded-full border border-gold/70 bg-gold/10 px-5 py-4 text-center text-base font-semibold text-gold-bright"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
