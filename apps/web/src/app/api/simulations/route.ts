import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {

  try {

    const {
      runSimulation,
    } = await import("@/lib/simulations/simulator");

    const result = await runSimulation();

    return NextResponse.json(
      result
    );

  } catch (error:any) {
      console.error("Runtime API Error:", error?.message);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Simulation failed",
        },
        {
          status: 500,
        }
      );
  }
}