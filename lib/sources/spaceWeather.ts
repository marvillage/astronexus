// Space Weather — NOAA SWPC products (no auth).
import { cached, fetchJSON } from "@/lib/cache";

export type SpaceWeather = {
  kpNow: number;
  kpScale: string; // G-scale label derived from Kp
  kpSeries: { time: string; kp: number }[];
  solarWindSpeed: number | null; // km/s
  solarWindDensity: number | null; // p/cm^3
  auroraChance: "Low" | "Moderate" | "High" | "Very High";
  updated: string;
};

function kpToScale(kp: number): string {
  if (kp >= 9) return "G5 — Extreme";
  if (kp >= 8) return "G4 — Severe";
  if (kp >= 7) return "G3 — Strong";
  if (kp >= 6) return "G2 — Moderate";
  if (kp >= 5) return "G1 — Minor";
  return "G0 — Quiet";
}

function auroraChance(kp: number): SpaceWeather["auroraChance"] {
  if (kp >= 7) return "Very High";
  if (kp >= 5) return "High";
  if (kp >= 4) return "Moderate";
  return "Low";
}

export async function getSpaceWeather(): Promise<SpaceWeather> {
  return cached("space-weather", 300, async () => {
    // Planetary K-index: array of { time_tag, Kp, a_running, station_count }.
    const kpRaw = await fetchJSON<{ time_tag: string; Kp: number }[]>(
      "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
      { revalidate: 300 }
    );
    const kpSeries = kpRaw
      .map((r) => ({ time: r.time_tag, kp: Number(r.Kp) }))
      .filter((r) => Number.isFinite(r.kp))
      .slice(-24);
    const kpNow = kpSeries.length ? kpSeries[kpSeries.length - 1].kp : 0;

    let solarWindSpeed: number | null = null;
    let solarWindDensity: number | null = null;
    try {
      // Real-time solar wind plasma: [time, density, speed, temperature]; row 0 header.
      const plasma = await fetchJSON<string[][]>(
        "https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json",
        { revalidate: 300 }
      );
      const last = plasma[plasma.length - 1];
      if (last) {
        solarWindDensity = Number(last[1]) || null;
        solarWindSpeed = Number(last[2]) || null;
      }
    } catch {
      // Plasma feed is occasionally unavailable; Kp is the primary signal.
    }

    return {
      kpNow,
      kpScale: kpToScale(kpNow),
      kpSeries,
      solarWindSpeed,
      solarWindDensity,
      auroraChance: auroraChance(kpNow),
      updated: kpSeries.length ? kpSeries[kpSeries.length - 1].time : new Date().toISOString(),
    };
  });
}
