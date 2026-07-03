import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-brand-primary p-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-secondary text-white">
            <TrendingUp size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            AlphaTrade<span className="text-brand-secondary"> Markets</span>
          </span>
        </Link>

        <div>
          <blockquote className="font-display text-3xl font-bold leading-snug text-white">
            &ldquo;Markets reward the prepared.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs text-white/40">Trusted by 2.1M traders in 40+ countries</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[["2.1M+", "Traders"], ["180+", "Markets"], ["99.98%", "Uptime"]].map(([v, l]) => (
              <div key={l} className="rounded-lg bg-white/5 p-3 text-center">
                <p className="font-display tabular text-xl font-bold text-white">{v}</p>
                <p className="text-xs text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} AlphaTrade Markets. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-brand-muted px-6 py-12">
        <div className="w-full max-w-md">
          {/* mobile logo */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-secondary text-white">
              <TrendingUp size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold text-foreground">
              AlphaTrade Markets
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
