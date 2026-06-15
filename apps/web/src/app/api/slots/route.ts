import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const { getSlots,} = await import("@/lib/repositories");

    const slots = await getSlots();

    return NextResponse.json({
      success: true,
      count: slots.length,
      data: slots,
    });

  } catch (error:any) {
      console.error("Runtime API Error:", error?.message);
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}