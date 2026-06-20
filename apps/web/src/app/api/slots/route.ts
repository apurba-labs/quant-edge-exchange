import { NextResponse } from "next/server";

export async function GET() {
  const {
    getSlots,
  } = await import("@/lib/repositories/slot-repository");
  
  const slots = await getSlots();

  return NextResponse.json({
    success: true,
    count: slots.length,
    data: slots,
  });
}
