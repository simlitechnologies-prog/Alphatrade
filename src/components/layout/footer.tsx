import Link from "next/link";
import { TrendingUp } from "lucide-react";

const columns = [
  {
    title: "Markets",
    links: [
      { href: "/forex", label: "Forex" },
      { href: "/stocks", label: "Stocks" },
      { href: "/commodities", label: "Commodities" },
      { href: "/indices", label: "Indices" },
      { href: "/etfs", label: "ETFs" },
      { href: "/cryptocurrency", label: "Cryptocurrency" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/education", label: "Education Academy" },
      { href: "/faq", label: "FAQ" },
      { href: "/help", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/risk-disclosure", label: "Risk Disclosure" },
      { href: "/aml-policy", label: "AML Policy" },
      { href: "/kyc-policy", label: "KYC Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-primary pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-secondary text-white">
                <TrendingUp size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-base font-bold text-white">
                AlphaTrade
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Trade Forex. Invest in Stocks. Grow Your Wealth.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            Risk warning: Trading forex, stocks, and other leveraged products
            carries a high level of risk and may not be suitable for all
            investors. You could lose more than your initial deposit. Ensure
            you fully understand the risks before trading.
          </p>
          <p className="mt-4 text-xs text-white/30">
            © {new Date().getFullYear()} AlphaTrade Markets. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
