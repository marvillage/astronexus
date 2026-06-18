"use client";

import { useEffect, useRef, useState } from "react";
import type { Exoplanet } from "@/lib/sources/exoplanets";
import { fmtNumber } from "@/lib/format";

function HabBar({ score }: { score: number }) {
  const color = score >= 70 ? "bg-aurora" : score >= 40 ? "bg-solar" : "bg-slate-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-space-800">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-8 text-xs tabular-nums text-slate-400">{score}</span>
    </div>
  );
}

export function ExoplanetExplorer({ initial }: { initial: Exoplanet[] }) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<Exoplanet[]>(initial);
  const [loading, setLoading] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = query.trim()
          ? `/api/exoplanets?search=${encodeURIComponent(query)}`
          : "/api/exoplanets";
        const res = await fetch(url);
        const data = await res.json();
        setRows(data.results ?? []);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(debounce.current);
  }, [query]);

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by planet or host star (e.g. Kepler, TRAPPIST, Proxima)…"
        className="w-full rounded-xl border border-nebula/20 bg-space-900 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-nebula/60"
      />

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-space-800/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Planet</th>
              <th className="px-4 py-3">Host star</th>
              <th className="px-4 py-3">Radius (R⊕)</th>
              <th className="px-4 py-3">Mass (M⊕)</th>
              <th className="px-4 py-3">Distance (ly)</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Habitability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((p) => (
              <tr key={p.name} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                <td className="px-4 py-3 text-slate-300">{p.hostStar}</td>
                <td className="px-4 py-3 tabular-nums">{fmtNumber(p.radiusEarth, 2)}</td>
                <td className="px-4 py-3 tabular-nums">{fmtNumber(p.massEarth, 2)}</td>
                <td className="px-4 py-3 tabular-nums">{fmtNumber(p.distanceLy, 1)}</td>
                <td className="px-4 py-3 tabular-nums text-slate-400">{p.discYear ?? "—"}</td>
                <td className="px-4 py-3">
                  <HabBar score={p.habitability} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  {loading ? "Searching the archive…" : "No matching exoplanets."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        {loading ? "Loading…" : `${rows.length} planets`} · Habitability = Earth-similarity from
        radius &amp; equilibrium temperature
      </p>
    </div>
  );
}
