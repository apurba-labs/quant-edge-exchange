import { NextResponse } from "next/server";

import {
  getRecentLedgerEntries,
} from "@/lib/repositories/ledger-repository";

export async function GET() {
  const entries =
    await getRecentLedgerEntries();

  return NextResponse.json({
    success: true,
    count: entries.length,
    data: entries,
  });
}