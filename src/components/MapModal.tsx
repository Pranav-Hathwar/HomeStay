import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, MapPin } from 'lucide-react';
import type { Attraction } from '../data/site';
import { directionsUrl, embedDirectionsUrl } from '../data/site';

/**
 * In-page route modal (Google Maps Embed, directions mode). If no
 * VITE_MAPS_API_KEY is configured the modal never renders — callers open the
 * plain directions URL in a new tab instead (see Explore section).
 *
 * Closable via X, Esc, and backdrop click.
 */
export default function MapModal({
  attraction,
  onClose,
}: {
  attraction: Attraction | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!attraction) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [attraction, onClose]);

  const embed = attraction ? embedDirectionsUrl(attraction.coords) : null;

  return (
    <AnimatePresence>
      {attraction && embed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Route to ${attraction.name}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-line/50 bg-card shadow-glow"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line/40 px-5 py-4">
              <div>
                <h3 className="font-display text-2xl text-fog">{attraction.name}</h3>
                <p className="flex items-center gap-1.5 text-sm text-dim">
                  <MapPin className="h-3.5 w-3.5 text-gold-bright" />
                  {attraction.type} · {attraction.distance} from the homestay
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/60 text-fog transition hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-forest">
              <iframe
                title={`Route to ${attraction.name}`}
                src={embed}
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex justify-end border-t border-line/40 px-5 py-4">
              <a
                href={directionsUrl(attraction.coords)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
              >
                Open in Google Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
