import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sub,
  trend,
  icon: Icon,
  accent = "blue",
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: number;
  icon?: LucideIcon;
  accent?: "blue" | "green" | "red" | "amber";
}) {
  const accentMap = {
    blue: "bg-brand-secondary/10 text-brand-secondary",
    green: "bg-brand-success/10 text-brand-success",
    red: "bg-brand-danger/10 text-brand-danger",
    amber: "bg-brand-accent/10 text-brand-accent",
  };

  const isUp = trend !== undefined && trend >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-brand-primary/40">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-foreground/50">{label}</p>
        {Icon && (
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", accentMap[accent])}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <p className="font-display tabular mt-2 text-2xl font-bold text-foreground">{value}</p>
      {(sub || trend !== undefined) && (
        <div className="mt-1.5 flex items-center gap-2">
          {trend !== undefined && (
            <span className={cn("flex items-center gap-0.5 text-xs font-medium", isUp ? "text-brand-success" : "text-brand-danger")}>
              {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {formatPercent(trend)}
            </span>
          )}
          {sub && <p className="text-xs text-foreground/45">{sub}</p>}
        </div>
      )}
    </div>
  );
}

export function WidgetCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-brand-primary/40", className)}>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <h2 className="font-display text-sm font-semibold text-foreground">{title}</h2>
        {action && <div className="text-xs text-foreground/50">{action}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function PnLBadge({ value, percent }: { value: number; percent: number }) {
  const isUp = value >= 0;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", isUp ? "bg-green-50 text-brand-success dark:bg-green-950/40" : "bg-red-50 text-brand-danger dark:bg-red-950/40")}>
      {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {isUp ? "+" : ""}{formatCurrency(value)} ({formatPercent(percent)})
    </span>
  );
}
