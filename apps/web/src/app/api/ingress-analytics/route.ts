import { NextResponse } from "next/server";

import {
  getIngressAnalytics,
}
from "@quant/core";

export async function GET() {

  const analytics = await getIngressAnalytics();

  return NextResponse.json( analytics );
}