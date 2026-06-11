import { useState } from 'react';
import { Home, Users, ParkingCircle, Mountain, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { siteConfig, whatsappUrl, bookingMessage } from '../data/site';

const PERKS = [
  { icon: Home, text: 'Entire home — booked as a whole, no shared spaces' },
  { icon: Users, text: 'Sleeps 8–10 across the hall, room & lounge' },
  { icon: ParkingCircle, text: 'Free parking & generator power backup' },
  { icon: Mountain, text: 'Trek guidance to nearby peaks on request' },
];

const GUEST_OPTIONS = ['2 Guests', '4 Guests', '6 Guests', '8 Guests', '10 Guests'];

export default function Book() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(GUEST_OPTIONS[2]);
  const [error, setError] = useState('');

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

    const url = whatsappUrl(bookingMessage(checkIn, checkOut, guests));
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="book" className="relative overflow-hidden border-y border-line/40 bg-forest/30 backdrop-blur-md py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.35em] text-gold-bright">Book</p>
            <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight text-fog md:text-5xl">
              Check availability.
            </h2>
            <p className="mt-4 max-w-md text-dim">
              Send your dates straight to us on WhatsApp, or book the listing on Airbnb — whichever
              you prefer.
            </p>
            <ul className="mt-8 space-y-4">
              {PERKS.map((p) => (
                <li key={p.text} className="flex items-start gap-3 text-dim">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-card/70 text-gold-bright">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-fog">{p.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-line/60 bg-card/90 p-6 shadow-glow backdrop-blur md:p-8"
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

              {error && (
                <p role="alert" className="mt-4 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-gold/15 px-5 py-3.5 text-sm font-semibold text-gold-bright transition hover:bg-gold/25"
              >
                Check Availability on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

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
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
