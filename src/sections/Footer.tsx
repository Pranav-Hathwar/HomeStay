import { Instagram, MessageCircle, Map, MapPin, Mail, Phone } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { siteConfig, whatsappUrl } from '../data/site';

const NAV = [
  { label: 'The Place', href: '#the-place' },
  { label: 'The Stay', href: '#the-stay' },
  { label: 'Explore', href: '#explore' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/40 bg-ink/40 py-14 text-dim backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8">
        <div>
          <a
            href="#top"
            className="inline-block transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Mungaru Home Stay"
          >
            <BrandLogo className="h-24 w-auto sm:h-28" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A private Malnad cottage in the coffee country of Mudigere, with misty mornings, green
            views, and the slow rhythm of the first monsoon rain.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-fog">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-fog">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-fog">Find us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
              <span>
                {siteConfig.address}
                <br />
                <span className="text-faint">
                  {siteConfig.coordsLabel} | {siteConfig.coordsDMS}
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-bright" />
              <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-fog">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-bright" />
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-fog">
                {siteConfig.email}
              </a>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-fog transition hover:border-gold/50 hover:text-gold-bright"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-fog transition hover:border-gold/50 hover:text-gold-bright"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open in Google Maps"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-fog transition hover:border-gold/50 hover:text-gold-bright"
            >
              <Map className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-line/30 px-4 pt-6 text-xs text-faint lg:px-8">
        Copyright {new Date().getFullYear()} Mungaru Homestays | Gowdahalli Horati, Mudigere |
        Made for slow monsoon mornings.
      </div>
    </footer>
  );
}
