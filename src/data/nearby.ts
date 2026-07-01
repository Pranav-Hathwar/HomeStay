// Real neighbourhood data sourced from OpenStreetMap (Overpass) around the
// homestay at 13.04369, 75.61125. Distances are km-as-the-crow-flies and
// bearings are degrees from the homestay (0 = North). Easy to edit by hand.

export type PlaceKind = 'city' | 'town' | 'village' | 'hamlet';
export type Place = { name: string; kind: PlaceKind; dist: number; bearing: number; coords: string };

export type PoiKind = 'hospital' | 'hotel' | 'liquor' | 'restaurant';
export type Poi = {
  name: string;
  note: string;
  kind: PoiKind;
  dist: number;
  bearing: number;
  coords: string;
  /** Optional degrees to fan the pin off its true bearing so pins that share a
   *  direction (e.g. everything toward Mudigere) don't stack on the map. */
  nudge?: number;
};

/** Cities, towns and villages near the homestay (bigger place = bigger symbol). */
export const NEARBY_PLACES: Place[] = [
  { name: 'Gowdahalli', kind: 'village', dist: 1.4, bearing: 264, coords: '13.04224,75.5982' },
  { name: 'Hemmadi', kind: 'hamlet', dist: 2.3, bearing: 244, coords: '13.03465,75.59243' },
  { name: 'Billuru', kind: 'village', dist: 3.6, bearing: 327, coords: '13.07093,75.59328' },
  { name: 'Hosakere', kind: 'village', dist: 5.4, bearing: 196, coords: '12.99721,75.59793' },
  { name: 'Hirimande', kind: 'hamlet', dist: 5.7, bearing: 144, coords: '13.00215,75.64271' },
  { name: 'Kogaravalli', kind: 'village', dist: 5.7, bearing: 115, coords: '13.02247,75.65868' },
  { name: 'Devaladakere', kind: 'village', dist: 6.1, bearing: 133, coords: '13.00607,75.6525' },
  { name: 'Maragunda', kind: 'hamlet', dist: 6.4, bearing: 172, coords: '12.98701,75.61922' },
  { name: 'Mudigere', kind: 'town', dist: 10.5, bearing: 18, coords: '13.13333,75.64192' },
  { name: 'Sakleshpur', kind: 'town', dist: 22, bearing: 120, coords: '12.94343,75.78623' },
  { name: 'Belur', kind: 'town', dist: 30.4, bearing: 64, coords: '13.16457,75.86349' },
  { name: 'Chikkamagaluru', kind: 'city', dist: 35.2, bearing: 30, coords: '13.31801,75.77387' },
];

/** Nearest essentials, closest first. Liquor isn't tagged in OSM out here, so
 *  it points at Mudigere town — the closest place with retail liquor. */
export const NEARBY_POIS: Poi[] = [
  { name: 'Grand Rock Garden', note: 'Krishnapura · restaurant', kind: 'restaurant', dist: 7.9, bearing: 20, nudge: 15, coords: '13.11037,75.6359' },
  { name: 'Liquor shops', note: 'Mudigere town', kind: 'liquor', dist: 10.5, bearing: 18, nudge: -15, coords: '13.13333,75.64192' },
  { name: 'Kumar Hotel', note: 'nearest hotel', kind: 'hotel', dist: 21.7, bearing: 152, coords: '12.87149,75.70643' },
  { name: 'Government Hospital', note: 'Sakleshpur', kind: 'hospital', dist: 22, bearing: 121, coords: '12.94112,75.7847' },
];

/** Furthest point on the map; sets the radial scale. */
export const MAX_DIST = 35.2;
/** Marker radii as a % of the map's half-size. MIN_R keeps a clear ring around
 *  the centre so the cluster of near villages has room to breathe. */
const MIN_R = 8;
const MAX_R = 42;

function radiusFor(dist: number): number {
  const t = Math.sqrt(Math.min(dist, MAX_DIST) / MAX_DIST); // 0..1, sqrt-spread
  return MIN_R + (MAX_R - MIN_R) * t;
}

/** Project a (bearing, distance) to an x/y percentage on the square map.
 *  `offset` nudges a point radially outward (used to lift POI pins off the
 *  town markers they share a location with). */
export function project(bearing: number, dist: number, offset = 0): { x: number; y: number } {
  const r = radiusFor(dist) + offset;
  const a = (bearing * Math.PI) / 180;
  return { x: 50 + r * Math.sin(a), y: 50 - r * Math.cos(a) };
}

/** Radius (in the 0–100 map space) of the ring for a given distance in km. */
export function ringRadius(km: number): number {
  return radiusFor(km);
}
