// Alerts page
"use client";

import { useState } from "react";
import { Bell, Plus, Trash2 } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { watchlistItems } from "@/data/dashboard";

interface Alert {
  id: string;
  symbol: string;
  condition: "above" | "below";
  price: number;
  active: boolean;
  createdAt: string;
}

const initialAlerts: Alert[] = [
  { id: "a1", symbol: "EUR/USD", condition: "above", price: 1.0950, active: true, createdAt: "2026-06-28" },
  { id: "a2", symbol: "NVDA", condition: "above", price: 130.00, active: true, createdAt: "2026-06-29" },
  { id: "a3", symbol: "XAU/USD", condition: "below", price: 2300.00, active: false, createdAt: "2026-06-27" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [symbol, setSymbol] = useState("EUR/USD");
  const [condition, setCondition] = useState<"above" | "below">("above");
  const [price, setPrice] = useState("");

  function addAlert() {
    if (!price) return;
    setAlerts((prev) => [
      ...prev,
      { id: `a${Date.now()}`, symbol, condition, price: parseFloat(price), active: true, createdAt: new Date().toISOString().slice(0, 10) },
    ]);
    setPrice("");
  }

  function toggleAlert(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  }

  function deleteAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Price Alerts</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WidgetCard title="Create alert">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Instrument</label>
              <select value={symbol} onChange={(e) => setSymbol(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground dark:border-slate-700 dark:bg-slate-900">
                {watchlistItems.map((w) => <option key={w.symbol}>{w.symbol}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["above", "below"] as const).map((c) => (
                <button key={c} onClick={() => setCondition(c)} className={cn("rounded-lg py-2.5 text-sm font-medium capitalize transition-colors", condition === c ? "bg-brand-secondary text-white" : "bg-brand-muted text-foreground/60")}>
                  Price {c}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Alert price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price…" className="h-11 w-full rounded-lg border border-slate-200 bg-brand-muted px-3 text-sm text-foreground focus:border-brand-secondary dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <Button variant="primary" size="md" className="w-full gap-2" onClick={addAlert}>
              <Plus size={15} /> Create alert
            </Button>
          </div>
        </WidgetCard>

        <WidgetCard title={`Active alerts (${alerts.filter((a) => a.active).length})`}>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className={cn("flex items-center gap-3 rounded-lg border p-3 transition-colors", alert.active ? "border-brand-secondary/30 bg-brand-secondary/5" : "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900/20")}>
                <Bell size={14} className={alert.active ? "text-brand-secondary" : "text-foreground/30"} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{alert.symbol}</p>
                  <p className="text-xs text-foreground/50 capitalize">{alert.condition} {formatPrice(alert.price, alert.price > 100 ? 2 : 4)}</p>
                </div>
                <button onClick={() => toggleAlert(alert.id)} className={cn("h-5 w-9 rounded-full transition-colors", alert.active ? "bg-brand-secondary" : "bg-slate-300")}>
                  <span className={cn("block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform shadow", alert.active && "translate-x-4")} />
                </button>
                <button onClick={() => deleteAlert(alert.id)} className="text-foreground/30 hover:text-brand-danger transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
