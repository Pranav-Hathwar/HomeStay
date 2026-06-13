// Core Web Vitals reporting. Dynamically imported so web-vitals lands in its own
// tiny chunk, off the critical path. Swap `console.log` for a beacon to your
// analytics endpoint when you have one.
type Metric = { name: string; value: number; rating: string };

function report(metric: Metric) {
  // eslint-disable-next-line no-console
  console.log(`[web-vitals] ${metric.name}: ${Math.round(metric.value)} (${metric.rating})`);
}

export function reportWebVitals() {
  import('web-vitals').then(({ onCLS, onLCP, onINP, onTTFB, onFCP }) => {
    onCLS(report);
    onLCP(report);
    onINP(report); // replaces the deprecated FID metric
    onTTFB(report);
    onFCP(report);
  });
}
