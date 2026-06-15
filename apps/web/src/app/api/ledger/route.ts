import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const {
      getRecentLedgerEntries,
    } = await import( "@/lib/repositories/ledger-repository");
    
    const entries = await getRecentLedgerEntries();

    return NextResponse.json({
      success: true,
      count: entries.length,
      data: entries,
    });

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}