import { ArrowUpFromLine } from "lucide-react";
import { WidgetCard, StatCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { transactions, portfolioStats } from "@/data/dashboard";

const withdrawals = transactions.filter((t) => t.type === "withdrawal");

export default function WithdrawalsPage() {
  const total = withdrawals.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Withdrawals</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Available to withdraw" value={formatCurrency(portfolioStats.freeMargin)} icon={ArrowUpFromLine} accent="blue" />
        <StatCard label="Total withdrawn" value={formatCurrency(total)} icon={ArrowUpFromLine} accent="amber" />
        <StatCard label="Pending withdrawals" value="$0.00" icon={ArrowUpFromLine} accent="blue" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WidgetCard title="New withdrawal">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Withdrawal amount (USD)</label>
              <input type="number" placeholder="500.00" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
              <p className="mt-1.5 text-xs text-foreground/40">Available: {formatCurrency(portfolioStats.freeMargin)} · Min withdrawal: $10</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Withdraw to</label>
              <select className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900">
                <option>Bank account ending ···4821 (Barclays)</option>
                <option>Visa card ending ···9012</option>
                <option>Add new payment method…</option>
              </select>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-xs text-brand-accent dark:bg-amber-950/30">
              ⚠ Withdrawals must be sent to the same method used for your most recent deposit. Processing takes 1–3 business days.
            </div>

            <Button variant="primary" size="md" className="w-full">Request withdrawal</Button>
          </div>
        </WidgetCard>

        <WidgetCard title="Withdrawal history">
          {withdrawals.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/40">No withdrawals yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {withdrawals.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.method}</p>
                    <p className="text-xs text-foreground/40">{tx.reference} · {new Date(tx.createdAt).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className="text-right">
                    <p className="tabular font-semibold text-brand-danger">−{formatCurrency(tx.amount)}</p>
                    <span className="text-xs text-brand-success">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </WidgetCard>
      </div>
    </div>
  );
}
