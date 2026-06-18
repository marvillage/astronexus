import { getNews, type Article } from "@/lib/sources/news";
import { PageHeader } from "@/components/PageHeader";
import { NewsList } from "@/components/NewsList";

export const revalidate = 300;

export default async function NewsPage() {
  let initial: Article[];
  try {
    initial = await getNews(24);
  } catch {
    initial = [];
  }
  return (
    <div>
      <PageHeader
        icon="📰"
        title="Space News & Developments"
        subtitle="Aggregated space science news, mission updates and discoveries."
        source="Spaceflight News API"
      />
      <NewsList initial={initial} />
    </div>
  );
}
