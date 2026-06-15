import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const { getRecentBids, } = await import("@/lib/repositories");
    const bids = await getRecentBids();

    return NextResponse.json({
      success: true,
      count: bids.length,
      data: bids,
    });

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

}