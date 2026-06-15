import { NextResponse } from "next/server";

import {
  getRecentBids,
} from "@/lib/repositories/bid-repository";

export async function GET() {
  const bids = await getRecentBids();

  return NextResponse.json({
    success: true,
    count: bids.length,
    data: bids,
  });
}