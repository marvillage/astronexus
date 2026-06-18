# AstroNexus — Feature Documentation

This document defines the product features, data sources, user tiers, and roadmap for AstroNexus, a unified space intelligence SaaS platform.

---

## 1. Product Overview

**Vision:** One dashboard for everything happening above us — live space weather, asteroid threats, satellite passes, rocket launches, and breaking space science news from the world's space agencies.

**Target users:**
- 🔭 Astrophotographers & amateur astronomers
- 🎓 Educators and students
- 🛰️ Satellite/comms operators & ham radio operators
- 📡 Space enthusiasts following ISRO, NASA, ESA, SpaceX
- 🧑‍🔬 Researchers needing quick data access

**Value proposition:** Stop checking 8 different agency websites. Get personalized, location-aware alerts and a single live feed.

---

## 2. Feature Modules

### 2.1 🌞 Space Weather Center
Real-time solar and geomagnetic activity monitoring.

- **Live dashboard:** Kp-index gauge, solar wind speed, X-ray flux, sunspot count
- **Solar flare log:** recent flares (C/M/X class) with timestamps and intensity
- **Geomagnetic storm tracker:** current and forecasted G-scale storm levels
- **Aurora forecast:** probability map + "will I see aurora tonight?" for the user's location
- **Alerts:** notify when Kp exceeds a user-set threshold (great for aurora chasers)

**Data sources:** NOAA SWPC, NASA DONKI

---

### 2.2 ☄️ Near-Earth Object (NEO) Tracker
Asteroid and comet close-approach monitoring.

- **Close-approach feed:** objects passing within a set distance, sorted by date
- **Risk dashboard:** size, velocity, miss distance, potential hazard flag
- **Detail view:** orbit diagram, discovery info, next approaches
- **Alerts:** notify on newly listed potentially hazardous objects

**Data sources:** NASA NeoWs (Near-Earth Object Web Service)

---

### 2.3 🛰️ Satellite & ISS Tracker
Live overhead tracking and pass prediction.

- **Live map:** real-time position of ISS and selected satellites
- **Pass predictions:** next visible passes for the user's location (time, direction, elevation, brightness)
- **Watchlist:** track custom satellites by NORAD ID (Starlink, Hubble, etc.)
- **Alerts:** "ISS passes overhead in 10 minutes" push notification

**Data sources:** Celestrak (TLE data), N2YO API

---

### 2.4 🚀 Launch Calendar
Upcoming and recent orbital launches worldwide.

- **Launch feed:** chronological list with provider (ISRO, NASA, SpaceX, ESA, Roscosmos, CNSA…)
- **Countdown timers:** live T-minus to next launch
- **Launch detail:** rocket, payload, mission description, launch site, live stream link
- **Filters:** by agency (e.g., show only ISRO), by rocket, by status
- **Status updates:** Go / Hold / Scrubbed / Success / Failure
- **Alerts:** reminders before a launch you're tracking; agency-specific subscriptions

**Data sources:** Launch Library 2 (The Space Devs)

---

### 2.5 📰 Space News & Developments Feed
Aggregated space science news and mission milestones.

- **Unified feed:** breaking news, mission updates, discoveries, agency press
- **Source tagging:** ISRO, NASA, ESA, SpaceX, science journals
- **Topic filters:** Mars, Moon/Artemis, exoplanets, Chandrayaan/Gaganyaan, telescopes (JWST), etc.
- **Daily digest:** opt-in email summary of the day's top space stories
- **Bookmarks:** save articles to read later
- **Trending:** most-read stories of the week

**Data sources:** Spaceflight News API, NASA news feeds, agency RSS

---

### 2.6 🪐 Exoplanet Explorer
Searchable catalog of confirmed exoplanets.

- **Search & filter:** by mass, radius, distance, star type, discovery year
- **Habitability score:** computed metric for Earth-similarity / habitable-zone
- **Comparison tool:** compare planets side by side
- **Detail view:** host star info, orbital data, discovery method
- **Data export:** CSV/JSON (paid tiers)

**Data sources:** NASA Exoplanet Archive

---

### 2.7 🌌 Astronomy Picture & Daily Highlight
- **APOD widget:** NASA Astronomy Picture of the Day with explanation
- **Today in space:** historical space events on this date

**Data sources:** NASA APOD API

---

## 3. Platform Features (cross-cutting)

### Accounts & Personalization
- Email/OAuth sign-up (Google, GitHub)
- Saved location for all location-aware features
- Personal watchlists (satellites, launches, asteroids)
- Notification preferences per module

### Alerts & Notifications
- **Channels:** in-app, email, push (web), SMS (premium), Slack/Discord webhook (team)
- **Custom thresholds:** e.g., alert when Kp ≥ 6, or asteroid miss distance < 1 LD
- **Scheduled digests:** daily / weekly summaries

### Public API (product)
- REST API exposing normalized data across modules
- API keys, rate limiting, usage dashboard
- Webhooks for events (launch status change, new NEO, storm onset)

### Dashboards & Widgets
- Customizable home dashboard (drag-and-drop module cards)
- Embeddable widgets (launch countdown, ISS tracker) for blogs/sites

---

## 4. Subscription Tiers

| Feature | **Free** | **Pro** | **Team / API** |
|---------|:--------:|:-------:|:--------------:|
| All dashboards (web) | ✅ | ✅ | ✅ |
| In-app + email alerts | ✅ | ✅ | ✅ |
| Custom alert thresholds | 1 | Unlimited | Unlimited |
| Push notifications | — | ✅ | ✅ |
| SMS alerts | — | ✅ | ✅ |
| Daily/weekly digests | — | ✅ | ✅ |
| Data export (CSV/JSON) | — | ✅ | ✅ |
| Public API access | — | Limited | Full + higher rate |
| Webhooks | — | — | ✅ |
| Slack/Discord integration | — | — | ✅ |
| Embeddable widgets | — | ✅ | ✅ |

---

## 5. Pages / Routes

| Route | Page |
|-------|------|
| `/` | Marketing landing page |
| `/dashboard` | Personalized home dashboard |
| `/space-weather` | Space Weather Center |
| `/asteroids` | NEO Tracker |
| `/satellites` | Satellite & ISS Tracker |
| `/launches` | Launch Calendar |
| `/news` | Space News Feed |
| `/exoplanets` | Exoplanet Explorer |
| `/settings` | Account, location, notifications |
| `/pricing` | Subscription plans |
| `/api-docs` | Public API documentation |
| `/login`, `/signup` | Auth |

---

## 6. Data Sources Summary

| Module | API | Auth | Cost |
|--------|-----|------|------|
| Space Weather | NOAA SWPC, NASA DONKI | None / NASA key | Free |
| NEO Tracker | NASA NeoWs | NASA key | Free |
| Satellites | Celestrak, N2YO | N2YO key | Free tier |
| Launches | Launch Library 2 | None | Free |
| News | Spaceflight News API | None | Free |
| Exoplanets | NASA Exoplanet Archive | None | Free |
| APOD | NASA APOD | NASA key | Free |

> All NASA APIs share a single free key from api.nasa.gov.

---

## 7. Roadmap (suggested)

**MVP (v0.1)** — ship something live fast
- Launch Calendar + countdowns (no auth needed to view)
- Space News feed
- APOD widget
- Basic auth + saved location

**v0.2**
- Space Weather Center + Kp alerts (email)
- ISS pass predictions

**v0.3**
- NEO Tracker
- Push notifications + custom thresholds
- Stripe billing (Free/Pro)

**v0.4**
- Exoplanet Explorer + data export
- Public API + keys
- Team tier: webhooks, Slack/Discord

**v1.0**
- Embeddable widgets
- Mobile-optimized PWA with push
- Polished onboarding

---

## 8. Non-goals (for now)
- Real-time telemetry from live missions (not publicly available)
- Selling raw agency data (we add value via aggregation/alerts, not resale)
- Native mobile apps (PWA first)
