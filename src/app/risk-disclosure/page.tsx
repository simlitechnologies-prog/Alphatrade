import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description: "Important risk information for AlphaTrade Markets traders.",
};

export default function RiskDisclosurePage() {
  return (
    <LegalLayout title="Risk Disclosure Statement" lastUpdated="June 1, 2026">
      <h2>1. Nature of leveraged trading</h2>
      <p>Trading forex, CFDs, stocks on margin, and other leveraged financial instruments involves significant risk of loss. Leverage magnifies both profits and losses relative to the capital you deposit. A small adverse market move can result in losses greater than your initial deposit.</p>

      <h2>2. Market risk</h2>
      <p>Financial markets are inherently unpredictable. Prices can move rapidly and substantially in response to economic data releases, geopolitical events, central bank decisions, and other factors outside our control. Past performance is not indicative of future results.</p>

      <h2>3. Forex-specific risks</h2>
      <p>Currency markets operate 24 hours a day and can gap significantly at market open, especially following weekend events. Exotic currency pairs carry higher spreads and lower liquidity. Central bank interventions can cause extreme intraday volatility.</p>

      <h2>4. Cryptocurrency risks</h2>
      <p>Cryptocurrencies are highly volatile and largely unregulated assets. Their value can decline to zero. Regulatory changes in any jurisdiction can significantly impact crypto valuations. You should only allocate capital you can afford to lose entirely.</p>

      <h2>5. Overnight and weekend risk</h2>
      <p>Positions held overnight are subject to swap charges and gap risk. Positions held over weekends or market holidays may be exposed to significant price gaps when markets reopen.</p>

      <h2>6. Technology risk</h2>
      <p>Electronic trading platforms and internet connections may experience interruptions. We cannot guarantee continuous platform availability. You should have contingency arrangements, including phone-based order placement, for critical positions.</p>

      <h2>7. Liquidity risk</h2>
      <p>In volatile or thin markets, you may not be able to close a position at your desired price. Stop-loss orders do not guarantee execution at the specified price in all conditions — &ldquo;slippage&rdquo; can occur.</p>

      <h2>8. Risk management guidance</h2>
      <p>We strongly recommend using stop-loss orders on all positions, never risking more than 1–2% of your account on a single trade, trading with only capital you can afford to lose, and completing our Risk Management course in the Trading Academy before going live.</p>

      <h2>9. Suitability</h2>
      <p>Leveraged trading may not be appropriate for all investors. You should carefully consider your investment objectives, level of experience, risk appetite, and financial situation before trading. Seek independent financial advice if in doubt.</p>
    </LegalLayout>
  );
}
