import { getIssPosition } from "@/lib/sources/satellites";
import { PageHeader } from "@/components/PageHeader";
import { IssTracker } from "@/components/IssTracker";

export const dynamic = "force-dynamic";

export default async function SatellitesPage() {
  let initial = null;
  try {
    initial = await getIssPosition();
  } catch {
    initial = null;
  }

  return (
    <div>
      <PageHeader
        icon="🛰️"
        title="Satellite & ISS Tracker"
        subtitle="Live position of the International Space Station, updating in real time."
        source="wheretheiss.at"
      />

      <div className="card p-6">
        <IssTracker initial={initial} />
      </div>

      <div className="card mt-5 p-6">
        <h3 className="font-semibold text-white">Pass predictions &amp; custom watchlist</h3>
        <p className="mt-2 text-sm text-slate-400">
          Visible pass times for your location (with direction, elevation and brightness) and a
          custom satellite watchlist by NORAD ID — including Starlink and Hubble — require an N2YO
          API key and a saved location. Add <code className="text-comet">N2YO_API_KEY</code> to your
          environment to enable this module.
        </p>
        <p className="mt-3 text-xs text-slate-600">
          Roadmap v0.2: “ISS passes overhead in 10 minutes” push alerts.
        </p>
      </div>
    </div>
  );
}
