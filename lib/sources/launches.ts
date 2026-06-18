// Launch Calendar — The Space Devs / Launch Library 2 (no auth).
import { cached, fetchJSON } from "@/lib/cache";

export type Launch = {
  id: string;
  name: string;
  status: string;
  statusAbbrev: string;
  net: string; // ISO launch time (No Earlier Than)
  provider: string;
  rocket: string;
  mission: string | null;
  pad: string;
  location: string;
  image: string | null;
  webcastLive: boolean;
};

const BASE = "https://ll.thespacedevs.com/2.2.0";

type LL2Launch = {
  id: string;
  name: string;
  status: { name: string; abbrev: string };
  net: string;
  webcast_live: boolean;
  image: string | null;
  launch_service_provider: { name: string } | null;
  rocket: { configuration: { full_name: string } | null } | null;
  mission: { description: string | null } | null;
  pad: { name: string; location: { name: string } | null } | null;
};

function normalize(l: LL2Launch): Launch {
  return {
    id: l.id,
    name: l.name,
    status: l.status?.name ?? "Unknown",
    statusAbbrev: l.status?.abbrev ?? "TBD",
    net: l.net,
    provider: l.launch_service_provider?.name ?? "Unknown",
    rocket: l.rocket?.configuration?.full_name ?? l.name,
    mission: l.mission?.description ?? null,
    pad: l.pad?.name ?? "—",
    location: l.pad?.location?.name ?? "—",
    image: l.image,
    webcastLive: Boolean(l.webcast_live),
  };
}

export async function getUpcomingLaunches(limit = 20): Promise<Launch[]> {
  return cached(`launches:upcoming:${limit}`, 600, async () => {
    const data = await fetchJSON<{ results: LL2Launch[] }>(
      `${BASE}/launch/upcoming/?limit=${limit}&mode=detailed`,
      { revalidate: 600 }
    );
    return (data.results ?? []).map(normalize);
  });
}
