"use client";

import { useEffect } from "react";

export function useRealtimeRefresh(
  refreshFn: () => Promise<void>,
  intervalMs: number = 5000
) {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshFn().catch((error) => {
        console.error(
          "Realtime refresh failed:",
          error
        );
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [refreshFn, intervalMs]);
}