import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import SceneryBackground from './components/SceneryBackground';
import Hero from './sections/Hero';
import StatStrip from './sections/StatStrip';
import ThePlace from './sections/ThePlace';
import WhyMungaru from './sections/WhyMungaru';
import TheStay from './sections/TheStay';
import Amenities from './sections/Amenities';
import Explore from './sections/Explore';
import Gallery from './sections/Gallery';
import Book from './sections/Book';
import Footer from './sections/Footer';

export default function App() {
  const reduce = useReducedMotion();

  // Smooth scrolling (skipped when the user prefers reduced motion).
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <div
      className="relative min-h-screen text-fog"
      style={{
        background:
          'radial-gradient(120% 90% at 50% -10%, #18241c 0%, #0e150f 45%, #0a0f0c 100%)',
      }}
    >
      {/* Cinematic misty-valley backdrop the whole site floats on */}
      <SceneryBackground />

      <ScrollProgress />
      <Nav />

      <main id="top" className="relative z-10 overflow-x-hidden">
        <Hero />
        <StatStrip />
        <ThePlace />
        <WhyMungaru />
        <TheStay />
        <Amenities />
        <Explore />
        <Gallery />
        <Book />
      </main>

      <Footer />
    </div>
  );
}
