import { NextResponse } from "next/server";

import {
  runSimulation,
} from "@/lib/simulations/simulator";

export async function POST() {

  const result = await runSimulation();

  return NextResponse.json(
    result
  );
}