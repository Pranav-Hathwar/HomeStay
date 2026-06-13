// ─────────────────────────────────────────────────────────────────────────────
// MOTION TOKENS — one source of truth for easing, springs, and durations.
// Importing these everywhere is what turns "lots of animations" into a single,
// coherent motion language. Tune a value here and the whole site moves with it.
// ─────────────────────────────────────────────────────────────────────────────

import type { SpringOptions, Transition, Variants } from 'framer-motion';

/** Signature easing — a soft, confident ease-out (cubic-bezier). */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Durations, in seconds. */
export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/**
 * Spring options for `useSpring(value, …)` (no `type` key — that's what the
 * hook expects). Tuned by feel.
 */
export const SPRING_OPTS = {
  /** General layout / card motion. */
  soft: { stiffness: 200, damping: 26 } as SpringOptions,
  /** Snappy interactive feedback (buttons, taps). */
  snappy: { stiffness: 320, damping: 20, mass: 0.4 } as SpringOptions,
  /** Smooth cursor-following (tilt, magnet). */
  follow: { stiffness: 180, damping: 18 } as SpringOptions,
} as const;

/** The same springs as `Transition`s for `transition`/`whileHover` props. */
export const SPRING = {
  soft: { type: 'spring', ...SPRING_OPTS.soft } as Transition,
  snappy: { type: 'spring', ...SPRING_OPTS.snappy } as Transition,
  follow: { type: 'spring', ...SPRING_OPTS.follow } as Transition,
} as const;

/** Standard scroll-reveal: rise + fade, gated by `whileInView`. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

/** Parent that staggers its children in on view. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Child of {@link staggerParent}. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

/** Shared viewport config so every section triggers at the same point. */
export const inView = { once: true, amount: 0.25 } as const;
