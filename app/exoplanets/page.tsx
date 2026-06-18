import { getExoplanets, type Exoplanet } from "@/lib/sources/exoplanets";
import { PageHeader } from "@/components/PageHeader";
import { ExoplanetExplorer } from "@/components/ExoplanetExplorer";

export const revalidate = 86400;

export default async function ExoplanetsPage() {
  let initial: Exoplanet[];
  try {
    initial = await getExoplanets(undefined, 60);
  } catch {
    initial = [];
  }
  return (
    <div>
      <PageHeader
        icon="🪐"
        title="Exoplanet Explorer"
        subtitle="Search confirmed exoplanets with Earth-similarity habitability scoring."
        source="NASA Exoplanet Archive"
      />
      <ExoplanetExplorer initial={initial} />
    </div>
  );
}
