import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  try {
    
    const { getAccounts, } = await import("@/lib/repositories");
  
    const accounts = await getAccounts();

    return NextResponse.json({
      success: true,
      count: accounts.length,
      data: accounts,
    });

  } catch (error: any) {
    console.error("Runtime API Error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
  
}