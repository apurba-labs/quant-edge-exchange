import { NextResponse } from "next/server";

import {
  getIngressAnalytics,
}
from "@/lib/repositories/bid-event-analytics";

export async function GET() {

  const analytics = await getIngressAnalytics();

  return NextResponse.json( analytics );
}