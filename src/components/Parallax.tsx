import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * Drifts its children vertically as the section scrolls through the viewport —
 * a small, tasteful parallax that gives section headings editorial depth.
 * `distance` is the total travel in px (positive = element lags the scroll).
 *
 * Desktop only: under reduced motion or on phones it renders a plain wrapper and
 * never subscribes to scroll, so there's no per-frame work to jank mobile scroll.
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
  const isMobile = useIsMobile();

  if (reduce || isMobile) return <div className={className}>{children}</div>;
  return (
    <ParallaxInner distance={distance} className={className}>
      {children}
    </ParallaxInner>
  );
}

function ParallaxInner({
  children,
  distance,
  className,
}: {
  children: ReactNode;
  distance: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
