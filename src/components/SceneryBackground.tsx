import { motion, useReducedMotion } from 'framer-motion';
import scenery from '../assets/mudigere5.webp';
import { useAfterPaint } from '../hooks/useAfterPaint';

/**
 * The cinematic backdrop the whole site sits on: a real misty Malnad valley
 * photograph, fixed behind everything, with a slow Ken-Burns drift and soft fog
 * banks rolling across it (clouds passing the hills). Graded dark-green for
 * depth and text contrast. Static under prefers-reduced-motion.
 */
export default function SceneryBackground() {
  const reduce = useReducedMotion();
  const ready = useAfterPaint();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* misty valley photo — slow continuous Ken-Burns */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${scenery})`, willChange: 'transform' }}
        initial={false}
        animate={
          reduce
            ? { scale: 1.04 }
            : { scale: [1.04, 1.11, 1.04], x: ['-1.2%', '1.2%', '-1.2%'], y: ['0%', '-2%', '0%'] }
        }
        transition={reduce ? undefined : { duration: 64, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* fog banks drifting across the hills (visible cloud motion) — deferred
          past first paint so their heavy blur doesn't inflate LCP */}
      {ready &&
        !reduce &&
        [0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-y-0 -left-1/3 w-2/3"
            style={{
              background:
                'radial-gradient(45% 60% at 50% 45%, rgba(230,238,234,0.24) 0%, rgba(206,222,214,0.08) 45%, rgba(10,15,12,0) 72%)',
              filter: 'blur(36px)',
              willChange: 'transform, opacity',
            }}
            animate={{ x: ['-30%', '160%'], opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              duration: 48 + i * 16,
              delay: -i * 18,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.15, 0.85, 1],
            }}
          />
        ))}

      {/* low rising ground mist (deferred past first paint) */}
      {ready && (
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            'linear-gradient(180deg, rgba(220,232,226,0) 0%, rgba(220,232,226,0.16) 60%, rgba(220,232,226,0.05) 100%)',
          filter: 'blur(24px)',
          willChange: 'transform, opacity',
        }}
        animate={reduce ? undefined : { y: ['6%', '-4%', '6%'], opacity: [0.5, 0.85, 0.5] }}
        transition={reduce ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      )}

      {/* colour grade + readability veil — kept lighter so the photo stays clear */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,12,0.6),rgba(12,20,15,0.36)_42%,rgba(10,15,12,0.82))]" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ background: 'radial-gradient(120% 95% at 50% 28%, rgba(26,44,33,0.18), rgba(10,15,12,0.6))' }}
      />
    </div>
  );
}
