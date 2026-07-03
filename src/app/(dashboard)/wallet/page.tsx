import { ArrowDownToLine, ArrowUpFromLine, CreditCard, Building2, Bitcoin } from "lucide-react";
import { WidgetCard, StatCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatCurrency, cn } from "@/lib/utils";
import { transactions, portfolioStats } from "@/data/dashboard";

const txColor: Record<string, string> = {
  deposit: "text-brand-success",
  trade_profit: "text-brand-success",
  withdrawal: "text-brand-danger",
  trade_loss: "text-brand-danger",
  commission: "text-foreground/50",
  swap: "text-foreground/50",
};

const txLabel: Record<string, string> = {
  deposit: "Deposit",
  trade_profit: "Trade profit",
  withdrawal: "Withdrawal",
  trade_loss: "Trade loss",
  commission: "Commission",
  swap: "Overnight swap",
};

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Wallet</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Available balance" value={formatCurrency(portfolioStats.balance)} icon={ArrowDownToLine} accent="blue" />
        <StatCard label="Used margin" value={formatCurrency(portfolioStats.usedMargin)} icon={ArrowUpFromLine} accent="amber" />
        <StatCard label="Free margin" value={formatCurrency(portfolioStats.freeMargin)} icon={ArrowDownToLine} accent="green" />
      </div>

      {/* Deposit / Withdraw quick actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WidgetCard title="Deposit funds">
          <p className="text-sm text-foreground/60 mb-4">Add funds to your trading account instantly.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Amount (USD)</label>
              <input type="number" placeholder="500.00" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Payment method</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: CreditCard, label: "Card" },
                  { icon: Building2, label: "Bank" },
                  { icon: Bitcoin, label: "Crypto" },
                ].map((m) => (
                  <button key={m.label} className="flex flex-col items-center gap-1.5 rounded-lg border-2 border-slate-200 p-3 hover:border-brand-secondary hover:text-brand-secondary transition-colors dark:border-slate-700">
                    <m.icon size={18} className="text-foreground/50" />
                    <span className="text-xs text-foreground/60">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button variant="primary" size="md" className="w-full">Deposit now</Button>
          </div>
        </WidgetCard>

        <WidgetCard title="Withdraw funds">
          <p className="text-sm text-foreground/60 mb-4">Withdraw to your verified bank account or card.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Amount (USD)</label>
              <input type="number" placeholder="500.00" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Withdraw to</label>
              <select className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900">
                <option>Bank account ending ···4821</option>
                <option>Visa card ending ···9012</option>
              </select>
            </div>
            <div className="rounded-lg bg-brand-muted p-3 text-xs text-foreground/50 dark:bg-slate-900/40">
              Withdrawals typically process in 1–3 business days. Minimum withdrawal: $10.
            </div>
            <Button variant="outline" size="md" className="w-full">Request withdrawal</Button>
          </div>
        </WidgetCard>
      </div>

      {/* Transaction history */}
      <WidgetCard title="Transaction history">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                {["Reference", "Type", "Amount", "Status", "Method", "Date"].map((h) => (
                  <th key={h} className="whitespace-nowrap pb-3 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id} className="hover:bg-brand-muted/40 dark:hover:bg-slate-900/20">
                    <td className="py-3 pr-4 font-mono text-xs text-foreground/50">{tx.reference}</td>
                    <td className="py-3 pr-4 text-foreground/70">{txLabel[tx.type]}</td>
                    <td className={cn("tabular py-3 pr-4 font-semibold", txColor[tx.type])}>
                      {isPositive ? "+" : ""}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", tx.status === "completed" ? "bg-green-50 text-brand-success" : tx.status === "pending" ? "bg-amber-50 text-brand-accent" : "bg-red-50 text-brand-danger")}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-foreground/50">{tx.method ?? "—"}</td>
                    <td className="whitespace-nowrap py-3 text-xs text-foreground/40">
                      {new Date(tx.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
