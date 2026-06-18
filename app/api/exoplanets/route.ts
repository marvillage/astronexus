import { NextResponse } from "next/server";
import { getExoplanets } from "@/lib/sources/exoplanets";

export const revalidate = 86400;

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const search = sp.get("search") ?? undefined;
  const limit = Number(sp.get("limit") ?? 60);
  try {
    const data = await getExoplanets(search, Math.min(Math.max(limit, 1), 200));
    return NextResponse.json({ count: data.length, results: data });
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
