import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const {
      getRecentSimulationRuns,
    } = await import("@/lib/repositories");

    const runs = await getRecentSimulationRuns();

    return NextResponse.json({
      success: true,
      count: runs.length,
      data: runs,
    });
  } catch (error:any) {
      console.error("Runtime API Error:", error?.message);
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}