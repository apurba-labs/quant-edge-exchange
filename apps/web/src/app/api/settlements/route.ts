import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const {
      getRecentSettlements,
    } = await import("@/lib/repositories");

    const settlements = await getRecentSettlements();

    return NextResponse.json({
      success: true,
      count: settlements.length,
      data: settlements,
    });

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}