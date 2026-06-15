import { NextResponse } from "next/server";

import {
  getRecentSettlements,
} from "@/lib/repositories/settlement-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const settlements =
    await getRecentSettlements();

  return NextResponse.json({
    success: true,
    count: settlements.length,
    data: settlements,
  });
}