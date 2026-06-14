import { NextResponse } from "next/server";

import {
  getConflictMetrics,
} from "@quant/core";

export async function GET() {

  const metrics = await getConflictMetrics();

  return NextResponse.json(
    metrics
  );
}