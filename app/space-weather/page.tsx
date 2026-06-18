import { getSpaceWeather } from "@/lib/sources/spaceWeather";
import { PageHeader } from "@/components/PageHeader";
import { SunHero } from "@/components/visuals/SunHero";
import { fmtNumber, fmtDate } from "@/lib/format";

export const revalidate = 300;

function KpGauge({ kp }: { kp: number }) {
  const pct = Math.min(kp / 9, 1) * 100;
  const color = kp >= 7 ? "#f87171" : kp >= 5 ? "#fbbf24" : "#34d399";
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 327} 327`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{fmtNumber(kp, 1)}</span>
          <span className="text-xs uppercase tracking-wide text-slate-500">Kp-index</span>
        </div>
      </div>
    </div>
  );
}

export default async function SpaceWeatherPage() {
  let sw;
  try {
    sw = await getSpaceWeather();
  } catch {
    return (
      <div>
        <PageHeader icon="🌞" title="Space Weather Center" subtitle="Solar and geomagnetic activity." />
        <p className="card p-8 text-center text-slate-400">Space weather data is temporarily unavailable.</p>
      </div>
    );
  }

  const max = Math.max(...sw.kpSeries.map((s) => s.kp), 9);

  return (
    <div>
      <SunHero
        kp={fmtNumber(sw.kpNow, 1)}
        windSpeed={fmtNumber(sw.solarWindSpeed, 0)}
        scale={sw.kpScale}
        aurora={sw.auroraChance}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card flex flex-col items-center justify-center gap-3 p-6">
          <KpGauge kp={sw.kpNow} />
          <div className="text-center">
            <div className="text-lg font-semibold text-white">{sw.kpScale}</div>
            <div className="text-sm text-slate-400">Geomagnetic conditions</div>
          </div>
        </div>

        <div className="card flex flex-col justify-center gap-4 p-6">
          <Metric label="Solar wind speed" value={`${fmtNumber(sw.solarWindSpeed, 0)} km/s`} />
          <Metric label="Solar wind density" value={`${fmtNumber(sw.solarWindDensity, 1)} p/cm³`} />
          <Metric
            label="Aurora chance"
            value={sw.auroraChance}
            highlight={sw.auroraChance === "High" || sw.auroraChance === "Very High"}
          />
          <p className="text-xs text-slate-600">Updated {fmtDate(sw.updated)}</p>
        </div>

        <div className="card relative flex flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center">
          <div className="aurora-band" aria-hidden />
          <div className="aurora-band" aria-hidden />
          <div className="anim-float relative text-5xl">{sw.auroraChance === "Low" ? "🌌" : "✨"}</div>
          <div className="relative text-lg font-semibold text-white">Will I see aurora tonight?</div>
          <p className="relative text-sm text-slate-400">
            At Kp {fmtNumber(sw.kpNow, 1)}, aurora visibility is{" "}
            <span className="text-aurora">{sw.auroraChance.toLowerCase()}</span> at high latitudes.
            Set a custom Kp alert to get notified.
          </p>
        </div>
      </div>

      <div className="card mt-5 p-6">
        <h3 className="mb-4 font-semibold text-white">Kp-index — last {sw.kpSeries.length} readings</h3>
        <div className="flex h-40 items-end gap-1">
          {sw.kpSeries.map((s) => {
            const h = (s.kp / max) * 100;
            const color = s.kp >= 7 ? "bg-red-400" : s.kp >= 5 ? "bg-solar" : "bg-aurora";
            return (
              <div
                key={s.time}
                className={`flex-1 rounded-t ${color}`}
                style={{ height: `${Math.max(h, 4)}%` }}
                title={`${s.time}: Kp ${s.kp}`}
              />
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-600">Storm threshold (G1) begins at Kp 5.</p>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-lg ${highlight ? "text-aurora" : "text-white"}`}>{value}</span>
    </div>
  );
}
