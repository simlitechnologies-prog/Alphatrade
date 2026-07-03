import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AlphaTrade Markets terms and conditions governing use of the platform.",
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 1, 2026">
      <h2>1. Agreement to terms</h2>
      <p>By accessing or using AlphaTrade Markets (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform.</p>

      <h2>2. Eligibility</h2>
      <p>You must be at least 18 years of age and legally permitted to trade financial instruments in your country of residence to open an account. By registering, you represent that you meet these requirements.</p>

      <h2>3. Account registration and security</h2>
      <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account. You must notify us immediately of any unauthorised access. We reserve the right to suspend accounts where we suspect a security breach.</p>

      <h2>4. Trading services</h2>
      <p>AlphaTrade Markets provides access to a trading platform for the execution of orders in forex, equities, commodities, indices, ETFs and cryptocurrency markets. We act as a principal counterparty or connect orders to liquidity providers depending on the product type and account terms.</p>

      <h2>5. Order execution</h2>
      <p>We endeavour to execute orders at the best available price but cannot guarantee execution at a specific price in all market conditions. Orders may be partially filled or rejected in illiquid or fast-moving markets.</p>

      <h2>6. Risk warning</h2>
      <p>Trading leveraged financial instruments carries a high level of risk. You may lose some or all of your invested capital. AlphaTrade Markets is not responsible for trading losses incurred by users. Please read our Risk Disclosure Statement before trading.</p>

      <h2>7. Prohibited activities</h2>
      <p>You may not use the Platform for money laundering, market manipulation, algorithmic strategies that abuse platform infrastructure, creation of multiple accounts to circumvent restrictions, or any activity that violates applicable laws.</p>

      <h2>8. Fees</h2>
      <p>Our fees are disclosed in the Fee Schedule within your account settings. We reserve the right to update fees with 30 days advance notice. Swap fees for overnight positions are published on each instrument&apos;s detail page.</p>

      <h2>9. Termination</h2>
      <p>We may suspend or terminate your account if you breach these Terms, fail to maintain required KYC documentation, or if we are required to do so by regulation. You may close your account at any time subject to settling any open positions and withdrawing remaining funds.</p>

      <h2>10. Governing law</h2>
      <p>These Terms are governed by the laws of England and Wales. Any disputes shall be resolved through binding arbitration, except where mandatory consumer protection laws in your jurisdiction provide otherwise.</p>
    </LegalLayout>
  );
}
