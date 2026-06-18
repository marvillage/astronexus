import { getUpcomingLaunches, type Launch } from "@/lib/sources/launches";
import { PageHeader } from "@/components/PageHeader";
import { Countdown } from "@/components/Countdown";
import { fmtDate } from "@/lib/format";

export const revalidate = 600;

function StatusBadge({ status, abbrev }: { status: string; abbrev: string }) {
  const map: Record<string, string> = {
    Go: "bg-aurora/20 text-aurora",
    TBC: "bg-solar/20 text-solar",
    TBD: "bg-slate-500/20 text-slate-300",
    Success: "bg-aurora/20 text-aurora",
    Hold: "bg-solar/20 text-solar",
    "In Flight": "bg-comet/20 text-comet",
    Failure: "bg-red-500/20 text-red-300",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${map[abbrev] ?? "bg-slate-500/20 text-slate-300"}`}>
      {status}
    </span>
  );
}

export default async function LaunchesPage() {
  let launches: Launch[];
  try {
    launches = await getUpcomingLaunches(20);
  } catch {
    launches = [];
  }

  return (
    <div>
      <PageHeader
        icon="🚀"
        title="Launch Calendar"
        subtitle="Upcoming orbital launches worldwide with live countdowns."
        source="The Space Devs · Launch Library 2"
      />

      {launches.length === 0 ? (
        <p className="card p-8 text-center text-slate-400">
          Launch feed is temporarily unavailable (upstream rate limit). Try again shortly.
        </p>
      ) : (
        <div className="space-y-4">
          {launches.map((l) => (
            <div key={l.id} className="card card-hover flex flex-col gap-4 p-5 md:flex-row">
              {l.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={l.image}
                  alt=""
                  className="h-32 w-full rounded-lg object-cover md:w-48"
                  loading="lazy"
                />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{l.name}</h3>
                  <StatusBadge status={l.status} abbrev={l.statusAbbrev} />
                  {l.webcastLive && (
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-300">
                      ● LIVE
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {l.provider} · {l.rocket}
                </p>
                <p className="text-sm text-slate-500">
                  {l.location} · {fmtDate(l.net)}
                </p>
                {l.mission && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{l.mission}</p>
                )}
              </div>
              <div className="flex items-center md:items-start">
                <Countdown iso={l.net} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
