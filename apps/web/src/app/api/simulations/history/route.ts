import { NextResponse } from "next/server";

export async function GET() {
  try {
    const {
      getRecentSimulationRuns,
    } = await import("@/lib/repositories/simulation-repository");
    
    const runs =
      await getRecentSimulationRuns();

    return NextResponse.json({
      success: true,
      count: runs.length,
      data: runs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch simulation history",
      },
      {
        status: 500,
      }
    );
  }
}
