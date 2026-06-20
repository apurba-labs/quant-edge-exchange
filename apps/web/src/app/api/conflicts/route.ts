import { NextResponse } from "next/server";

export async function GET() {
  const {
    getConflictMetrics,
  } = await import("@/lib/repositories/conflict-event-repository");

  const metrics = await getConflictMetrics();

  return NextResponse.json(
    metrics
  );
}
