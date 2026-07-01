// Live weather via Open-Meteo (https://open-meteo.com) — free, no API key,
// CORS-enabled, so it works from this static site with a plain client fetch.
// Attribution is required (CC-BY 4.0) and shown in the Weather section.
import {
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Sun,
  type LucideIcon,
} from 'lucide-react';

export type CurrentWeather = {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  code: number;
  isDay: boolean;
  time: string; // location-local ISO, e.g. "2026-07-02T14:30"
};

export type DailyWeather = {
  date: string; // "YYYY-MM-DD" in the location's timezone
  code: number;
  max: number;
  min: number;
  precip: number; // max precipitation probability, %
};

export type WeatherData = { current: CurrentWeather; daily: DailyWeather[] };

/** Map a WMO weather-interpretation code to a label + Lucide icon. */
export function describeWeather(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: 'Clear sky', Icon: Sun };
  if (code === 1) return { label: 'Mainly clear', Icon: CloudSun };
  if (code === 2) return { label: 'Partly cloudy', Icon: CloudSun };
  if (code === 3) return { label: 'Overcast', Icon: Cloudy };
  if (code === 45 || code === 48) return { label: 'Fog', Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', Icon: CloudDrizzle };
  if (code >= 61 && code <= 67) return { label: 'Rain', Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Snow', Icon: CloudSnow };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', Icon: CloudRain };
  if (code === 85 || code === 86) return { label: 'Snow showers', Icon: CloudSnow };
  if (code >= 95) return { label: 'Thunderstorm', Icon: CloudLightning };
  return { label: 'Cloudy', Icon: Cloudy };
}

/** Fetch current conditions + a 7-day daily forecast for a coordinate. */
export async function fetchWeather(lat: number, lon: number, signal?: AbortSignal): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`Weather API responded ${res.status}`);
  const j = await res.json();
  const c = j.current;
  const d = j.daily;

  return {
    current: {
      temp: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      wind: c.wind_speed_10m,
      code: c.weather_code,
      isDay: c.is_day === 1,
      time: c.time,
    },
    daily: (d.time as string[]).map((date, i) => ({
      date,
      code: d.weather_code[i],
      max: d.temperature_2m_max[i],
      min: d.temperature_2m_min[i],
      precip: d.precipitation_probability_max[i] ?? 0,
    })),
  };
}
