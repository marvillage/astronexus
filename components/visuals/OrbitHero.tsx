// Animated Earth + Moon orbit with drifting asteroids — hero for the NEO page.
// Pure CSS animation (see globals.css).

export function OrbitHero({
  tracked,
  hazardous,
  closest,
}: {
  tracked: number;
  hazardous: number;
  closest: string;
}) {
  // Asteroids placed around the inner orbit at fixed angles.
  const rocks = [0, 55, 120, 175, 230, 300];

  return (
    <div className="anim-fade-up relative mb-6 overflow-hidden rounded-2xl border border-nebula/20 bg-gradient-to-br from-[#0c0717] via-space-900 to-space-950 p-6 sm:p-8">
      <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-md">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
            ☄️ Near-Earth Object Tracker
          </h1>
          <p className="mt-2 text-slate-300">
            Asteroids passing close to Earth over the next 7 days — sorted by miss distance, with
            potentially hazardous objects flagged.
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <Badge label="Tracked" value={String(tracked)} color="text-white" />
            <Badge
              label="Hazardous"
              value={String(hazardous)}
              color={hazardous > 0 ? "text-red-300" : "text-slate-300"}
            />
            <Badge label="Closest" value={closest} color="text-comet" />
          </div>
        </div>

        {/* Orbit system */}
        <div className="relative h-44 w-44 shrink-0 sm:h-52 sm:w-52">
          {/* outer (asteroid) ring */}
          <div className="orbit-ring orbit-spin absolute inset-0">
            {rocks.map((deg, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 text-base"
                style={{
                  transform: `rotate(${deg}deg) translateY(-${88}px) rotate(-${deg}deg)`,
                }}
              >
                🪨
              </span>
            ))}
          </div>
          {/* inner (moon / lunar distance) ring */}
          <div className="orbit-ring orbit-spin-2 absolute inset-10">
            <span
              className="absolute left-1/2 top-1/2 text-sm"
              style={{ transform: "rotate(0deg) translateY(-54px)" }}
            >
              🌕
            </span>
          </div>
          {/* Earth */}
          <div className="earth-core absolute inset-[38%] rounded-full" />
        </div>
      </div>
      <p className="relative mt-4 text-xs text-slate-500">
        Inner dashed ring ≈ the Moon’s orbit (1 lunar distance). Source: NASA NeoWs.
      </p>
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
