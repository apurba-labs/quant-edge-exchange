import { NextResponse } from "next/server";

import {
  getRecentBids,
} from "@quant/core";

export async function GET() {
  const bids = await getRecentBids();

  return NextResponse.json({
    success: true,
    count: bids.length,
    data: bids,
  });
}