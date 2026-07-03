import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "Commodity Trading",
  description: "Trade gold, silver, crude oil, natural gas and agricultural commodities on AlphaTrade.",
};

export default function CommoditiesPage() {
  return (
    <MarketPageTemplate
      eyebrow="Commodities"
      title="Trade commodity markets"
      description="Gold, silver, crude oil, natural gas, cocoa and more — hedge against inflation or speculate on global supply and demand."
      assets={getAssetsByClass("commodity")}
    />
  );
}
