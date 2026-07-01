import { motion, useReducedMotion } from 'framer-motion';
import { Home, Cross, BedDouble, Wine, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import {
  NEARBY_PLACES,
  NEARBY_POIS,
  project,
  ringRadius,
  type Place,
  type Poi,
} from '../data/nearby';
import { directionsUrl } from '../data/site';

const RINGS = [10, 20, 30]; // km rings
const POI_OFFSET = 5; // lift pins off the town markers they share a spot with

const POI_ICON: Record<Poi['kind'], LucideIcon> = {
  hospital: Cross,
  hotel: BedDouble,
  liquor: Wine,
  restaurant: UtensilsCrossed,
};
const POI_STYLE: Record<Poi['kind'], string> = {
  hospital: 'border-rose-300/70 bg-rose-400/25 text-rose-100',
  hotel: 'border-sky-300/70 bg-sky-400/25 text-sky-100',
  liquor: 'border-gold/70 bg-gold/25 text-gold-bright',
  restaurant: 'border-emerald-300/70 bg-emerald-400/25 text-emerald-100',
};

const LABEL_SHADOW = { textShadow: '0 1px 6px rgba(6,10,8,0.9)' };

function dotPx(kind: Place['kind']): number {
  return kind === 'city' ? 15 : kind === 'town' ? 11 : kind === 'village' ? 8 : 6;
}

/** Keep long labels from overflowing: push them inward from the edges. */
function labelClass(x: number): string {
  if (x > 68) return 'absolute right-full mr-1.5 top-1/2 -translate-y-1/2 text-right';
  if (x < 32) return 'absolute left-full ml-1.5 top-1/2 -translate-y-1/2';
  return 'absolute left-1/2 top-full mt-1 -translate-x-1/2';
}

function open(coords: string) {
  window.open(directionsUrl(coords), '_blank', 'noopener,noreferrer');
}

function PlaceMarker({ place, i }: { place: Place; i: number }) {
  const { x, y } = project(place.bearing, place.dist);
  const big = place.kind === 'city' || place.kind === 'town';
  const size = dotPx(place.kind);
  return (
    <motion.button
      type="button"
      onClick={() => open(place.coords)}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 240, damping: 18 }}
      aria-label={`${place.name}, ${place.dist} km — directions`}
    >
      <span className="relative flex items-center justify-center">
        <span
          className={
            big
              ? 'block rounded-full border border-gold-bright bg-gold shadow-[0_0_8px_rgba(227,201,140,0.55)] transition-transform group-hover:scale-125'
              : 'block rounded-full border border-fog/50 bg-fog/75 transition-transform group-hover:scale-150'
          }
          style={{ width: size, height: size }}
        />
        {big && (
          <span
            className={`${labelClass(x)} whitespace-nowrap text-[10px] font-semibold leading-none text-fog sm:text-[11px]`}
            style={LABEL_SHADOW}
          >
            {place.name}
          </span>
        )}
      </span>
    </motion.button>
  );
}

function PoiMarker({ poi, i }: { poi: Poi; i: number }) {
  const { x, y } = project(poi.bearing + (poi.nudge ?? 0), poi.dist, POI_OFFSET);
  const Icon = POI_ICON[poi.kind];
  return (
    <motion.button
      type="button"
      onClick={() => open(poi.coords)}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 240, damping: 16 }}
      aria-label={`${poi.name}, ${poi.dist} km — directions`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border shadow-[0_2px_8px_rgba(6,10,8,0.6)] transition-transform group-hover:scale-125 ${POI_STYLE[poi.kind]}`}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  );
}

export default function NearbyMap() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {/* rings, compass, spokes */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="nm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(201,168,106,0.10)" />
            <stop offset="65%" stopColor="rgba(201,168,106,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#nm-glow)" />
        {RINGS.map((km) => (
          <g key={km}>
            <circle
              cx="50"
              cy="50"
              r={ringRadius(km)}
              fill="none"
              stroke="rgba(242,239,230,0.10)"
              strokeWidth="0.2"
              strokeDasharray="0.6 1.8"
            />
            <text
              x="50"
              y={50 - ringRadius(km) - 0.8}
              fill="rgba(242,239,230,0.32)"
              fontSize="2.1"
              textAnchor="middle"
              style={{ letterSpacing: '0.05em' }}
            >
              {km} km
            </text>
          </g>
        ))}
        {/* faint spokes out to the essentials */}
        {NEARBY_POIS.map((p) => {
          const { x, y } = project(p.bearing + (p.nudge ?? 0), p.dist, POI_OFFSET);
          return (
            <line
              key={p.kind}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgba(242,239,230,0.10)"
              strokeWidth="0.15"
              strokeDasharray="0.6 1.2"
            />
          );
        })}
        {/* compass ticks */}
        {(['N', 'E', 'S', 'W'] as const).map((d, i) => {
          const a = (i * 90 * Math.PI) / 180;
          const x = 50 + 47.5 * Math.sin(a);
          const y = 50 - 47.5 * Math.cos(a);
          return (
            <text
              key={d}
              x={x}
              y={y + 1}
              fill="rgba(242,239,230,0.3)"
              fontSize="2.8"
              fontWeight="600"
              textAnchor="middle"
            >
              {d}
            </text>
          );
        })}
      </svg>

      {/* radar sweep — one thin, slow rotating beam (clean + easy on the eye) */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-[4%] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(227,201,140,0.24) 0deg, rgba(227,201,140,0.07) 10deg, rgba(227,201,140,0) 30deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* place + POI markers */}
      {NEARBY_PLACES.map((pl, i) => (
        <PlaceMarker key={pl.name} place={pl} i={i} />
      ))}
      {NEARBY_POIS.map((p, i) => (
        <PoiMarker key={p.kind} poi={p} i={i} />
      ))}

      {/* the homestay at the centre */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-bright/40"
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: i * 1.6 }}
            />
          ))}
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-bright bg-gold/25 text-gold-bright shadow-glow backdrop-blur">
          <Home className="h-4 w-4" />
        </span>
        <span
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-gold-bright"
          style={LABEL_SHADOW}
        >
          Mungaru
        </span>
      </div>
    </div>
  );
}
