import { NextResponse } from "next/server";

export async function GET() {
  const {
    getAccounts,
  } = await import("@/lib/repositories/account-repository");
  
  const accounts = await getAccounts();

  return NextResponse.json({
    success: true,
    count: accounts.length,
    data: accounts,
  });
}
