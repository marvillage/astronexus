import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const tiers = [
  {
    name: "Free",
    price: "$0",
    tagline: "For casual sky-watchers",
    cta: "Get started",
    highlight: false,
    features: [
      "All web dashboards",
      "In-app + email alerts",
      "1 custom alert threshold",
      "APOD & daily highlights",
    ],
  },
  {
    name: "Pro",
    price: "$8",
    tagline: "For astrophotographers & enthusiasts",
    cta: "Upgrade to Pro",
    highlight: true,
    features: [
      "Everything in Free",
      "Unlimited custom thresholds",
      "Push + SMS alerts",
      "Daily / weekly digests",
      "Data export (CSV/JSON)",
      "Limited public API access",
      "Embeddable widgets",
    ],
  },
  {
    name: "Team / API",
    price: "$49",
    tagline: "For operators, teams & builders",
    cta: "Contact sales",
    highlight: false,
    features: [
      "Everything in Pro",
      "Full public API + higher rate",
      "Webhooks (launch status, NEO, storms)",
      "Slack / Discord integration",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        icon="💫"
        title="Pricing"
        subtitle="Free for casual users. Paid tiers unlock multi-channel alerts, data export and the public API."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card relative p-7 ${
              t.highlight ? "border-nebula/60 shadow-[0_0_40px_-10px_rgba(124,92,255,0.5)]" : ""
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-nebula px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-bold text-white">{t.name}</h3>
            <p className="text-sm text-slate-400">{t.tagline}</p>
            <div className="mt-4">
              <span className="text-4xl font-extrabold text-white">{t.price}</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-300">
                  <span className="text-aurora">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className={`mt-7 block rounded-xl px-4 py-2.5 text-center font-semibold transition ${
                t.highlight
                  ? "bg-nebula text-white hover:bg-nebula-light"
                  : "border border-white/15 text-slate-200 hover:bg-white/5"
              }`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Billing via Stripe is planned for v0.3. This MVP runs all dashboards free.
      </p>
    </div>
  );
}
