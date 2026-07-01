import { Cross, BedDouble, Wine, ArrowUpRight, type LucideIcon } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import NearbyMap from '../components/NearbyMap';
import { NEARBY_POIS, type Poi } from '../data/nearby';
import { directionsUrl } from '../data/site';

const POI_ICON: Record<Poi['kind'], LucideIcon> = { hospital: Cross, hotel: BedDouble, liquor: Wine };
const POI_ACCENT: Record<Poi['kind'], string> = {
  hospital: 'border-rose-300/50 bg-rose-400/15 text-rose-200',
  hotel: 'border-sky-300/50 bg-sky-400/15 text-sky-200',
  liquor: 'border-gold/50 bg-gold/15 text-gold-bright',
};

function LegendDot({ size, label }: { size: number; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-dim">
      <span
        className="rounded-full border border-fog/60 bg-fog/80"
        style={{ width: size, height: size }}
      />
      {label}
    </span>
  );
}

export default function Nearby() {
  return (
    <Section id="nearby">
      <SectionHeading
        eyebrow="The Neighbourhood"
        title="What's around, at a glance."
        intro="A live radar of the villages, towns and essentials around the homestay — sized by how big each place is. Tap any point to open driving directions from the doorstep."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal>
          <div className="card p-5 sm:p-8">
            <NearbyMap />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-6">
            {/* legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <LegendDot size={16} label="City" />
              <LegendDot size={12} label="Town" />
              <LegendDot size={8} label="Village" />
            </div>

            {/* nearest essentials */}
            <div>
              <h3 className="eyebrow mb-3">Nearest essentials</h3>
              <ul className="flex flex-col gap-3">
                {NEARBY_POIS.map((p) => {
                  const Icon = POI_ICON[p.kind];
                  return (
                    <li key={p.kind}>
                      <a
                        href={directionsUrl(p.coords)}
                        target="_blank"
                        rel="noreferrer"
                        className="card card-hover group flex items-center gap-4 p-4"
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${POI_ACCENT[p.kind]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-fog">{p.name}</span>
                          <span className="block text-xs text-dim">
                            {p.note} · ~{p.dist} km
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-colors group-hover:text-gold-bright" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="text-xs leading-relaxed text-faint">
              Nearest village is Gowdahalli, ~1.4 km away; Mudigere town is ~10 km. Places from
              OpenStreetMap — liquor points to Mudigere town, the closest retail. Distances are
              straight-line; tap a marker for the real driving route.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
