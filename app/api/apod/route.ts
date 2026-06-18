import { NextResponse } from "next/server";
import { getApod } from "@/lib/sources/apod";

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(await getApod());
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
