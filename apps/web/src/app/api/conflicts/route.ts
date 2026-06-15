import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const { getConflictMetrics, } = await import("@/lib/repositories");
    const metrics = await getConflictMetrics();

    return NextResponse.json(
      metrics
    );

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}