"use client";

import { usePathname } from "next/navigation";

import {
  useExchangeStatus,
} from "@/context/exchange-status";

export function ExchangeStatus() {

  const pathname = usePathname();

  // Only show on simulator page
  if (pathname !== "/simulator") {
    return null;
  }

  const {
    autoRun,
    countdown,
    nextRunIn,
  } = useExchangeStatus();

  return (
    <div className="text-center min-w-[300px]">

        {countdown !== null ? (
            <div className="text-lg font-semibold text-orange-500">
            ⏳ Exchange starts in {countdown}
            </div>
        ) : autoRun ? (
            <>
            <div className="text-lg font-semibold text-green-600">
                🟢 Live Exchange Running
                {nextRunIn !== null &&
                ` ⏳ Next Exchange in ${nextRunIn}s`}
            </div>

            <div className="text-sm text-gray-500">
                Auto-stop after 60 seconds
            </div>
            </>
        ) : (
            <div className="text-lg font-semibold text-gray-500">
                ⚪ Exchange Ready
            </div>
        )}

        </div>
    );
}