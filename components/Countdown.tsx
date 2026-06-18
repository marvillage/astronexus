"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = target - Date.now();
  const past = ms <= 0;
  const abs = Math.abs(ms);
  return {
    past,
    d: Math.floor(abs / 86400000),
    h: Math.floor((abs / 3600000) % 24),
    m: Math.floor((abs / 60000) % 60),
    s: Math.floor((abs / 1000) % 60),
  };
}

export function Countdown({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (isNaN(target)) return <span className="text-slate-500">TBD</span>;

  const pad = (n: number) => String(n).padStart(2, "0");
  const label = t.past ? "T+ " : "T- ";

  if (compact) {
    return (
      <span className="font-mono text-sm tabular-nums text-comet">
        {label}
        {t.d > 0 && `${t.d}d `}
        {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
      </span>
    );
  }

  const cells = [
    { v: t.d, l: "days" },
    { v: t.h, l: "hrs" },
    { v: t.m, l: "min" },
    { v: t.s, l: "sec" },
  ];
  return (
    <div className="flex gap-2">
      {cells.map((c) => (
        <div key={c.l} className="min-w-[3.5rem] rounded-lg bg-space-800 px-2 py-1.5 text-center">
          <div className="font-mono text-xl font-bold tabular-nums text-comet">{pad(c.v)}</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">{c.l}</div>
        </div>
      ))}
    </div>
  );
}
