// Space News — Spaceflight News API v4 (no auth).
import { cached, fetchJSON } from "@/lib/cache";

export type Article = {
  id: number;
  title: string;
  url: string;
  imageUrl: string | null;
  newsSite: string;
  summary: string;
  publishedAt: string;
};

const BASE = "https://api.spaceflightnewsapi.net/v4";

type SNAPIArticle = {
  id: number;
  title: string;
  url: string;
  image_url: string | null;
  news_site: string;
  summary: string;
  published_at: string;
};

export async function getNews(limit = 24, search?: string): Promise<Article[]> {
  const q = search?.trim();
  const key = `news:${limit}:${q ?? ""}`;
  return cached(key, 300, async () => {
    const params = new URLSearchParams({ limit: String(limit), ordering: "-published_at" });
    if (q) params.set("search", q);
    const data = await fetchJSON<{ results: SNAPIArticle[] }>(
      `${BASE}/articles/?${params.toString()}`,
      { revalidate: 300 }
    );
    return (data.results ?? []).map((a) => ({
      id: a.id,
      title: a.title,
      url: a.url,
      imageUrl: a.image_url,
      newsSite: a.news_site,
      summary: a.summary,
      publishedAt: a.published_at,
    }));
  });
}
