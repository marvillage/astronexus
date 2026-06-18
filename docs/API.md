# AstroNexus — API Reference

The MVP exposes read-only JSON endpoints that proxy and cache the upstream
agency APIs server-side (keys are never exposed to the browser). These are the
foundation for the planned authenticated **Public API** product (API keys +
rate limiting + webhooks — see [FEATURES.md](./FEATURES.md) §3).

Base URL (local): `http://localhost:3000`

| Endpoint | Description | Cache TTL | Params |
|----------|-------------|-----------|--------|
| `GET /api/launches` | Upcoming orbital launches | 10 min | `limit` (1–50) |
| `GET /api/news` | Latest space news articles | 5 min | `limit` (1–50), `search` |
| `GET /api/apod` | Astronomy Picture of the Day | 60 min | — |
| `GET /api/space-weather` | Kp-index, solar wind, aurora chance | 5 min | — |
| `GET /api/asteroids` | Near-Earth objects (next 7 days) | 30 min | — |
| `GET /api/iss` | Live ISS position | none (live) | — |
| `GET /api/exoplanets` | Confirmed exoplanets + habitability | 24 h | `search`, `limit` (1–200) |

All endpoints return `{ count, results }` (collections) or the object directly
(`/api/apod`, `/api/space-weather`, `/api/iss`). On upstream failure they return
HTTP `502` with `{ "error": "Upstream unavailable" }`; cached data is served
when available.

### Examples

```bash
curl "http://localhost:3000/api/launches?limit=5"
curl "http://localhost:3000/api/news?search=ISRO"
curl "http://localhost:3000/api/exoplanets?search=TRAPPIST"
curl "http://localhost:3000/api/space-weather"
```

### Upstream data sources

| Endpoint | Upstream | Auth |
|----------|----------|------|
| launches | The Space Devs — Launch Library 2 | none |
| news | Spaceflight News API v4 | none |
| apod | NASA APOD | NASA key (DEMO_KEY fallback) |
| space-weather | NOAA SWPC products | none |
| asteroids | NASA NeoWs | NASA key (DEMO_KEY fallback) |
| iss | wheretheiss.at | none |
| exoplanets | NASA Exoplanet Archive (TAP) | none |

> Set `NASA_API_KEY` in `.env.local` to avoid DEMO_KEY rate limits
> (free key at https://api.nasa.gov).

### Planned (not yet implemented)

- API-key auth, per-key rate limiting, usage dashboard
- Webhooks: launch status change, new NEO, geomagnetic storm onset
- Tier gating in middleware (Free / Pro / Team)
