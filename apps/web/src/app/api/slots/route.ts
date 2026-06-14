import { NextResponse } from "next/server";

import {
  getSlots,
} from "@quant/core";

export async function GET() {
  const slots = await getSlots();

  return NextResponse.json({
    success: true,
    count: slots.length,
    data: slots,
  });
}