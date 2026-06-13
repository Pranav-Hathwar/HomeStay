import { useRef, type CSSProperties, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { SPRING, SPRING_OPTS } from '../motion';

/**
 * Lifts its children toward the viewer on the Z-axis so they separate in space
 * as the parent {@link TiltCard} rotates. Must live inside a TiltCard (which
 * provides the `preserve-3d` context). Renders flat under reduced motion.
 */
export function TiltLayer({
  z = 30,
  children,
  className = '',
}: {
  z?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div style={{ transform: `translateZ(${z}px)` }} className={className}>
      {children}
    </div>
  );
}

/**
 * A card that tilts toward the cursor in 3D, with a soft light-glare that
 * tracks the pointer. Spring-smoothed, GPU-only transforms. Falls back to a
 * flat hover-lift when reduced motion is set.
 */
export default function TiltCard({
  children,
  className = '',
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING_OPTS.follow);
  const sy = useSpring(py, SPRING_OPTS.follow);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  // Pointer-following light glare (a soft gold/white pool over the card).
  const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(sy, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(227,201,140,0.16), transparent 60%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) {
    return (
      <div className={`transition-transform duration-300 hover:-translate-y-2 ${className}`}>
        {children}
      </div>
    );
  }

  const layerStyle: CSSProperties = {
    rotateX,
    rotateY,
    transformPerspective: 900,
    transformStyle: 'preserve-3d',
  } as CSSProperties;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={layerStyle}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={SPRING.soft}
      className={`group/tilt relative ${className}`}
    >
      {children}
      {/* glare sits above content but never eats clicks */}
      <motion.div
        aria-hidden
        style={{ background: glare, transform: 'translateZ(60px)' }}
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
