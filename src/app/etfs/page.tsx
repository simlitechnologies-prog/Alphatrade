import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "ETF Trading",
  description: "Trade exchange-traded funds tracking sectors, indices and asset classes on AlphaTrade.",
};

export default function ETFsPage() {
  return (
    <MarketPageTemplate
      eyebrow="Exchange-traded funds"
      title="Trade ETFs"
      description="Diversify across entire sectors with a single trade. Access top ETFs from Vanguard, BlackRock, SPDR and ARK in one place."
      assets={getAssetsByClass("etf")}
    />
  );
}
