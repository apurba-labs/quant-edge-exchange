import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

    try {

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

    } catch (error: any) {
        console.error("Runtime API Error:", error?.message);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}