import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "blue",
  alert = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: LucideIcon;
  tone?: "blue" | "green" | "red" | "amber" | "slate";
  alert?: boolean;
}) {
  const tones = {
    blue: "bg-blue-50 text-brand-secondary dark:bg-blue-950/30",
    green: "bg-green-50 text-brand-success dark:bg-green-950/30",
    red: "bg-red-50 text-brand-danger dark:bg-red-950/30",
    amber: "bg-amber-50 text-brand-accent dark:bg-amber-950/30",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800",
  };

  return (
    <div className={cn(
      "relative rounded-xl border bg-white p-5 dark:bg-slate-900",
      alert ? "border-brand-danger/40" : "border-slate-200 dark:border-slate-800"
    )}>
      {alert && <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-danger animate-pulse" />}
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-foreground/50 dark:text-slate-400">{label}</p>
        {Icon && (
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", tones[tone])}>
            <Icon size={15} />
          </span>
        )}
      </div>
      <p className="font-display tabular mt-2 text-2xl font-bold text-foreground dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && <p className="mt-1 text-xs text-foreground/45 dark:text-slate-500">{sub}</p>}
    </div>
  );
}

export function AdminCard({
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
    <div className={cn("rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900", className)}>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <h2 className="font-display text-sm font-semibold text-foreground dark:text-white">{title}</h2>
        {action && <div className="text-xs">{action}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="font-display text-xl font-bold text-foreground dark:text-white">{title}</h1>
        {sub && <p className="text-sm text-foreground/50 dark:text-slate-400">{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function StatusBadge({
  status,
  map,
}: {
  status: string;
  map: Record<string, { label: string; class: string }>;
}) {
  const entry = map[status] ?? { label: status, class: "bg-slate-100 text-slate-500" };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", entry.class)}>
      {entry.label}
    </span>
  );
}

export function ActionBtn({
  label,
  tone = "blue",
  onClick,
}: {
  label: string;
  tone?: "blue" | "green" | "red" | "amber";
  onClick?: () => void;
}) {
  const tones = {
    blue: "bg-blue-50 text-brand-secondary hover:bg-brand-secondary hover:text-white",
    green: "bg-green-50 text-brand-success hover:bg-brand-success hover:text-white",
    red: "bg-red-50 text-brand-danger hover:bg-brand-danger hover:text-white",
    amber: "bg-amber-50 text-brand-accent hover:bg-brand-accent hover:text-white",
  };
  return (
    <button onClick={onClick} className={cn("rounded px-2.5 py-1 text-xs font-medium transition-colors", tones[tone])}>
      {label}
    </button>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="whitespace-nowrap pb-3 pr-4 text-left text-xs font-medium text-foreground/50 dark:text-slate-500">
      {children}
    </th>
  );
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("py-3 pr-4 text-sm text-foreground dark:text-slate-300", className)}>
      {children}
    </td>
  );
}
