import { useEffect, useState, type ComponentType } from 'react';
import {
  Droplets,
  Wind,
  Thermometer,
  RefreshCw,
  MapPin,
  Moon,
  CloudMoon,
} from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { ORIGIN } from '../data/site';
import { fetchWeather, describeWeather, type WeatherData } from '../data/weather';

const [LAT, LON] = ORIGIN.split(',').map(Number);

function dayLabel(date: string, i: number): string {
  if (i === 0) return 'Today';
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short' });
}

type IconType = ComponentType<{ className?: string }>;

function Metric({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-4 w-4 text-gold-bright" />
      <span className="font-display text-lg text-fog">{value}</span>
      <span className="text-[0.7rem] uppercase tracking-[0.15em] text-dim">{label}</span>
    </div>
  );
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setStatus('loading');
    fetchWeather(LAT, LON, ctrl.signal)
      .then((d) => {
        setData(d);
        setStatus('ok');
      })
      .catch((e: unknown) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) setStatus('error');
      });
    return () => ctrl.abort();
  }, [reloadKey]);

  return (
    <Section id="weather" tone="band" divider>
      <SectionHeading
        eyebrow="Live Weather"
        title="The valley, day by day."
        intro="Real-time conditions and the week ahead at 906 m — so you can pack for the mist, the sun, or the first monsoon rain."
      />

      {status === 'loading' && (
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_2fr]">
          <div className="card h-60 animate-pulse" />
          <div className="card h-60 animate-pulse" />
        </div>
      )}

      {status === 'error' && (
        <div className="mt-10 card p-8 text-center">
          <p className="text-dim">Live weather is unavailable right now.</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-4 inline-flex items-center gap-2 rounded-pill border border-gold/60 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      )}

      {status === 'ok' && data && (
        <Reveal className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr] lg:items-stretch">
            {/* Current conditions */}
            {(() => {
              const c = data.current;
              const { label, Icon } = describeWeather(c.code);
              const NightIcon = c.code <= 1 ? Moon : c.code === 2 ? CloudMoon : Icon;
              const CurrentIcon: IconType = c.isDay ? Icon : NightIcon;
              return (
                <div className="card flex flex-col justify-between p-6 sm:p-7">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold-bright">
                    <MapPin className="h-3.5 w-3.5" /> Now · Mudigere
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <CurrentIcon className="h-16 w-16 shrink-0 text-gold-bright" />
                    <div>
                      <div className="font-display text-6xl leading-none text-fog">{Math.round(c.temp)}°</div>
                      <div className="mt-1.5 text-dim">{label}</div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line/40 pt-5">
                    <Metric icon={Thermometer} label="Feels" value={`${Math.round(c.feelsLike)}°`} />
                    <Metric icon={Droplets} label="Humidity" value={`${Math.round(c.humidity)}%`} />
                    <Metric icon={Wind} label="Wind" value={`${Math.round(c.wind)}`} />
                  </div>
                </div>
              );
            })()}

            {/* 7-day forecast */}
            <div className="card flex flex-col p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between px-1">
                <h3 className="font-display text-lg text-fog">7-day forecast</h3>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-faint">High · Low</span>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {data.daily.map((day, i) => {
                  const { Icon, label } = describeWeather(day.code);
                  return (
                    <div
                      key={day.date}
                      className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-line/40 bg-ink/30 px-2 py-3.5 text-center"
                      title={label}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gold-bright">
                        {dayLabel(day.date, i)}
                      </span>
                      <Icon className="h-7 w-7 text-fog" />
                      <div className="text-sm">
                        <span className="font-semibold text-fog">{Math.round(day.max)}°</span>{' '}
                        <span className="text-dim">{Math.round(day.min)}°</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[0.7rem] text-dim">
                        <Droplets className="h-3 w-3 text-gold-bright/80" />
                        {day.precip}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-faint">
            Live data from{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-gold-bright"
            >
              Open-Meteo
            </a>
            {' · '}updated {data.current.time.split('T')[1]} local · wind in km/h
          </p>
        </Reveal>
      )}
    </Section>
  );
}
