import { NextResponse } from "next/server";

export async function GET() {
  const {
    getRecentLedgerEntries,
  } = await import("@/lib/repositories/ledger-repository");
  
  const entries =
    await getRecentLedgerEntries();

  return NextResponse.json({
    success: true,
    count: entries.length,
    data: entries,
  });
}
