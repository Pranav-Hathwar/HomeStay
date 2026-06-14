import { useEffect, useState } from 'react';

/**
 * Returns false on the server and the first client paint, then true once the
 * browser is idle. Use it to defer expensive, purely-decorative layers (heavy
 * blurs, blended fog) so they don't inflate the initial paint / LCP — they fade
 * in a beat after the page is interactive.
 */
export function useAfterPaint(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    }).requestIdleCallback;

    if (ric) {
      const id = ric(() => setReady(true), { timeout: 800 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => clearTimeout(id);
  }, []);

  return ready;
}
