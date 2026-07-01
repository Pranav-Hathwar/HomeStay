import { useSyncExternalStore } from 'react';

// Phones + small tablets. Matches the `lg:` breakpoint the layout already uses
// to switch between the rich desktop treatment and the lighter mobile one.
const QUERY = '(max-width: 1023px)';

function subscribe(cb: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}

/**
 * True on phone/tablet-width screens. SSR-safe: returns false on the server and
 * during hydration, then syncs to the real value — so heavy, GPU-hungry effects
 * (Lenis smooth-scroll, backdrop blur, animated fog, scroll parallax) can be
 * switched off on mobile where they cause scroll jank.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
