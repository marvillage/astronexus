import { getNeoFeed, type Neo } from "@/lib/sources/neo";
import { OrbitHero } from "@/components/visuals/OrbitHero";
import { fmtNumber, fmtDate } from "@/lib/format";

export const revalidate = 1800;

export default async function AsteroidsPage() {
  let neos: Neo[];
  try {
    neos = await getNeoFeed();
  } catch {
    neos = [];
  }

  const hazardous = neos.filter((n) => n.hazardous).length;
  const closest = neos[0];

  return (
    <div>
      <OrbitHero
        tracked={neos.length}
        hazardous={hazardous}
        closest={closest ? `${fmtNumber(closest.missDistanceLunar, 1)} LD` : "—"}
      />

      {neos.length === 0 ? (
        <p className="card p-8 text-center text-slate-400">NEO data is temporarily unavailable.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-space-800/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Object</th>
                <th className="px-4 py-3">Close approach</th>
                <th className="px-4 py-3">Diameter (m)</th>
                <th className="px-4 py-3">Velocity (km/h)</th>
                <th className="px-4 py-3">Miss distance</th>
                <th className="px-4 py-3">Hazard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {neos.map((n) => (
                <tr key={n.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <a href={n.url} target="_blank" rel="noreferrer" className="font-medium text-comet hover:underline">
                      {n.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{fmtDate(n.closeApproach)}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {fmtNumber(n.diameterMinM)}–{fmtNumber(n.diameterMaxM)}
                  </td>
                  <td className="px-4 py-3 tabular-nums">{fmtNumber(n.velocityKmh)}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {fmtNumber(n.missDistanceLunar, 1)} LD
                    <span className="ml-1 text-xs text-slate-500">
                      ({fmtNumber(n.missDistanceKm)} km)
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {n.hazardous ? (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-300">
                        ⚠️ Hazardous
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Safe</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-slate-600">LD = Lunar Distance (~384,400 km).</p>
    </div>
  );
}
