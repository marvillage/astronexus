# AstroNexus — Architecture

## Tech Stack (recommended)

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js (App Router)** | SSR for SEO on news/landing, API routes, one deploy |
| Language | **TypeScript** | Type safety across API contracts |
| Styling | **Tailwind CSS** + shadcn/ui | Fast, consistent space-themed UI |
| Auth | **Supabase Auth** (or Clerk) | Email + OAuth out of the box |
| Database | **Supabase Postgres** | Users, watchlists, alert configs, cached data |
| Caching | **Redis (Upstash)** | Cache agency API responses, rate-limit |
| Jobs/Cron | **Vercel Cron** / Supabase Edge Functions | Poll APIs, evaluate alert rules, send digests |
| Billing | **Stripe** | Subscriptions, tier gating |
| Notifications | **Resend** (email), **web-push**, **Twilio** (SMS) | Multi-channel alerts |
| Maps/Viz | **Leaflet/MapLibre**, **Recharts**, **react-globe.gl** | ISS map, aurora map, charts, 3D globe |
| Hosting | **Vercel** | Zero-config Next.js + cron |

## High-level data flow

```
Public Space APIs (NASA, NOAA, Celestrak, Launch Library, Spaceflight News)
        │  (scheduled polling via cron jobs)
        ▼
   Ingestion layer  ──►  Redis cache  ──►  Postgres (normalized, alert state)
        │                                        │
        ▼                                        ▼
   Alert engine (evaluate user thresholds)   Next.js API routes
        │                                        │
        ▼                                        ▼
   Notification dispatch                     React dashboard (SSR/CSR)
   (email / push / SMS / webhook)
```

## Key design notes

- **Never call agency APIs directly from the browser.** Proxy + cache server-side to respect rate limits and hide keys.
- **Cache aggressively.** Most data updates on the order of minutes (weather) to hours (launches). Set per-source TTLs.
- **Alert engine is cron-driven:** poll → diff against last state → match user rules → enqueue notifications.
- **Tier gating** enforced in API middleware (check subscription before serving premium endpoints/alerts).
- **Public API** is the same internal data, exposed with API-key auth + rate limiting.

## Suggested folder structure

```
astronexus/
├── app/                  # Next.js routes (pages + API)
│   ├── (marketing)/      # landing, pricing
│   ├── (app)/            # dashboard, modules (auth-gated)
│   └── api/              # internal + public API routes
├── lib/
│   ├── sources/          # one client per data source
│   ├── alerts/           # rule evaluation + dispatch
│   └── db/               # Supabase/Prisma client, schema
├── components/           # UI components
├── jobs/                 # cron job handlers
└── docs/
```
