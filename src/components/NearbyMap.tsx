import { motion, useReducedMotion } from 'framer-motion';
import { Home, Cross, BedDouble, Wine, type LucideIcon } from 'lucide-react';
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

const POI_ICON: Record<Poi['kind'], LucideIcon> = {
  hospital: Cross,
  hotel: BedDouble,
  liquor: Wine,
};
const POI_STYLE: Record<Poi['kind'], string> = {
  hospital: 'border-rose-300/60 bg-rose-400/20 text-rose-200',
  hotel: 'border-sky-300/60 bg-sky-400/20 text-sky-200',
  liquor: 'border-gold/60 bg-gold/20 text-gold-bright',
};

function dotPx(kind: Place['kind']): number {
  return kind === 'city' ? 16 : kind === 'town' ? 12 : kind === 'village' ? 8 : 6;
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
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus:outline-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
      aria-label={`${place.name}, ${place.dist} km — directions`}
    >
      <span
        className={
          big
            ? 'rounded-full border border-gold-bright bg-gold shadow-[0_0_10px_rgba(227,201,140,0.6)] transition-transform group-hover:scale-125'
            : 'rounded-full border border-fog/60 bg-fog/80 transition-transform group-hover:scale-150'
        }
        style={{ width: size, height: size }}
      />
      <span
        className={`whitespace-nowrap text-[9px] font-medium leading-none sm:text-[10px] ${
          big ? 'text-fog' : 'hidden text-dim sm:block'
        }`}
      >
        {place.name}
      </span>
    </motion.button>
  );
}

function PoiMarker({ poi, i }: { poi: Poi; i: number }) {
  const { x, y } = project(poi.bearing, poi.dist);
  const Icon = POI_ICON[poi.kind];
  return (
    <motion.button
      type="button"
      onClick={() => open(poi.coords)}
      className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus:outline-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 260, damping: 16 }}
      aria-label={`${poi.name}, ${poi.dist} km — directions`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border backdrop-blur transition-transform group-hover:scale-125 ${POI_STYLE[poi.kind]}`}
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
            <stop offset="0%" stopColor="rgba(201,168,106,0.12)" />
            <stop offset="70%" stopColor="rgba(201,168,106,0)" />
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
              stroke="rgba(242,239,230,0.12)"
              strokeWidth="0.25"
              strokeDasharray="1 1.5"
            />
            <text
              x="50"
              y={50 - ringRadius(km) - 1}
              fill="rgba(242,239,230,0.4)"
              fontSize="2.3"
              textAnchor="middle"
            >
              {km} km
            </text>
          </g>
        ))}
        {/* faint spokes out to the essentials */}
        {NEARBY_POIS.map((p) => {
          const { x, y } = project(p.bearing, p.dist);
          return (
            <line
              key={p.kind}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgba(242,239,230,0.14)"
              strokeWidth="0.2"
              strokeDasharray="0.8 1"
            />
          );
        })}
        {/* compass ticks */}
        {(['N', 'E', 'S', 'W'] as const).map((d, i) => {
          const a = (i * 90 * Math.PI) / 180;
          const x = 50 + 47 * Math.sin(a);
          const y = 50 - 47 * Math.cos(a);
          return (
            <text
              key={d}
              x={x}
              y={y + 1}
              fill="rgba(242,239,230,0.35)"
              fontSize="3"
              fontWeight="600"
              textAnchor="middle"
            >
              {d}
            </text>
          );
        })}
      </svg>

      {/* radar sweep — a single rotating conic layer (cheap, GPU-composited) */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-[4%] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(227,201,140,0.20), rgba(227,201,140,0.05) 40deg, transparent 70deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
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
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-bright/50"
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 1.3 }}
            />
          ))}
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-bright bg-gold/25 text-gold-bright shadow-glow backdrop-blur">
          <Home className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
