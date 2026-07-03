import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "AML Policy",
  description: "AlphaTrade Markets Anti-Money Laundering Policy.",
};

export default function AMLPolicyPage() {
  return (
    <LegalLayout title="Anti-Money Laundering (AML) Policy" lastUpdated="June 1, 2026">
      <h2>1. Commitment to AML compliance</h2>
      <p>AlphaTrade Markets is committed to preventing the use of our platform for money laundering, terrorist financing, and other financial crimes. We comply fully with applicable AML legislation and the regulations of every jurisdiction in which we operate.</p>

      <h2>2. Customer Due Diligence (CDD)</h2>
      <p>All clients are required to complete Customer Due Diligence before depositing funds or placing live trades. CDD includes verifying identity via government-issued photo ID, confirming residential address via utility bill or bank statement, and assessing source of funds and source of wealth for higher-risk customers.</p>

      <h2>3. Enhanced Due Diligence (EDD)</h2>
      <p>Enhanced Due Diligence is applied to Politically Exposed Persons (PEPs), high-net-worth clients, clients from high-risk jurisdictions, and clients whose activity patterns raise concern. EDD may include additional documentation and senior management approval.</p>

      <h2>4. Transaction monitoring</h2>
      <p>We continuously monitor account activity for patterns inconsistent with a client&apos;s stated profile, including unusually large deposits or withdrawals, rapid cycling of funds without trading activity, use of multiple payment methods without clear business rationale, and unusual geographic patterns.</p>

      <h2>5. Suspicious Activity Reports (SARs)</h2>
      <p>Where we identify or suspect money laundering or terrorist financing activity, we are legally obligated to file a Suspicious Activity Report with the relevant financial intelligence unit. We are prohibited from tipping off the subject of a SAR.</p>

      <h2>6. Prohibited countries</h2>
      <p>We do not accept clients from jurisdictions subject to comprehensive sanctions, including those designated by FATF as high-risk. A full list of restricted jurisdictions is available on request.</p>

      <h2>7. Record keeping</h2>
      <p>We maintain all CDD documentation, transaction records, and SAR filings for a minimum of 7 years, as required by regulation.</p>

      <h2>8. AML Officer</h2>
      <p>Our designated AML Officer oversees our compliance programme and can be contacted at <strong>compliance@alphatrademarkets.com</strong>.</p>
    </LegalLayout>
  );
}
