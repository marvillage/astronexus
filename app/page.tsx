import Link from "next/link";

const pillars = [
  { icon: "🌞", title: "Space Weather", desc: "Solar flares, geomagnetic storms, Kp-index & aurora forecasts.", href: "/space-weather" },
  { icon: "☄️", title: "Near-Earth Objects", desc: "Asteroid close-approach tracking and a hazard risk dashboard.", href: "/asteroids" },
  { icon: "🛰️", title: "Satellite Tracking", desc: "Live ISS position and pass predictions for your location.", href: "/satellites" },
  { icon: "🚀", title: "Launch Calendar", desc: "Upcoming rocket launches with live countdowns and status.", href: "/launches" },
  { icon: "📰", title: "Space News", desc: "Aggregated space science news and mission developments.", href: "/news" },
  { icon: "🪐", title: "Exoplanet Explorer", desc: "Searchable catalog with Earth-similarity habitability scoring.", href: "/exoplanets" },
];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="pt-12 text-center sm:pt-20">
        <span className="inline-block rounded-full border border-nebula/30 bg-nebula/10 px-4 py-1 text-sm text-nebula-light">
          The unified space intelligence platform
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          Everything happening{" "}
          <span className="bg-gradient-to-r from-nebula-light via-comet to-aurora bg-clip-text text-transparent">
            above us
          </span>
          , in one dashboard.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Live space weather, asteroid threats, satellite passes, rocket launches, and breaking
          space science news from ISRO, NASA, ESA &amp; SpaceX. Stop checking 8 agency websites.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-nebula px-6 py-3 font-semibold text-white transition hover:bg-nebula-light"
          >
            Open the dashboard →
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
          >
            View pricing
          </Link>
        </div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} className="card card-hover p-6">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Personalized, location-aware alerts</h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-400">
          Get notified when the Kp-index crosses your aurora threshold, when the ISS passes
          overhead, or before a launch you’re tracking — across in-app, email, push and SMS.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-xl bg-nebula px-6 py-3 font-semibold text-white transition hover:bg-nebula-light"
        >
          See plans
        </Link>
      </section>
    </div>
  );
}
