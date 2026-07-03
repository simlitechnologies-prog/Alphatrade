import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "KYC Policy",
  description: "AlphaTrade Markets Know Your Customer (KYC) policy and verification requirements.",
};

export default function KYCPolicyPage() {
  return (
    <LegalLayout title="Know Your Customer (KYC) Policy" lastUpdated="June 1, 2026">
      <h2>1. Purpose</h2>
      <p>AlphaTrade Markets operates a robust Know Your Customer programme to verify the identity of all clients before granting access to live trading facilities. This programme helps us prevent financial crime and comply with our regulatory obligations.</p>

      <h2>2. Required documentation</h2>
      <p>All clients must provide the following before depositing funds:</p>
      <ul>
        <li><strong>Proof of identity:</strong> valid passport, national ID card, or driver&apos;s licence (not expired, clearly showing name, date of birth, and photograph).</li>
        <li><strong>Proof of address:</strong> bank statement, utility bill, or official government letter dated within the last 3 months, showing your full name and residential address.</li>
        <li><strong>Selfie verification:</strong> a live selfie may be required to match against your identity document.</li>
      </ul>

      <h2>3. Source of funds</h2>
      <p>For deposits above our threshold limits, we may request documentation evidencing the source of funds, such as payslips, tax returns, business accounts, or investment statements.</p>

      <h2>4. Verification process</h2>
      <p>Documents submitted through our secure portal are reviewed by our compliance team, typically within 24 hours on business days. We use automated identity verification technology from regulated providers to assist with document authentication.</p>

      <h2>5. Ongoing monitoring</h2>
      <p>KYC is not a one-time process. We periodically review client documentation and may request updated identity or address verification as required by regulation or changes to client circumstances.</p>

      <h2>6. Failure to verify</h2>
      <p>If a client fails to provide adequate KYC documentation within a reasonable time, we reserve the right to restrict account functionality, freeze pending withdrawals until verification is completed, or close the account and return funds via the original deposit method.</p>

      <h2>7. Data protection</h2>
      <p>KYC documentation is stored securely in line with our Privacy Policy and is only accessed by authorised compliance personnel. Documents are retained for a minimum of 7 years after the end of the client relationship.</p>

      <h2>8. Contact</h2>
      <p>For KYC-related queries, contact our Compliance team at <strong>kyc@alphatrademarkets.com</strong>.</p>
    </LegalLayout>
  );
}
