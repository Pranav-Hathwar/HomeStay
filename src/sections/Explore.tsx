import { useState, lazy, Suspense } from 'react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Carousel3D from '../components/Carousel3D';
import { ATTRACTIONS, type Attraction, directionsUrl, embedDirectionsUrl } from '../data/site';

// Map components pull a Google Maps embed — defer until this section is reached.
const RouteMap = lazy(() => import('../components/RouteMap'));
const MapModal = lazy(() => import('../components/MapModal'));

export default function Explore() {
  const [selected, setSelected] = useState<Attraction | null>(null);

  // Open the in-page route modal if an API key is configured; otherwise fall
  // back to opening Google Maps directions in a new tab.
  function handleSelect(a: Attraction) {
    if (embedDirectionsUrl(a.coords)) {
      setSelected(a);
    } else {
      window.open(directionsUrl(a.coords), '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Section id="explore">
      <SectionHeading
        eyebrow="Explore Mudigere"
        title="Trails, peaks and temples — all from one doorstep."
        intro="Drag through the places nearby, then tap one to draw directions from the homestay."
      />

      {/* A) 3D depth carousel */}
      <Reveal delay={0.1} className="mt-12">
        <Carousel3D items={ATTRACTIONS} onSelect={handleSelect} />
      </Reveal>

      {/* B) self-drawing route map */}
      <Reveal delay={0.1} className="mt-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow">From your doorstep</p>
            <h3 className="mt-3 font-display text-3xl tracking-tight text-fog md:text-4xl">
              A dotted path through the valley.
            </h3>
            <p className="mt-4 text-dim">
              Every trailhead and viewpoint radiates out from Mungaru. Tap a marker to open the
              driving route to that spot.
            </p>
          </div>
          <div className="overflow-hidden rounded-card-lg border border-line/50 bg-forest/70 p-4 shadow-glow">
            <div className="h-[320px] w-full md:h-[380px]">
              <Suspense fallback={<div className="h-full w-full animate-pulse rounded-2xl bg-moss/30" />}>
                <RouteMap attractions={ATTRACTIONS} onSelect={handleSelect} />
              </Suspense>
            </div>
          </div>
        </div>
      </Reveal>

      <Suspense fallback={null}>
        <MapModal attraction={selected} onClose={() => setSelected(null)} />
      </Suspense>
    </Section>
  );
}
