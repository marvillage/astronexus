// Near-Earth Objects — NASA NeoWs feed (NASA key, DEMO_KEY fallback).
import { cached, fetchJSON, NASA_KEY } from "@/lib/cache";

export type Neo = {
  id: string;
  name: string;
  hazardous: boolean;
  diameterMinM: number;
  diameterMaxM: number;
  velocityKmh: number;
  missDistanceKm: number;
  missDistanceLunar: number;
  closeApproach: string;
  url: string;
};

type NeoWsObject = {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: { meters: { estimated_diameter_min: number; estimated_diameter_max: number } };
  close_approach_data: {
    close_approach_date_full: string;
    relative_velocity: { kilometers_per_hour: string };
    miss_distance: { kilometers: string; lunar: string };
  }[];
};

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getNeoFeed(): Promise<Neo[]> {
  return cached("neo:feed", 1800, async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 6 * 86400000); // NeoWs caps the range at 7 days
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${isoDate(start)}&end_date=${isoDate(
      end
    )}&api_key=${NASA_KEY}`;
    const data = await fetchJSON<{ near_earth_objects: Record<string, NeoWsObject[]> }>(url, {
      revalidate: 1800,
    });

    const all: Neo[] = [];
    for (const objs of Object.values(data.near_earth_objects)) {
      for (const o of objs) {
        const ca = o.close_approach_data[0];
        if (!ca) continue;
        all.push({
          id: o.id,
          name: o.name.replace(/[()]/g, "").trim(),
          hazardous: o.is_potentially_hazardous_asteroid,
          diameterMinM: o.estimated_diameter.meters.estimated_diameter_min,
          diameterMaxM: o.estimated_diameter.meters.estimated_diameter_max,
          velocityKmh: Number(ca.relative_velocity.kilometers_per_hour),
          missDistanceKm: Number(ca.miss_distance.kilometers),
          missDistanceLunar: Number(ca.miss_distance.lunar),
          closeApproach: ca.close_approach_date_full,
          url: o.nasa_jpl_url,
        });
      }
    }
    return all.sort((a, b) => a.missDistanceKm - b.missDistanceKm);
  });
}
