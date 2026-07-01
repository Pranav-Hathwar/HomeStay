import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAfterPaint } from '../hooks/useAfterPaint';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * <MistBackground /> — the signature atmosphere of the site.
 *
 * Layers, back to front:
 *   1. Drifting fog banks (blurred radial gradients) — clouds passing.
 *   2. Optional parallax mountain ridgelines (SVG silhouettes) that the fog
 *      rolls between — the "cloudy mountain" motion.
 *   3. A low veil of rising ground-fog along the bottom edge.
 *
 * Only `transform` + `opacity` animate (GPU-friendly). Honours
 * prefers-reduced-motion by rendering everything static.
 */

type Props = {
  /** Render the parallax mountain ridgelines (use on hero + key bands). */
  mountains?: boolean;
  /** Overall density of the fog. ('page' = the full-site moving cloud floor.) */
  intensity?: 'subtle' | 'normal' | 'dense' | 'page';
  /** Render a full-bleed drifting cloud wash (used by the global page layer). */
  cover?: boolean;
  className?: string;
};

const FOG_BANKS = [
  { top: '6%',  left: '-20%', w: '70%', h: '55%', base: 0.18, dur: 34, dx: 240, dy: -40, scale: 1.0 },
  { top: '28%', left: '20%',  w: '85%', h: '60%', base: 0.14, dur: 44, dx: -210, dy: 30,  scale: 1.25 },
  { top: '0%',  left: '40%',  w: '60%', h: '50%', base: 0.16, dur: 30, dx: 190, dy: 34,  scale: 0.9 },
  { top: '45%', left: '-10%', w: '75%', h: '55%', base: 0.12, dur: 40, dx: 170, dy: -28, scale: 1.1 },
  { top: '18%', left: '60%',  w: '55%', h: '50%', base: 0.15, dur: 26, dx: -160, dy: -22, scale: 0.85 },
];

const INTENSITY = { subtle: 0.6, normal: 1, dense: 1.4, page: 1.9 } as const;

// Big, full-viewport cloud masses for the site-wide cloud floor. Brighter and
// with real travel distance so the drift actually reads on a dark page.
const COVER = [
  { cx: '22%', cy: '28%', r: '55%', base: 0.16, dur: 42, dx: 220, dy: 60,  scale: 1 },
  { cx: '78%', cy: '52%', r: '60%', base: 0.14, dur: 54, dx: -200, dy: -50, scale: 1.15 },
  { cx: '48%', cy: '82%', r: '65%', base: 0.13, dur: 64, dx: 170, dy: 40,  scale: 1.3 },
];

// Slow colored glows — cool moonlight + warm lamp — sweeping behind the fog.
const AURORA = [
  { color: 'rgba(120,168,196,0.16)', cx: '18%', cy: '24%', dur: 38, dx: 240, dy: 70 },
  { color: 'rgba(201,168,106,0.14)', cx: '82%', cy: '74%', dur: 50, dx: -210, dy: -80 },
];

export default function MistBackground({
  mountains = false,
  intensity = 'normal',
  cover = false,
  className = '',
}: Props) {
  const reduce = useReducedMotion();
  const ready = useAfterPaint();
  const isMobile = useIsMobile();
  const mult = INTENSITY[intensity];

  // Stable cloud puffs for the layer drifting between the peaks.
  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 30 + (i % 3) * 14,
        left: -30 + i * 22,
        w: 220 + (i % 3) * 90,
        dur: 50 + i * 9,
        delay: -i * 7,
        op: 0.06 + (i % 3) * 0.03,
      })),
    []
  );

  // Decorative only — keep it out of the first paint so its many heavy blurred
  // layers don't inflate LCP; it fades in once the browser is idle. Skipped
  // entirely on phones, where the animated blurs are a scroll-jank source.
  if (!ready || isMobile) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 0a — colored aurora glows sweeping behind the fog */}
      {cover &&
        AURORA.map((a, i) => (
          <motion.div
            key={`aurora-${i}`}
            className="absolute -inset-[25%]"
            style={{
              background: `radial-gradient(45% 45% at ${a.cx} ${a.cy}, ${a.color} 0%, rgba(10,15,12,0) 70%)`,
              filter: 'blur(60px)',
              willChange: 'transform, opacity',
            }}
            animate={
              reduce
                ? undefined
                : { x: [0, a.dx, 0], y: [0, a.dy, 0], opacity: [0.55, 1, 0.55] }
            }
            transition={
              reduce ? undefined : { duration: a.dur, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}

      {/* 0b — full-bleed cloud floor (site-wide moving mist) */}
      {cover &&
        COVER.map((c, i) => (
          <motion.div
            key={`cover-${i}`}
            className="absolute -inset-[20%]"
            style={{
              background: `radial-gradient(${c.r} ${c.r} at ${c.cx} ${c.cy}, rgba(232,240,236,0.26) 0%, rgba(196,214,206,0.11) 40%, rgba(10,15,12,0) 72%)`,
              filter: 'blur(64px)',
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: c.base * mult, scale: c.scale }}
            animate={
              reduce
                ? { opacity: c.base * mult }
                : {
                    x: [0, c.dx, 0],
                    y: [0, c.dy, c.dy * -0.5, 0],
                    opacity: [c.base * mult, c.base * 1.7 * mult, c.base * mult],
                    scale: [c.scale, c.scale * 1.14, c.scale],
                  }
            }
            transition={
              reduce ? undefined : { duration: c.dur, repeat: Infinity, ease: 'linear' }
            }
          />
        ))}

      {/* 1 — drifting fog banks */}
      {FOG_BANKS.map((b, i) => (
        <motion.div
          key={`bank-${i}`}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: b.w,
            height: b.h,
            background:
              'radial-gradient(closest-side, rgba(255,255,255,0.26) 0%, rgba(220,232,226,0.12) 38%, rgba(10,15,12,0) 72%)',
            filter: 'blur(48px)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: b.base * mult, scale: b.scale }}
          animate={
            reduce
              ? { opacity: b.base * mult }
              : {
                  x: [0, b.dx, 0],
                  y: [0, b.dy, b.dy * -0.4, 0],
                  opacity: [
                    b.base * mult,
                    b.base * 1.7 * mult,
                    b.base * 1.2 * mult,
                    b.base * mult,
                  ],
                  scale: [b.scale, b.scale * 1.08, b.scale],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: b.dur, repeat: Infinity, ease: 'linear', times: [0, 0.4, 0.7, 1] }
          }
        />
      ))}

      {/* 2 — parallax mountain ridgelines with clouds rolling between them.
            Three soft, curved ranges with atmospheric perspective: distant
            ridges are hazy and blue-grey, near ridges darker — each fades into
            mist along its crest via a vertical gradient, so they read as
            layered hills rather than flat cut-out triangles. */}
      {mountains && (
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          {/* far range — hazy, light, soft */}
          <Ridge
            id="ridge-far"
            d="M0,228 C160,196 250,206 392,182 C540,156 624,200 772,176 C918,152 1006,200 1156,174 C1296,150 1372,188 1440,180 L1440,320 L0,320 Z"
            top="rgba(150,176,180,0.0)"
            bottom="rgba(96,124,124,0.30)"
            blur={7}
            drift={reduce ? 0 : 30}
            dur={80}
            y="4%"
          />
          {/* mid range */}
          <Ridge
            id="ridge-mid"
            d="M0,262 C180,224 286,236 432,210 C576,184 692,228 836,204 C988,178 1090,226 1232,200 C1346,180 1402,212 1440,206 L1440,320 L0,320 Z"
            top="rgba(46,72,58,0.08)"
            bottom="rgba(28,46,36,0.62)"
            blur={3.5}
            drift={reduce ? 0 : 22}
            dur={70}
            y="14%"
          />
          {/* cloud band weaving between the ridges */}
          {!reduce &&
            clouds.map((c) => (
              <motion.div
                key={`cloud-${c.id}`}
                className="absolute rounded-full"
                style={{
                  top: `${c.top}%`,
                  left: `${c.left}%`,
                  width: c.w,
                  height: c.w * 0.34,
                  background:
                    'radial-gradient(closest-side, rgba(242,239,230,0.18) 0%, rgba(242,239,230,0.07) 50%, rgba(10,15,12,0) 78%)',
                  filter: 'blur(28px)',
                  opacity: c.op * mult,
                  willChange: 'transform',
                }}
                animate={{ x: ['-10%', '120%'] }}
                transition={{
                  duration: c.dur,
                  delay: c.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          {/* near range — darkest, in front of the clouds, crest dissolves into fog */}
          <Ridge
            id="ridge-near"
            d="M0,300 C200,262 322,274 470,250 C628,224 748,272 904,248 C1062,224 1180,270 1322,246 C1398,234 1426,256 1440,250 L1440,320 L0,320 Z"
            top="rgba(9,14,11,0.12)"
            bottom="rgba(7,11,9,0.92)"
            blur={1.2}
            drift={reduce ? 0 : -16}
            dur={92}
            y="22%"
          />
        </div>
      )}

      {/* 3 — rising ground fog along the base */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(228,236,232,0.14) 55%, rgba(10,15,12,0) 100%)',
          filter: 'blur(20px)',
          willChange: 'transform, opacity',
        }}
        initial={{ opacity: 0.1 * mult }}
        animate={
          reduce
            ? { opacity: 0.1 * mult }
            : { y: [0, -14, 0], opacity: [0.08 * mult, 0.18 * mult, 0.08 * mult] }
        }
        transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function Ridge({
  id,
  d,
  top,
  bottom,
  blur,
  drift,
  dur,
  y,
}: {
  id: string;
  d: string;
  /** Colour at the crest — keep this near-transparent so the ridgeline melts into mist. */
  top: string;
  /** Colour at the base — the solid mass of the hill. */
  bottom: string;
  blur: number;
  drift: number;
  dur: number;
  y: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-full w-[120%]"
      style={{ left: '-10%', filter: `blur(${blur}px)`, willChange: 'transform' }}
      initial={{ x: 0, y }}
      animate={drift ? { x: [0, drift, 0], y } : { y }}
      transition={drift ? { duration: dur, repeat: Infinity, ease: 'linear' } : undefined}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="55%" stopColor={bottom} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </motion.svg>
  );
}
