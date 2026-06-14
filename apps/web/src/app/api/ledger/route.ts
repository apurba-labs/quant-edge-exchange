import { NextResponse } from "next/server";

import {
  getRecentLedgerEntries,
} from "@quant/core";

export async function GET() {
  const entries =
    await getRecentLedgerEntries();

  return NextResponse.json({
    success: true,
    count: entries.length,
    data: entries,
  });
}