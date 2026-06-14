import { NextResponse } from "next/server";

import {
  getRecentSettlements,
} from "@quant/core";

export async function GET() {
  const settlements =
    await getRecentSettlements();

  return NextResponse.json({
    success: true,
    count: settlements.length,
    data: settlements,
  });
}