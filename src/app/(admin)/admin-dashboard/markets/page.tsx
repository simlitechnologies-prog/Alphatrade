import { PageHeader, AdminCard, Th, Td } from "@/components/dashboard/admin-widgets";
import { formatPrice, formatPercent, cn } from "@/lib/utils";
import { tickerAssets } from "@/data/markets";

export default function AdminMarketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Markets" sub={`${tickerAssets.length} tradeable instruments`} />
      <AdminCard title="All instruments">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>Symbol</Th><Th>Name</Th><Th>Class</Th><Th>Price</Th>
                <Th>Change</Th><Th>Status</Th><Th>Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tickerAssets.map((a) => {
                const isUp = a.changePercent >= 0;
                return (
                  <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <Td className="font-bold dark:text-white">{a.symbol}</Td>
                    <Td className="max-w-[140px] truncate text-foreground/60">{a.name}</Td>
                    <Td className="capitalize text-foreground/60">{a.assetClass}</Td>
                    <Td className="tabular font-semibold">
                      {formatPrice(a.price, a.price > 100 ? 2 : 4)}
                    </Td>
                    <Td className={cn("tabular font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
                      {formatPercent(a.changePercent)}
                    </Td>
                    <Td>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", a.marketStatus === "open" ? "bg-green-50 text-brand-success" : "bg-slate-100 text-slate-500")}>
                        {a.marketStatus}
                      </span>
                    </Td>
                    <Td>
                      <div className="flex gap-1.5">
                        <button className="rounded px-2.5 py-1 text-xs font-medium bg-slate-100 text-foreground hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-white">
                          Edit
                        </button>
                        <button className="rounded px-2.5 py-1 text-xs font-medium bg-amber-50 text-brand-accent hover:bg-brand-accent hover:text-white transition-colors">
                          Suspend
                        </button>
                      </div>
                    </Td>
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
