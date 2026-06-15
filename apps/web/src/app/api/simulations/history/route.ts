import { NextResponse } from "next/server";

import {
  getRecentSimulationRuns,
} from "@/lib/repositories/simulation-repository";

export async function GET() {
  try {
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