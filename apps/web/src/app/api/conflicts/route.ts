import { NextResponse } from "next/server";

import {
  getConflictMetrics,
} from "@/lib/repositories/conflict-event-repository"

export async function GET() {

  const metrics = await getConflictMetrics();

  return NextResponse.json(
    metrics
  );
}