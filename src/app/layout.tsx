import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alphatrademarkets.com"),
  title: {
    default: "AlphaTrade Markets — Trade Forex. Invest in Stocks. Grow Your Wealth.",
    template: "%s | AlphaTrade Markets",
  },
  description: "AlphaTrade Markets is a professional forex and stock trading platform offering real-time markets, advanced charting, and institutional-grade security for traders worldwide.",
  keywords: ["forex trading", "stock trading platform", "online trading", "AlphaTrade Markets"],
  openGraph: {
    title: "AlphaTrade Markets — Trade Forex. Invest in Stocks. Grow Your Wealth.",
    description: "Trade forex, stocks, commodities, indices, ETFs and crypto on one professional platform.",
    url: "https://alphatrademarkets.com",
    siteName: "AlphaTrade Markets",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "AlphaTrade Markets", description: "Trade Forex. Invest in Stocks. Grow Your Wealth." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
