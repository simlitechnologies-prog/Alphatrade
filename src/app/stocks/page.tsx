import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "Stock Trading",
  description: "Invest in US and global stocks from NYSE, NASDAQ and international exchanges.",
};

export default function StocksPage() {
  return (
    <MarketPageTemplate
      eyebrow="Equities"
      title="Invest in global stocks"
      description="Trade shares of the world's biggest companies — from Apple and Tesla to emerging market leaders — all with real-time pricing."
      assets={getAssetsByClass("stock")}
    />
  );
}
