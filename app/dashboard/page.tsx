import Link from "next/link";
import { getApod } from "@/lib/sources/apod";
import { getUpcomingLaunches } from "@/lib/sources/launches";
import { getSpaceWeather } from "@/lib/sources/spaceWeather";
import { getNeoFeed } from "@/lib/sources/neo";
import { getNews } from "@/lib/sources/news";
import { Countdown } from "@/components/Countdown";
import { fmtNumber, fmtDate, timeAgo } from "@/lib/format";

export const revalidate = 300;

async function safe<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const [apod, launches, sw, neos, news] = await Promise.all([
    safe(getApod()),
    safe(getUpcomingLaunches(3)),
    safe(getSpaceWeather()),
    safe(getNeoFeed()),
    safe(getNews(4)),
  ]);

  const nextLaunch = launches?.[0];
  const closest = neos?.[0];
  const hazardous = neos?.filter((n) => n.hazardous).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Mission Control</h1>
        <p className="text-slate-400">Your unified view of everything happening above us.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* APOD */}
        <Card title="🌌 Picture of the Day" href={null} className="lg:row-span-2">
          {apod ? (
            <div className="flex h-full flex-col">
              {apod.mediaType === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={apod.url} alt={apod.title} className="h-56 w-full rounded-lg object-cover" />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-lg bg-space-800 text-slate-400">
                  🎬 Video — view on NASA
                </div>
              )}
              <h3 className="mt-3 font-semibold text-white">{apod.title}</h3>
              <p className="mt-1 line-clamp-5 text-sm text-slate-400">{apod.explanation}</p>
              {apod.copyright && (
                <p className="mt-auto pt-2 text-xs text-slate-600">© {apod.copyright}</p>
              )}
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        {/* Next launch */}
        <Card title="🚀 Next Launch" href="/launches">
          {nextLaunch ? (
            <div>
              <h3 className="font-semibold text-white">{nextLaunch.name}</h3>
              <p className="text-sm text-slate-400">{nextLaunch.provider}</p>
              <p className="mb-3 text-xs text-slate-500">{fmtDate(nextLaunch.net)}</p>
              <Countdown iso={nextLaunch.net} />
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        {/* Space weather */}
        <Card title="🌞 Space Weather" href="/space-weather">
          {sw ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-white">{fmtNumber(sw.kpNow, 1)}</div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Kp-index</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-aurora">{sw.kpScale}</div>
                <div className="text-sm text-slate-400">Aurora: {sw.auroraChance}</div>
                <div className="text-xs text-slate-500">
                  Wind {fmtNumber(sw.solarWindSpeed, 0)} km/s
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        {/* NEO */}
        <Card title="☄️ Near-Earth Objects" href="/asteroids">
          {closest ? (
            <div>
              <p className="text-sm text-slate-400">
                <span className="text-2xl font-bold text-white">{neos!.length}</span> objects ·{" "}
                <span className={hazardous ? "text-red-300" : "text-slate-400"}>
                  {hazardous} hazardous
                </span>
              </p>
              <div className="mt-3 rounded-lg bg-space-800 p-3">
                <div className="text-xs text-slate-500">Closest approach</div>
                <div className="font-medium text-comet">{closest.name}</div>
                <div className="text-sm text-slate-400">
                  {fmtNumber(closest.missDistanceLunar, 1)} LD · {fmtDate(closest.closeApproach)}
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </Card>

        {/* ISS link card */}
        <Card title="🛰️ Live Satellites" href="/satellites">
          <p className="text-sm text-slate-400">
            Track the ISS in real time as it orbits at ~28,000 km/h, plus pass predictions for your
            location.
          </p>
          <Link
            href="/satellites"
            className="mt-3 inline-block rounded-lg bg-nebula/20 px-3 py-1.5 text-sm text-nebula-light hover:bg-nebula/30"
          >
            Open live tracker →
          </Link>
        </Card>

        {/* News */}
        <Card title="📰 Latest Space News" href="/news" className="lg:col-span-2">
          {news && news.length > 0 ? (
            <ul className="space-y-3">
              {news.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3"
                  >
                    <span className="line-clamp-1 text-sm text-slate-200 group-hover:text-white">
                      {a.title}
                    </span>
                    <span className="shrink-0 text-xs text-slate-500">{timeAgo(a.publishedAt)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  children,
  className = "",
}: {
  title: string;
  href: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">{title}</h2>
        {href && (
          <Link href={href} className="text-xs text-nebula-light hover:underline">
            View all →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function Empty() {
  return <p className="py-6 text-center text-sm text-slate-500">Temporarily unavailable.</p>;
}
