import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AlphaTrade Markets collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 1, 2026">
      <h2>1. Introduction</h2>
      <p>AlphaTrade Markets (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and disclose your personal data when you use our platform.</p>

      <h2>2. Data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li><strong>Identity data:</strong> full name, date of birth, nationality, and government-issued ID for KYC purposes.</li>
        <li><strong>Contact data:</strong> email address, phone number, and postal address.</li>
        <li><strong>Financial data:</strong> bank account details, payment card information, and transaction history.</li>
        <li><strong>Technical data:</strong> IP address, browser type, device identifiers, and usage logs.</li>
        <li><strong>Trading data:</strong> positions, orders, trade history, and portfolio balances.</li>
      </ul>

      <h2>3. How we use your data</h2>
      <p>We use your personal data to provide and improve our trading services, comply with legal and regulatory obligations (including AML and KYC requirements), prevent fraud and ensure platform security, and communicate with you about your account and our services.</p>

      <h2>4. Legal basis for processing</h2>
      <p>We process your personal data on the basis of contractual necessity (to deliver our services), legal obligation (to comply with financial regulations), legitimate interests (to prevent fraud and improve our platform), and your consent where specifically requested.</p>

      <h2>5. Data retention</h2>
      <p>We retain your personal data for as long as your account is active and for a minimum of 7 years thereafter, as required by financial services regulations. Trading records are retained for a minimum of 5 years.</p>

      <h2>6. Data sharing</h2>
      <p>We may share your data with payment processors and banking partners for transaction processing, regulatory authorities and law enforcement as required by law, identity verification providers for KYC purposes, and IT service providers who support our platform operations. We never sell your personal data to third parties for marketing purposes.</p>

      <h2>7. Your rights</h2>
      <p>Depending on your jurisdiction, you have the right to access, correct, delete, or port your personal data. You may also object to or restrict certain processing activities. To exercise your rights, contact our Data Protection Officer at privacy@alphatrademarkets.com.</p>

      <h2>8. Security</h2>
      <p>We implement industry-standard technical and organisational security measures, including 256-bit TLS encryption, at-rest encryption of sensitive data, multi-factor authentication, and regular penetration testing.</p>

      <h2>9. Cookies</h2>
      <p>We use essential cookies for platform functionality and optional analytics cookies to improve your experience. You can manage cookie preferences through your browser settings or our cookie consent tool.</p>

      <h2>10. Contact</h2>
      <p>For privacy-related enquiries, please contact our Data Protection Officer at <strong>privacy@alphatrademarkets.com</strong>.</p>
    </LegalLayout>
  );
}
