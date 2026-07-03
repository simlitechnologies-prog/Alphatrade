import type { Metadata } from "next";
import { MarketPageTemplate } from "@/components/marketing/market-page-template";
import { getAssetsByClass } from "@/data/markets";

export const metadata: Metadata = {
  title: "Index Trading",
  description: "Trade the world's major stock indices including S&P 500, FTSE 100, DAX and Nikkei 225.",
};

export default function IndicesPage() {
  return (
    <MarketPageTemplate
      eyebrow="Stock indices"
      title="Trade global indices"
      description="Get broad market exposure by trading S&P 500, Nasdaq 100, FTSE 100, DAX 40, Nikkei 225 and more — in a single position."
      assets={getAssetsByClass("index")}
    />
  );
}
