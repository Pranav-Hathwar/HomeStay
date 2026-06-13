import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { SPRING, SPRING_OPTS } from '../motion';

/**
 * A modern "magnetic" link/button: it gently drifts toward the cursor while
 * hovered and springs back on leave, with a scale-down tap response. With
 * `spotlight`, a soft gold light pool also tracks the cursor inside the button.
 * The pull is subtle (capped travel) so it feels alive without being gimmicky.
 * Falls back to a static element under prefers-reduced-motion.
 */
export default function MagneticButton({
  href,
  children,
  className = '',
  strength = 0.35,
  spotlight = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
  /** Render a cursor-following gold glow inside the button. */
  spotlight?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING_OPTS.snappy);
  const y = useSpring(my, SPRING_OPTS.snappy);

  // Local cursor position (px within the button) for the spotlight.
  const lx = useMotionValue(-100);
  const ly = useMotionValue(-100);
  const glow = useMotionTemplate`radial-gradient(120px circle at ${lx}px ${ly}px, rgba(227,201,140,0.35), transparent 65%)`;

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mx.set(relX * strength);
    my.set(relY * strength);
    lx.set(e.clientX - rect.left);
    ly.set(e.clientY - rect.top);
  }

  function reset() {
    mx.set(0);
    my.set(0);
    lx.set(-100);
    ly.set(-100);
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
      transition={SPRING.snappy}
      className={`${spotlight ? 'relative overflow-hidden' : ''} ${className}`}
    >
      {spotlight && !reduce && (
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0"
        />
      )}
      {spotlight ? <span className="relative z-10 inline-flex items-center gap-2">{children}</span> : children}
    </motion.a>
  );
}
