// ——— TRADES PAGE ———
import { PageHeader, AdminCard, StatusBadge, Th, Td } from "@/components/dashboard/admin-widgets";
import { formatCurrency, cn } from "@/lib/utils";
import { adminTrades } from "@/data/admin";

const tradeStatusMap = {
  open: { label: "Open", class: "bg-blue-50 text-brand-secondary" },
  closed: { label: "Closed", class: "bg-slate-100 text-slate-500" },
};

export default function AdminTradesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Trades" sub="All platform trade activity" />
      <AdminCard title={`${adminTrades.length} trades`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Trade ID</Th><Th>User</Th><Th>Symbol</Th><Th>Dir.</Th>
                <Th>Lots</Th><Th>Open @</Th><Th>Close @</Th><Th>P&L</Th>
                <Th>Status</Th><Th>Opened</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {adminTrades.map((t) => {
                const isProfit = (t.pnl ?? 0) >= 0;
                return (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <Td className="font-mono text-xs text-foreground/50">{t.id}</Td>
                    <Td className="font-semibold dark:text-white">{t.userName}</Td>
                    <Td className="font-bold">{t.symbol}</Td>
                    <Td>
                      <span className={cn("rounded px-2 py-0.5 text-xs font-semibold uppercase", t.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
                        {t.direction}
                      </span>
                    </Td>
                    <Td className="tabular">{t.lots}</Td>
                    <Td className="tabular text-foreground/60">{t.openPrice}</Td>
                    <Td className="tabular text-foreground/60">{t.closePrice ?? "—"}</Td>
                    <Td className={cn("tabular font-semibold", t.pnl !== undefined ? (isProfit ? "text-brand-success" : "text-brand-danger") : "text-foreground/40")}>
                      {t.pnl !== undefined ? `${isProfit ? "+" : ""}${formatCurrency(t.pnl)}` : "—"}
                    </Td>
                    <Td><StatusBadge status={t.status} map={tradeStatusMap} /></Td>
                    <Td className="text-foreground/50">{new Date(t.openedAt).toLocaleDateString("en-GB")}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
