import type { ReactNode } from 'react';
import Reveal from './Reveal';
import Parallax from './Parallax';

/**
 * Unified section heading: gold eyebrow + display title + optional intro.
 * Centralizes the type scale and the eyebrow/heading rhythm so every section
 * reads the same. Keeps the site's signature Reveal + Parallax motion.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  parallax = true,
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  /** Adds the subtle editorial parallax drift on the heading block. */
  parallax?: boolean;
  className?: string;
}) {
  const centered = align === 'center';

  const inner = (
    <Reveal className={[centered ? 'mx-auto text-center' : '', 'max-w-2xl', className].filter(Boolean).join(' ')}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-dim md:text-lg">{intro}</p>}
    </Reveal>
  );

  return parallax ? <Parallax distance={36}>{inner}</Parallax> : inner;
}
