import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const {
    getRecentSettlements,
  } = await import("@/lib/repositories/settlement-repository");
  
  const settlements =
    await getRecentSettlements();

  return NextResponse.json({
    success: true,
    count: settlements.length,
    data: settlements,
  });
}
