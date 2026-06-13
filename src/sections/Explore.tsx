import { useState } from 'react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Carousel3D from '../components/Carousel3D';
import RouteMap from '../components/RouteMap';
import MapModal from '../components/MapModal';
import { ATTRACTIONS, type Attraction, directionsUrl, embedDirectionsUrl } from '../data/site';

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
    <section id="explore" className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
      <Parallax distance={36}>
        <Reveal>
          <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Explore Mudigere</p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
            Trails, peaks and temples — all from one doorstep.
          </h2>
          <p className="mt-3 max-w-xl text-dim">
            Drag through the places nearby, then tap one to draw directions from the homestay.
          </p>
        </Reveal>
      </Parallax>

      {/* A) 3D depth carousel */}
      <Reveal delay={0.1} className="mt-12">
        <Carousel3D items={ATTRACTIONS} onSelect={handleSelect} />
      </Reveal>

      {/* B) self-drawing route map */}
      <Reveal delay={0.1} className="mt-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">From your doorstep</p>
            <h3 className="mt-3 font-display text-3xl tracking-tight text-fog md:text-4xl">
              A dotted path through the valley.
            </h3>
            <p className="mt-4 text-dim">
              Every trailhead and viewpoint radiates out from Mungaru. Tap a marker to open the
              driving route to that spot.
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-line/50 bg-forest/70 p-4 shadow-glow">
            <div className="h-[320px] w-full md:h-[380px]">
              <RouteMap attractions={ATTRACTIONS} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      </Reveal>

      <MapModal attraction={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
