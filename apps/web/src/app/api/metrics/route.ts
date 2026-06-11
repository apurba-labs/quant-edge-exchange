import { NextResponse } from "next/server";

import {
  getPlatformMetrics,
  getWinningRegionStats,
} from "@/lib/repositories/metrics-repository";

export async function GET() {
    const metrics = await getPlatformMetrics();

    const regions = await getWinningRegionStats();

    return NextResponse.json({
        metrics,
        regions,
    });
}