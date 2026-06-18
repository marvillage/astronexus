import { NextResponse } from "next/server";
import { getSpaceWeather } from "@/lib/sources/spaceWeather";

export const revalidate = 300;

export async function GET() {
  try {
    return NextResponse.json(await getSpaceWeather());
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
