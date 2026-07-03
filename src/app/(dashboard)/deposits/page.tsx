import { ArrowDownToLine, CreditCard, Building2, Bitcoin } from "lucide-react";
import { WidgetCard, StatCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { transactions } from "@/data/dashboard";

const deposits = transactions.filter((t) => t.type === "deposit");

export default function DepositsPage() {
  const total = deposits.reduce((s, t) => s + t.amount, 0);

  const methods = [
    { icon: CreditCard, label: "Visa / Mastercard", desc: "Instant · Up to $50,000/day", tag: "Fastest" },
    { icon: Building2, label: "Bank transfer (SWIFT)", desc: "1–3 business days · No limit", tag: "" },
    { icon: Building2, label: "Bank transfer (Local)", desc: "Same day · Up to $25,000", tag: "" },
    { icon: Bitcoin, label: "Cryptocurrency (USDT, BTC)", desc: "Under 1 hour · No limit", tag: "" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Deposits</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total deposited" value={formatCurrency(total)} icon={ArrowDownToLine} accent="green" />
        <StatCard label="Deposits this month" value={formatCurrency(5000)} icon={ArrowDownToLine} accent="blue" />
        <StatCard label="Available balance" value={formatCurrency(98432.10)} icon={ArrowDownToLine} accent="blue" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WidgetCard title="New deposit">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Deposit amount (USD)</label>
              <input type="number" placeholder="1000.00" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-3">Payment method</label>
              <div className="space-y-2">
                {methods.map((m) => (
                  <label key={m.label} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 hover:border-brand-secondary transition-colors dark:border-slate-700">
                    <input type="radio" name="method" className="accent-brand-secondary" />
                    <m.icon size={18} className="text-foreground/50 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{m.label}</p>
                      <p className="text-xs text-foreground/50">{m.desc}</p>
                    </div>
                    {m.tag && <span className="rounded-full bg-brand-secondary/10 px-2 py-0.5 text-xs font-medium text-brand-secondary">{m.tag}</span>}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full">Continue to deposit</Button>
            <p className="text-center text-xs text-foreground/40">Funds are credited to your trading account immediately upon confirmation.</p>
          </div>
        </WidgetCard>

        <WidgetCard title="Deposit history">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {deposits.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.method}</p>
                  <p className="text-xs text-foreground/40">{tx.reference} · {new Date(tx.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
                <div className="text-right">
                  <p className="tabular font-semibold text-brand-success">+{formatCurrency(tx.amount)}</p>
                  <span className="text-xs text-brand-success">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
