import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

import {
  ExchangeProvider,
} from "@/context/exchange-status";
import { ExchangeStatus  } from "@/components/exchange-status";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quant Edge Exchange",
  description:
    "Distributed bid exchange simulation platform powered by Next.js and Aurora DSQL.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ExchangeProvider>  
          {/* Navigation */}
          <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <Image
                  src="/gotihub-logo.png"
                  alt="Gotihub"
                  width={200}
                  height={60}
                  style={{
                    height: "40px",
                    width: "auto",
                  }}
                />

                <div>
                  <div className="font-bold">
                    Quant Edge Exchange
                  </div>

                  <div className="text-xs text-gray-500">
                    Powered by Apurba Labs (Gotihub)
                  </div>
                </div>
              </Link>

              <ExchangeStatus />

              <nav className="flex items-center gap-6 text-sm font-medium">

                <Link
                  href="/"
                  className="hover:text-blue-600"
                >
                  Home
                </Link>

                <Link
                  href="/simulator"
                  className="hover:text-blue-600"
                >
                  Simulator
                </Link>
                <Link
                  href="/ingestion"
                  className="hover:text-blue-600"
                >
                  Ingestion
                </Link>
                <Link
                    href="https://github.com/apurba-labs/quant-edge-exchange"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    GitHub
                </Link>

              </nav>

            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </ExchangeProvider>

        {/* Footer */}
        <footer className="border-t bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
            Built with Next.js, TypeScript, AWS Aurora DSQL and Vercel. ©2026 Apurba Labs (Gotihub)
          </div>
        </footer>

      </body>
    </html>
  );
}