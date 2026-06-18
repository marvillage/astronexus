"use client";

import { useEffect, useRef, useState } from "react";
import type { Article } from "@/lib/sources/news";
import { timeAgo } from "@/lib/format";

const TOPICS = ["All", "Mars", "Moon", "Artemis", "SpaceX", "ISRO", "NASA", "JWST", "exoplanet"];

export function NewsList({ initial }: { initial: Article[] }) {
  const [topic, setTopic] = useState("All");
  const [articles, setArticles] = useState<Article[]>(initial);
  const [loading, setLoading] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const url =
          topic === "All" ? "/api/news?limit=24" : `/api/news?limit=24&search=${encodeURIComponent(topic)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (alive) setArticles(data.results ?? []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [topic]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              topic === t
                ? "bg-nebula text-white"
                : "bg-space-800 text-slate-300 hover:bg-space-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-50" : ""}`}>
        {articles.map((a) => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="card card-hover flex flex-col overflow-hidden"
          >
            {a.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.imageUrl} alt="" className="h-40 w-full object-cover" loading="lazy" />
            )}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded bg-nebula/20 px-1.5 py-0.5 text-nebula-light">
                  {a.newsSite}
                </span>
                <span>{timeAgo(a.publishedAt)}</span>
              </div>
              <h3 className="font-semibold leading-snug text-white">{a.title}</h3>
              <p className="line-clamp-3 text-sm text-slate-400">{a.summary}</p>
            </div>
          </a>
        ))}
      </div>
      {articles.length === 0 && (
        <p className="py-10 text-center text-slate-500">No stories found for “{topic}”.</p>
      )}
    </div>
  );
}
