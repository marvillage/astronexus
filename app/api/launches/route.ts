import { NextResponse } from "next/server";
import { getUpcomingLaunches } from "@/lib/sources/launches";

export const revalidate = 600;

export async function GET(req: Request) {
  const limit = Number(new URL(req.url).searchParams.get("limit") ?? 20);
  try {
    const data = await getUpcomingLaunches(Math.min(Math.max(limit, 1), 50));
    return NextResponse.json({ count: data.length, results: data });
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
