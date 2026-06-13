import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig, whatsappUrl } from '../data/site';

/** Mobile-only sticky booking bar — appears after the hero, hides over the Book form. */
export default function StickyBookBar() {
  const [show, setShow] = useState(false);
  const hasPrice = siteConfig.pricePerNight && !siteConfig.pricePerNight.includes('_');

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const book = document.getElementById('book');
      const atBook = book ? book.getBoundingClientRect().top < window.innerHeight : false;
      setShow(past && !atBook);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="glass-strong fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="leading-tight">
            <div className="text-sm font-semibold text-fog">{siteConfig.name}</div>
            {hasPrice && (
              <div className="text-xs text-dim">
                from <span className="text-gold-bright">₹{siteConfig.pricePerNight}</span> / night
              </div>
            )}
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-gold/20 px-5 py-3 text-sm font-semibold text-gold-bright"
          >
            <MessageCircle className="h-4 w-4" /> Check Availability
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
