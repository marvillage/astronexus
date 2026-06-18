export function fmtNumber(n: number | null | undefined, digits = 0): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function timeAgo(iso: string): string {
  const d = new Date(iso).getTime();
  const secs = Math.round((Date.now() - d) / 1000);
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
  ];
  let val = secs;
  let unit = "s";
  for (const [div, u] of units) {
    if (val < div) {
      unit = u;
      break;
    }
    val = Math.floor(val / div);
    unit = u;
  }
  return `${val}${unit} ago`;
}
