import { NextResponse } from "next/server";

export async function POST() {
  const {
    runSimulation,
  } = await import("@/lib/simulations/simulator");

  const result = await runSimulation();

  return NextResponse.json(
    result
  );
}
