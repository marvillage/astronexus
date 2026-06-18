"use client";

import { useEffect, useState } from "react";
import type { IssPosition } from "@/lib/sources/satellites";
import { fmtNumber } from "@/lib/format";

// Equirectangular projection of lat/lon onto a 0-100% box.
function project(lat: number, lon: number) {
  return { x: ((lon + 180) / 360) * 100, y: ((90 - lat) / 180) * 100 };
}

export function IssTracker({ initial }: { initial: IssPosition | null }) {
  const [pos, setPos] = useState<IssPosition | null>(initial);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    async function tick() {
      try {
        const res = await fetch("/api/iss", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = (await res.json()) as IssPosition;
        if (alive) {
          setPos(data);
          setError(false);
        }
      } catch {
        if (alive) setError(true);
      }
    }
    const id = setInterval(tick, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const p = pos ? project(pos.latitude, pos.longitude) : null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-nebula/20 bg-space-900">
        {/* Simple lat/lon grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,92,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,255,0.25) 1px, transparent 1px)",
            backgroundSize: "8.33% 16.66%",
          }}
        />
        <div className="absolute left-1/2 top-0 h-full w-px bg-comet/30" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-comet/30" />
        {p && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transition: "all 1s linear" }}
            title="International Space Station"
          >
            🛰️
          </div>
        )}
        <div className="absolute bottom-2 left-2 text-[10px] text-slate-500">
          Equirectangular · updates every 5s {error && "· reconnecting…"}
        </div>
      </div>

      {pos && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Latitude" value={`${fmtNumber(pos.latitude, 2)}°`} />
          <Stat label="Longitude" value={`${fmtNumber(pos.longitude, 2)}°`} />
          <Stat label="Altitude" value={`${fmtNumber(pos.altitudeKm, 0)} km`} />
          <Stat label="Velocity" value={`${fmtNumber(pos.velocityKmh, 0)} km/h`} />
        </div>
      )}
      <p className="text-sm text-slate-400">
        Visibility: <span className="text-aurora">{pos?.visibility ?? "—"}</span>
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="font-mono text-lg text-comet">{value}</div>
    </div>
  );
}
