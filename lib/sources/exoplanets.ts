// Exoplanet Explorer — NASA Exoplanet Archive TAP service (no auth).
import { cached, fetchJSON } from "@/lib/cache";

export type Exoplanet = {
  name: string;
  hostStar: string;
  discYear: number | null;
  discMethod: string | null;
  radiusEarth: number | null; // in Earth radii
  massEarth: number | null; // in Earth masses
  orbitalPeriodDays: number | null;
  distanceLy: number | null;
  eqTempK: number | null;
  habitability: number; // 0-100 Earth-similarity score
};

type TAPRow = {
  pl_name: string;
  hostname: string;
  disc_year: number | null;
  discoverymethod: string | null;
  pl_rade: number | null; // Earth radii
  pl_bmasse: number | null; // Earth masses
  pl_orbper: number | null;
  sy_dist: number | null; // parsecs
  pl_eqt: number | null; // Kelvin
};

// Earth Similarity Index-style score: closer to Earth radius (1) and an
// equilibrium temperature near 255 K (Earth's) scores higher. 0-100.
function habitabilityScore(radiusEarth: number | null, eqTempK: number | null): number {
  let score = 0;
  let weight = 0;
  if (radiusEarth != null && radiusEarth > 0) {
    const r = 1 - Math.min(1, Math.abs(radiusEarth - 1) / 1.5);
    score += r;
    weight += 1;
  }
  if (eqTempK != null && eqTempK > 0) {
    const t = 1 - Math.min(1, Math.abs(eqTempK - 255) / 255);
    score += t;
    weight += 1;
  }
  if (weight === 0) return 0;
  return Math.round((score / weight) * 100);
}

const PARSEC_TO_LY = 3.26156;

export async function getExoplanets(search?: string, limit = 60): Promise<Exoplanet[]> {
  const q = search?.trim().replace(/'/g, "''");
  const key = `exoplanets:${limit}:${q ?? ""}`;
  return cached(key, 86400, async () => {
    const cols =
      "pl_name,hostname,disc_year,discoverymethod,pl_rade,pl_bmasse,pl_orbper,sy_dist,pl_eqt";
    const where = q
      ? `where (upper(pl_name) like upper('%${q}%') or upper(hostname) like upper('%${q}%')) and default_flag=1`
      : "where default_flag=1 and pl_rade is not null";
    const adql = `select top ${limit} ${cols} from ps ${where} order by disc_year desc`;
    const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(
      adql
    )}&format=json`;
    const rows = await fetchJSON<TAPRow[]>(url, { revalidate: 86400 });
    return (rows ?? []).map((r) => ({
      name: r.pl_name,
      hostStar: r.hostname,
      discYear: r.disc_year,
      discMethod: r.discoverymethod,
      radiusEarth: r.pl_rade,
      massEarth: r.pl_bmasse,
      orbitalPeriodDays: r.pl_orbper,
      distanceLy: r.sy_dist != null ? r.sy_dist * PARSEC_TO_LY : null,
      eqTempK: r.pl_eqt,
      habitability: habitabilityScore(r.pl_rade, r.pl_eqt),
    }));
  });
}
