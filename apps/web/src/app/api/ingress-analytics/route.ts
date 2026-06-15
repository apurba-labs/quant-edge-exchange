import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {

    const {
      getIngressAnalytics,
    } = await import("@/lib/repositories");
    const analytics = await getIngressAnalytics();

    return NextResponse.json( analytics );

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}