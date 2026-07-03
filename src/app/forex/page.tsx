import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "Forex Trading",
  description: "Trade 70+ forex pairs with tight spreads and fast execution on AlphaTrade Markets.",
};

export default function ForexPage() {
  return (
    <MarketPageTemplate
      eyebrow="Foreign exchange"
      title="Trade forex markets"
      description="Access 70+ major, minor and exotic currency pairs around the clock, with institutional-grade pricing and sub-50ms execution."
      assets={getAssetsByClass("forex")}
    />
  );
}
