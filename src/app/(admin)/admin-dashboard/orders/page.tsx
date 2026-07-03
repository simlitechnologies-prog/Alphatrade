import { PageHeader, AdminCard, Th, Td, StatusBadge } from "@/components/dashboard/admin-widgets";
import { pendingOrders, recentOrders } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const statusMap = {
  pending: { label: "Pending", class: "bg-amber-50 text-brand-accent" },
  open: { label: "Open", class: "bg-blue-50 text-brand-secondary" },
  filled: { label: "Filled", class: "bg-green-50 text-brand-success" },
  cancelled: { label: "Cancelled", class: "bg-slate-100 text-slate-500" },
};

const allOrders = [...pendingOrders, ...recentOrders];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" sub={`${allOrders.length} orders platform-wide`} />
      <AdminCard title="All orders">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <Th>ID</Th><Th>Symbol</Th><Th>Type</Th><Th>Direction</Th>
                <Th>Lots</Th><Th>Price</Th><Th>Status</Th><Th>Created</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Td className="font-mono text-xs text-foreground/50">{o.id}</Td>
                  <Td className="font-bold dark:text-white">{o.symbol}</Td>
                  <Td className="capitalize text-foreground/60">{o.type}</Td>
                  <Td>
                    <span className={cn("rounded px-2 py-0.5 text-xs font-semibold uppercase", o.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
                      {o.direction}
                    </span>
                  </Td>
                  <Td className="tabular">{o.lots}</Td>
                  <Td className="tabular text-foreground/60">{o.price.toFixed(o.price > 100 ? 2 : 4)}</Td>
                  <Td><StatusBadge status={o.status} map={statusMap} /></Td>
                  <Td className="text-foreground/50">
                    {new Date(o.createdAt).toLocaleDateString("en-GB")}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
