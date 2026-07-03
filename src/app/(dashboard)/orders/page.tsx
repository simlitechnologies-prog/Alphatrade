"use client";

import { useState } from "react";
import { X, ClipboardList } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { cn } from "@/lib/utils";
import { pendingOrders, recentOrders } from "@/data/dashboard";
import type { Order } from "@/data/dashboard";

const statusColor: Record<string, string> = {
  open: "bg-blue-50 text-brand-secondary",
  pending: "bg-amber-50 text-brand-accent",
  filled: "bg-green-50 text-brand-success",
  cancelled: "bg-slate-100 text-foreground/50",
};

function OrderRow({ order, onCancel }: { order: Order; onCancel?: (id: string) => void }) {
  return (
    <tr className="border-b border-slate-100 text-sm hover:bg-brand-muted/50 dark:border-slate-800 dark:hover:bg-slate-900/30">
      <td className="whitespace-nowrap py-3 pr-4 font-bold text-foreground">{order.symbol}</td>
      <td className="py-3 pr-4 text-xs capitalize text-foreground/60">{order.type}</td>
      <td className="py-3 pr-4">
        <span className={cn("rounded px-2 py-0.5 text-xs font-semibold uppercase", order.direction === "buy" ? "bg-green-50 text-brand-success" : "bg-red-50 text-brand-danger")}>
          {order.direction}
        </span>
      </td>
      <td className="tabular py-3 pr-4 text-foreground/70">{order.lots}</td>
      <td className="tabular py-3 pr-4 text-foreground">{order.price.toFixed(order.price > 100 ? 2 : 4)}</td>
      <td className="py-3 pr-4">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusColor[order.status])}>
          {order.status}
        </span>
      </td>
      <td className="whitespace-nowrap py-3 pr-4 text-xs text-foreground/40">
        {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
      </td>
      <td className="py-3">
        {(order.status === "pending" || order.status === "open") && onCancel && (
          <button
            onClick={() => onCancel(order.id)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </td>
    </tr>
  );
}

const TABS = ["All", "Pending", "Filled", "Cancelled"] as const;
type Tab = (typeof TABS)[number];

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>("All");
  const [pending, setPending] = useState(pendingOrders);

  const allOrders = [...pending, ...recentOrders];
  const filtered = allOrders.filter((o) => {
    if (tab === "All") return true;
    return o.status === tab.toLowerCase();
  });

  function cancelOrder(id: string) {
    setPending((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Orders</h2>

      <WidgetCard
        title="Order history"
        action={
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors", tab === t ? "bg-brand-secondary text-white" : "text-foreground/50 hover:text-foreground")}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-foreground/40">
            <ClipboardList size={32} className="mx-auto mb-3 opacity-30" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                  {["Symbol", "Type", "Dir.", "Lots", "Price", "Status", "Created", ""].map((h) => (
                    <th key={h} className="whitespace-nowrap pb-3 pr-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <OrderRow key={order.id} order={order} onCancel={cancelOrder} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </WidgetCard>
    </div>
  );
}
