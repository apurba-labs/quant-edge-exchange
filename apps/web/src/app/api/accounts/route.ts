import { NextResponse } from "next/server";

import {
  getAccounts,
} from "@quant/core";

export async function GET() {
  const accounts = await getAccounts();

  return NextResponse.json({
    success: true,
    count: accounts.length,
    data: accounts,
  });
}