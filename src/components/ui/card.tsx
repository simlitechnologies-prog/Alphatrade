import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-primary/40 p-6",
        className
      )}
      {...props}
    />
  );
}

export function GlassCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass-panel rounded-[var(--radius-card)] p-6", className)}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "danger" | "accent";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    success: "bg-green-50 text-brand-success dark:bg-green-950",
    danger: "bg-red-50 text-brand-danger dark:bg-red-950",
    accent: "bg-amber-50 text-brand-accent dark:bg-amber-950",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
