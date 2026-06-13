import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Drifts its children vertically as the section scrolls through the viewport —
 * a small, tasteful parallax that gives section headings editorial depth.
 * `distance` is the total travel in px (positive = element lags the scroll).
 * No-op under reduced motion.
 */
export default function Parallax({
  children,
  distance = 60,
  className = '',
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
