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
      <section className="relative pt-12 text-center sm:pt-20">
        <div className="anim-float-slow pointer-events-none absolute -right-4 top-0 text-6xl opacity-70 sm:right-8 sm:text-8xl">
          🪐
        </div>
        <div
          className="anim-float pointer-events-none absolute left-2 top-24 text-4xl opacity-50 sm:left-10 sm:text-5xl"
          style={{ animationDelay: "1.2s" }}
        >
          🛰️
        </div>
        <span className="inline-block rounded-full border border-nebula/30 bg-nebula/10 px-4 py-1 text-sm text-nebula-light">
          The unified space intelligence platform
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          Everything happening{" "}
          <span className="anim-gradient bg-gradient-to-r from-nebula-light via-comet to-aurora bg-clip-text text-transparent">
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
            href="/launches"
            className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
          >
            See upcoming launches
          </Link>
        </div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className="card card-hover anim-fade-up p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="anim-float text-4xl" style={{ animationDelay: `${i * 0.4}s` }}>
                {p.icon}
              </div>
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
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-nebula px-6 py-3 font-semibold text-white transition hover:bg-nebula-light"
        >
          Explore the dashboard
        </Link>
      </section>
    </div>
  );
}
