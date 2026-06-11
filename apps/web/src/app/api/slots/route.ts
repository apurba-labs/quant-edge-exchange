import { NextResponse } from "next/server";

import {
  getSlots,
} from "@/lib/repositories/slot-repository";

export async function GET() {
  const slots = await getSlots();

  return NextResponse.json({
    success: true,
    count: slots.length,
    data: slots,
  });
}