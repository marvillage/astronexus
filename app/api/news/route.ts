import { NextResponse } from "next/server";
import { getNews } from "@/lib/sources/news";

export const revalidate = 300;

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const limit = Number(sp.get("limit") ?? 24);
  const search = sp.get("search") ?? undefined;
  try {
    const data = await getNews(Math.min(Math.max(limit, 1), 50), search);
    return NextResponse.json({ count: data.length, results: data });
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
