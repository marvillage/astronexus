# 🚀 AstroNexus

**The unified space intelligence platform.**
Space weather alerts, near-Earth object tracking, live satellite passes, and a real-time feed of space science news and upcoming launches from ISRO, NASA, ESA, SpaceX and more — in one dashboard.

> A SaaS for space enthusiasts, astrophotographers, educators, satellite operators, and researchers.

---

## What it is

AstroNexus pulls live data from public space agencies and science APIs, normalizes it, and presents it through a single subscription dashboard with personalized alerts. Free tier for casual users; paid tiers unlock SMS/push alerts, a public API, and team integrations.

## Core pillars

| Pillar | Description |
|--------|-------------|
| 🌞 **Space Weather** | Solar flares, geomagnetic storms, Kp-index, aurora forecasts |
| ☄️ **Near-Earth Objects** | Asteroid close-approach tracking and risk dashboard |
| 🛰️ **Satellite Tracking** | Live ISS / Starlink / custom satellite passes for your location |
| 🚀 **Launch Calendar** | Upcoming rocket launches with countdowns and live status |
| 📰 **Space News** | Aggregated space science news and mission developments |
| 🪐 **Exoplanet Explorer** | Searchable catalog with habitability scoring |

## Documentation

- [Feature Documentation](./docs/FEATURES.md) — full feature breakdown, data sources, tiers
- [Architecture](./docs/ARCHITECTURE.md) — tech stack and system design
- [API Reference](./docs/API.md) — public API endpoints

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: add a free NASA_API_KEY to avoid DEMO_KEY rate limits
npm run dev                  # http://localhost:3000
```

Build / run production:

```bash
npm run build && npm start
```

## Status

🛠️ **MVP live** — Next.js (App Router) + TypeScript + Tailwind. All six dashboards
plus the daily APOD highlight are implemented against live public space APIs,
proxied and cached server-side.

| Module | Route | Data source | Status |
|--------|-------|-------------|--------|
| Mission Control dashboard | `/dashboard` | aggregate | ✅ |
| Space Weather Center | `/space-weather` | NOAA SWPC | ✅ |
| NEO Tracker | `/asteroids` | NASA NeoWs | ✅ |
| Satellite & ISS Tracker | `/satellites` | wheretheiss.at | ✅ live ISS (passes need N2YO key) |
| Launch Calendar | `/launches` | Launch Library 2 | ✅ |
| Space News | `/news` | Spaceflight News API | ✅ |
| Exoplanet Explorer | `/exoplanets` | NASA Exoplanet Archive | ✅ |
| Picture of the Day | dashboard | NASA APOD | ✅ |
| Pricing | `/pricing` | — | ✅ |
| Public JSON API | `/api/*` | proxy + cache | ✅ |

**Not yet implemented** (need external accounts/keys — see roadmap in
[FEATURES.md](./docs/FEATURES.md) §7): auth & accounts (Supabase/Clerk),
Postgres persistence, the alert engine + notifications (email/push/SMS/webhook),
Stripe billing & tier gating, and satellite pass predictions (N2YO).
