import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DUR, EASE, inView } from '../motion';

/** Reusable scroll-reveal wrapper with an optional stagger delay. */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: DUR.base, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
