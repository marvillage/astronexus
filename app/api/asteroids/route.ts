import { NextResponse } from "next/server";
import { getNeoFeed } from "@/lib/sources/neo";

export const revalidate = 1800;

export async function GET() {
  try {
    const data = await getNeoFeed();
    return NextResponse.json({ count: data.length, results: data });
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
