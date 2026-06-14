import { NextResponse } from "next/server";

import {
  getPlatformMetrics,
  getWinningRegionStats,
} from "@quant/core";

export async function GET() {
    const metrics = await getPlatformMetrics();

    const regions = await getWinningRegionStats();

    return NextResponse.json({
        metrics,
        regions,
    });
}