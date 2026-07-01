import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import SceneryBackground from './components/SceneryBackground';
import StickyBookBar from './components/StickyBookBar';
import { useIsMobile } from './hooks/useIsMobile';

// Deferred: not needed for first paint — split into their own chunks.
const ChatWidget = lazy(() => import('./components/ChatWidget'));
import Hero from './sections/Hero';
import StatStrip from './sections/StatStrip';
import ThePlace from './sections/ThePlace';
import WhyMungaru from './sections/WhyMungaru';
import TheStay from './sections/TheStay';
import Amenities from './sections/Amenities';
import Explore from './sections/Explore';
import Nearby from './sections/Nearby';
import Weather from './sections/Weather';
import Gallery from './sections/Gallery';
import Reviews from './sections/Reviews';
import Book from './sections/Book';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

export default function App() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  // Smooth scrolling — desktop only. On phones, native scrolling is already
  // smooth and Lenis' rAF hijack fights touch momentum, causing the jank.
  useEffect(() => {
    if (reduce || isMobile) return;
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
  }, [reduce, isMobile]);

  return (
    <div
      className="relative min-h-screen text-fog"
      style={{
        background:
          'radial-gradient(120% 90% at 50% -10%, #18241c 0%, #0e150f 45%, #0a0f0c 100%)',
      }}
    >
      {/* Skip link for keyboard users */}
      <a
        href="#top"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:border focus-visible:border-gold/70 focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-gold-bright"
      >
        Skip to content
      </a>

      {/* Cinematic misty-valley backdrop the whole site floats on */}
      <SceneryBackground />

      {/* Film-grain texture overlay — desktop only. The soft-light blend forces
          a full-viewport repaint every scroll frame, which is costly on phones. */}
      <div className="grain pointer-events-none fixed inset-0 z-[5] hidden lg:block" aria-hidden="true" />

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
        <Nearby />
        <Weather />
        <Gallery />
        <Reviews />
        <Book />
        <Faq />
      </main>

      <Footer />
      <StickyBookBar />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
