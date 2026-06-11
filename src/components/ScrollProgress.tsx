import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin gold progress bar pinned to the top of the viewport that fills as the
 * page scrolls. Driven by framer-motion's `useScroll` and smoothed with a
 * spring so it glides rather than snaps — a modern, low-cost orientation cue.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold via-gold-bright to-gold shadow-[0_0_12px_rgba(227,201,140,0.6)]"
      style={{ scaleX }}
    />
  );
}
