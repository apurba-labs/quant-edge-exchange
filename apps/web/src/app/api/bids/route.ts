import { NextResponse } from "next/server";

export async function GET() {
  const {
    getRecentBids,
  } = await import("@/lib/repositories/bid-repository");
  
  const bids = await getRecentBids();

  return NextResponse.json({
    success: true,
    count: bids.length,
    data: bids,
  });
}
