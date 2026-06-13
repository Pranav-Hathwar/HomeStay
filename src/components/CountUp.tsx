import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Counts the first number inside `value` up from zero when it scrolls into
 * view, preserving any surrounding text. e.g. "~9 km" counts 0→9 and keeps the
 * "~" and " km"; "8–10" counts to 8 and keeps "–10". Static under reduced
 * motion (renders the final value immediately).
 */
export default function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.6 });

  const match = value.match(/(\d[\d,]*)/);
  const target = match ? Number(match[1].replace(/,/g, '')) : 0;
  const prefix = match ? value.slice(0, match.index) : '';
  const suffix = match ? value.slice(match.index! + match[0].length) : value;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (match && inView && !reduce) mv.set(target);
  }, [inView, reduce, target, match, mv]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (numRef.current) numRef.current.textContent = String(Math.round(v));
    });
  }, [spring]);

  if (!match) return <span>{value}</span>;

  // Render a constant value (0, or the target under reduced motion) so React's
  // reconciler never overwrites the number the spring is imperatively driving.
  return (
    <span ref={wrapRef}>
      {prefix}
      <span ref={numRef}>{reduce ? target : 0}</span>
      {suffix}
    </span>
  );
}
