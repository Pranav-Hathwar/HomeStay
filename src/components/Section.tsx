import type { ReactNode } from 'react';

type Tone = 'transparent' | 'band';

/**
 * Standard section shell — one source of truth for vertical rhythm, container
 * width, horizontal padding and the optional tinted "band" background used to
 * alternate sections. Keeps every section's spacing and dividers consistent.
 */
export default function Section({
  id,
  children,
  tone = 'transparent',
  divider = false,
  width = 'default',
  className = '',
  containerClassName = '',
}: {
  id?: string;
  children: ReactNode;
  /** `band` adds the frosted forest tint used for alternating sections. */
  tone?: Tone;
  /** Adds a hairline top + bottom border. */
  divider?: boolean;
  /** `narrow` (max-w-3xl) for reading columns like FAQ; default is max-w-7xl. */
  width?: 'default' | 'narrow';
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={[
        'relative overflow-hidden py-20 lg:py-28',
        tone === 'band' ? 'bg-forest/30 backdrop-blur-md' : '',
        divider ? 'border-y border-line/40' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'relative mx-auto px-4 lg:px-8',
          width === 'narrow' ? 'max-w-3xl' : 'max-w-7xl',
          containerClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </section>
  );
}
