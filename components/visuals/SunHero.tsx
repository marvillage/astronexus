// Animated Sun + solar-wind hero banner for the Space Weather page.
// Pure CSS animation (see globals.css) — no client JS needed.

export function SunHero({
  kp,
  windSpeed,
  scale,
  aurora,
}: {
  kp: string;
  windSpeed: string;
  scale: string;
  aurora: string;
}) {
  // Deterministic-ish solar-wind streaks (no Math.random — SSR safe).
  const streaks = Array.from({ length: 14 }, (_, i) => ({
    top: 8 + ((i * 37) % 84),
    width: 40 + ((i * 53) % 90),
    delay: (i * 0.6) % 6,
    duration: 3 + ((i * 7) % 5),
  }));

  return (
    <div className="anim-fade-up relative mb-6 overflow-hidden rounded-2xl border border-solar/20 bg-gradient-to-br from-[#1a0f02] via-space-900 to-space-950 p-6 sm:p-8">
      {/* solar wind streaming across */}
      <div className="solar-wind pointer-events-none absolute inset-0">
        {streaks.map((s, i) => (
          <span
            key={i}
            style={{
              top: `${s.top}%`,
              width: `${s.width}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-md">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
            🌞 Space Weather Center
          </h1>
          <p className="mt-2 text-slate-300">
            Real-time solar and geomagnetic activity. Conditions are{" "}
            <span className="font-semibold text-solar">{scale}</span> with{" "}
            <span className="font-semibold text-aurora">{aurora.toLowerCase()}</span> aurora chance.
          </p>
          <div className="mt-4 flex gap-5">
            <Badge label="Kp-index" value={kp} color="text-solar" />
            <Badge label="Solar wind" value={`${windSpeed} km/s`} color="text-comet" />
          </div>
        </div>

        {/* The Sun */}
        <div className="relative h-40 w-40 shrink-0 sm:h-48 sm:w-48">
          <div className="sun-corona anim-spin-slow absolute inset-0 rounded-full" />
          <div className="sun-core absolute inset-6 rounded-full" />
          {/* a couple of looping flares */}
          <div className="anim-spin-rev absolute inset-0">
            <span className="absolute left-1/2 top-1 -translate-x-1/2 text-lg">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className={`font-mono text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
