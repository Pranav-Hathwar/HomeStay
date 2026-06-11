import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A modern "magnetic" link/button: it gently drifts toward the cursor while
 * hovered and springs back on leave, with a scale-down tap response. The pull
 * is subtle (capped travel) so it feels alive without being gimmicky. Falls
 * back to a static element under prefers-reduced-motion.
 */
export default function MagneticButton({
  href,
  children,
  className = '',
  strength = 0.35,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mx.set(relX * strength);
    my.set(relY * strength);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x, y }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
