import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const {
    getIngressAnalytics,
  }
  = await import("@/lib/repositories/bid-event-analytics");

  const analytics = await getIngressAnalytics();

  return NextResponse.json( analytics );
}
