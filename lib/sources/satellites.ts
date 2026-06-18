// Satellite & ISS Tracker — wheretheiss.at live position (no auth).
// Pass predictions require an N2YO key; surfaced as a future enhancement.
import { cached, fetchJSON } from "@/lib/cache";

export type IssPosition = {
  latitude: number;
  longitude: number;
  altitudeKm: number;
  velocityKmh: number;
  visibility: string;
  timestamp: number;
};

export async function getIssPosition(): Promise<IssPosition> {
  // Short TTL: position changes fast (~7.66 km/s).
  return cached("iss:position", 5, async () => {
    const data = await fetchJSON<{
      latitude: number;
      longitude: number;
      altitude: number;
      velocity: number;
      visibility: string;
      timestamp: number;
    }>("https://api.wheretheiss.at/v1/satellites/25544", { revalidate: 0, cache: "no-store" });
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      altitudeKm: data.altitude,
      velocityKmh: data.velocity,
      visibility: data.visibility,
      timestamp: data.timestamp,
    };
  });
}
