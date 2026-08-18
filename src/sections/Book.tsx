import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Users, ParkingCircle, Mountain, MessageCircle, ExternalLink, ArrowRight, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Section from '../components/Section';
import { siteConfig, whatsappUrl, bookingMessage } from '../data/site';

const PERKS = [
  { icon: Home, text: 'Entire home — booked as a whole, no shared spaces' },
  { icon: Users, text: 'Sleeps 8–10 across the hall, room & lounge' },
  { icon: ParkingCircle, text: 'Free parking & generator power backup' },
  { icon: Mountain, text: 'Trek guidance to nearby peaks on request' },
];

const GUEST_OPTIONS = [
  '1 Guest', '2 Guests', '3 Guests', '4 Guests',
  '5 Guests', '6 Guests', '7 Guests', '8 Guests', '9 Guests',
  '10–12 Guests (large group)',
];

const PRICING_TIERS = [
  { guests: '1 – 4 guests', price: '₹6,000', note: 'flat rate' },
  { guests: '5 guests',     price: '₹6,800', note: '₹6,000 + ₹800' },
  { guests: '6 guests',     price: '₹7,600', note: '₹6,000 + ₹1,600' },
  { guests: '7 guests',     price: '₹8,400', note: '₹6,000 + ₹2,400' },
  { guests: '8 guests',     price: '₹9,200', note: '₹6,000 + ₹3,200' },
  { guests: '9 guests',     price: '₹10,000', note: '₹6,000 + ₹4,000' },
  { guests: '10 – 12 guests', price: 'Contact Arjun', note: 'group rate' },
];

export default function Book() {
  const [checkIn, setCheckIn]   = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests]     = useState(GUEST_OPTIONS[3]);
  const [error, setError]       = useState('');

  const today = new Date().toISOString().split('T')[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!checkIn || !checkOut) {
      setError('Please choose both a check-in and check-out date.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.');
      return;
    }
    window.open(whatsappUrl(bookingMessage(checkIn, checkOut, guests)), '_blank', 'noopener,noreferrer');
  }

  return (
    <Section id="book" tone="band" divider containerClassName="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <Parallax distance={28}>
        <Reveal>
          <p className="eyebrow">Book</p>
          <h2 className="mt-3 text-balance font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
            Check availability.
          </h2>
          <p className="mt-4 max-w-md text-dim">
            Send your dates straight to us on WhatsApp, or book the listing on Airbnb — whichever
            you prefer.
          </p>
          <ul className="mt-8 space-y-4">
            {PERKS.map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-card/70 text-gold-bright">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-fog">{p.text}</span>
              </li>
            ))}
          </ul>

          {/* Pricing — subtle, no borders or heavy weight */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-dim/70">Pricing per night</p>
            <div className="mt-3 divide-y divide-line/20">
              {PRICING_TIERS.map((t) => (
                <div key={t.guests} className="flex items-baseline justify-between py-2">
                  <span className="text-sm text-dim">{t.guests}</span>
                  <span className="flex items-baseline gap-2">
                    <span className={`text-sm font-medium ${t.price === 'Contact Arjun' ? 'text-gold-bright/80' : 'text-fog'}`}>
                      {t.price}
                    </span>
                    <span className="text-[0.68rem] text-faint">{t.note}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[0.68rem] leading-relaxed text-faint">
              Base rate ₹6,000 covers 1–4 guests. Each additional guest above 4 is ₹800/head.
              Groups of 10–12 contact Arjun directly for a group rate.
            </p>
          </div>
        </Reveal>
      </Parallax>

      <Reveal delay={0.1}>
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="rounded-card-lg border border-line/60 bg-card/90 p-6 shadow-glow backdrop-blur md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="checkin" className="mb-2 block text-xs uppercase tracking-[0.2em] text-dim">
                Check-in
              </label>
              <input
                id="checkin"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-2xl border border-line/60 bg-moss/50 p-3.5 text-fog outline-none transition focus:border-gold/60 [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="checkout" className="mb-2 block text-xs uppercase tracking-[0.2em] text-dim">
                Check-out
              </label>
              <input
                id="checkout"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-2xl border border-line/60 bg-moss/50 p-3.5 text-fog outline-none transition focus:border-gold/60 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="guests" className="mb-2 block text-xs uppercase tracking-[0.2em] text-dim">
              Guests
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-2xl border border-line/60 bg-moss/50 p-3.5 text-fog outline-none transition focus:border-gold/60 [color-scheme:dark]"
            >
              {GUEST_OPTIONS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                layout
                role="alert"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden text-sm text-red-300"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            layout
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold/15 px-5 py-3.5 text-sm font-semibold text-gold-bright transition hover:bg-gold/25"
          >
            Check Availability on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line/60 px-4 py-3 text-center text-sm text-fog transition hover:bg-white/5"
            >
              Book on Airbnb <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line/60 px-4 py-3 text-center text-sm text-fog transition hover:bg-white/5"
            >
              WhatsApp <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          {/* Direct call strip */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line/40 bg-moss/30 p-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <Phone className="h-4 w-4 text-gold-bright" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-dim">Call or WhatsApp directly</p>
              <a href={`tel:${siteConfig.phone}`} className="text-sm font-semibold text-fog transition-colors hover:text-gold-bright">
                {siteConfig.phone}
              </a>
              <span className="ml-2 text-xs text-gold-bright/70">{siteConfig.phoneName}</span>
            </div>
          </div>
        </motion.form>
      </Reveal>
    </Section>
  );
}
