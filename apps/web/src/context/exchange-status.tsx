"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const ExchangeContext = createContext<any>(null);

export function ExchangeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [autoRun, setAutoRun] = useState(false);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [nextRunIn, setNextRunIn] = useState<number | null>(null);

  return (
    <ExchangeContext.Provider
      value={{
        autoRun,
        setAutoRun,
        countdown,
        setCountdown,
        nextRunIn,
        setNextRunIn
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}

export function useExchangeStatus() {
  return useContext(
    ExchangeContext
  );
}