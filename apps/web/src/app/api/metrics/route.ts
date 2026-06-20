import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const {
      getPlatformMetrics,
      getWinningRegionStats,
    } = await import("@/lib/repositories/metrics-repository");
    
    const metrics = await getPlatformMetrics();

    const regions = await getWinningRegionStats();

    return NextResponse.json({
        metrics,
        regions,
    });
}
