import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Attraction } from '../data/site';

/**
 * "From your doorstep" — a curved dotted path that draws itself when scrolled
 * into view, with location markers popping in sequentially. Clicking a marker
 * opens directions from the homestay to that place.
 */

// Hand-placed points along the path (viewBox 0..440 x 0..300).
const POINTS = [
  { x: 40, y: 250, label: 'Homestay', origin: true },
  { x: 110, y: 200 },
  { x: 180, y: 235 },
  { x: 250, y: 150 },
  { x: 320, y: 185 },
  { x: 390, y: 80 },
];

const PATH_D =
  'M40 250 C 80 215, 95 195, 110 200 S 160 250, 180 235 S 225 150, 250 150 S 305 200, 320 185 S 375 110, 390 80';

export default function RouteMap({
  attractions,
  onSelect,
}: {
  attractions: Attraction[];
  onSelect: (a: Attraction) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Pair the first few attractions to the non-origin points.
  const stops = attractions.slice(0, POINTS.length - 1);

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 300"
      className="h-full w-full"
      role="img"
      aria-label="Map of nearby attractions with a dotted route from the homestay"
    >
      <defs>
        <radialGradient id="rm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,168,106,0.35)" />
          <stop offset="100%" stopColor="rgba(201,168,106,0)" />
        </radialGradient>
      </defs>

      {/* faint terrain contours for texture */}
      {[70, 130, 190].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y} Q 110 ${y - 28} 220 ${y} T 440 ${y}`}
          fill="none"
          stroke="rgba(242,239,230,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* the self-drawing dotted path */}
      <motion.path
        d={PATH_D}
        fill="none"
        stroke="rgba(201,168,106,0.7)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 9"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />

      {/* markers */}
      {POINTS.map((p, i) => {
        const stop = i === 0 ? null : stops[i - 1];
        const delay = reduce ? 0 : 0.35 + i * 0.32;
        const labelLeft = p.x > 300;

        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView || reduce ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
            style={{ cursor: stop ? 'pointer' : 'default' }}
            onClick={() => stop && onSelect(stop)}
            role={stop ? 'button' : undefined}
            tabIndex={stop ? 0 : -1}
            aria-label={stop ? `Directions to ${stop.name}, ${stop.distance}` : 'Homestay'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && stop) onSelect(stop);
            }}
          >
            <circle cx={p.x} cy={p.y} r="14" fill="url(#rm-glow)" />
            {p.origin ? (
              <>
                <circle cx={p.x} cy={p.y} r="6" fill="#e3c98c" />
                <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="#e3c98c" strokeWidth="1.5" opacity="0.5" />
              </>
            ) : (
              <circle cx={p.x} cy={p.y} r="5" fill="#e3c98c" stroke="#0a0f0c" strokeWidth="1.5" />
            )}

            {/* label */}
            <g transform={`translate(${labelLeft ? p.x - 8 : p.x + 8}, ${p.y - 6})`}>
              <text
                x={labelLeft ? -2 : 2}
                y="0"
                textAnchor={labelLeft ? 'end' : 'start'}
                fontSize="11"
                fontWeight="600"
                fill="#f2efe6"
              >
                {p.origin ? 'Your doorstep' : stop?.name}
              </text>
              {stop && (
                <text
                  x={labelLeft ? -2 : 2}
                  y="13"
                  textAnchor={labelLeft ? 'end' : 'start'}
                  fontSize="9"
                  fill="rgba(242,239,230,0.6)"
                >
                  {stop.distance}
                </text>
              )}
            </g>
          </motion.g>
        );
      })}
    </svg>
  );
}
