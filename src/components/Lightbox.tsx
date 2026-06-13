import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE } from '../motion';

type Img = { src: string; alt: string };

/**
 * Keyboard- and swipe-navigable image lightbox. When the device allows motion,
 * the opened image shares a `layoutId` with its gallery tile, so the tile
 * physically grows into the lightbox (and shrinks back on close).
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: Img[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index! + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index! - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, images.length, onClose, onIndex]);

  const go = (dir: number) =>
    open && onIndex((index! + dir + images.length) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line/60 text-fog transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line/60 text-fog transition hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line/60 text-fog transition hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* keyed so navigating swaps the morph target to the new tile */}
          <motion.img
            key={index}
            layoutId={reduce ? undefined : `tile-${index}`}
            src={images[index!].src}
            alt={images[index!].alt}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0, scale: 0.96 } : false}
            animate={reduce ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-h-[82vh] max-w-[92vw] cursor-grab rounded-2xl object-contain shadow-2xl active:cursor-grabbing"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-dim">
            {String(index! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
