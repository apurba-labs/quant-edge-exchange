import { NextResponse } from "next/server";

import {
  runSimulation,
} from "@quant/simulations";

export async function POST() {

  const result = await runSimulation();

  return NextResponse.json(
    result
  );
}