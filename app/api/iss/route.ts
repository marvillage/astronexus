import { NextResponse } from "next/server";
import { getIssPosition } from "@/lib/sources/satellites";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getIssPosition());
  } catch {
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
