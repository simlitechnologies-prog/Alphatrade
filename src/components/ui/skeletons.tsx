import * as React from "react";
import { cn } from "@/lib/utils";

function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
        className
      )}
      style={style}
    />
  );
}

// Generic card skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-brand-primary/40", className)}>
      <Shimmer className="h-3 w-24" />
      <Shimmer className="mt-3 h-7 w-32" />
      <Shimmer className="mt-2 h-3 w-20" />
    </div>
  );
}

// Stat card row skeleton (4 cards)
export function StatRowSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Chart area skeleton
export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-brand-primary/40">
      <Shimmer className="h-4 w-40 mb-4" />
      <Shimmer style={{ height }} className="w-full rounded-lg" />
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-brand-primary/40">
      <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <Shimmer className="h-4 w-32" />
      </div>
      <div className="p-5">
        {/* Header row */}
        <div className="mb-4 flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Shimmer key={i} className="h-3 flex-1" />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="mb-3 flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <Shimmer key={j} className={cn("h-4 flex-1", j === 0 && "flex-[1.5]")} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Market card skeleton
export function MarketCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-6 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <Shimmer className="h-5 w-16" />
        <Shimmer className="h-5 w-16" />
      </div>
      <Shimmer className="h-5 w-20 mt-4" />
      <Shimmer className="h-3 w-28 mt-1" />
      <Shimmer className="h-7 w-24 mt-4" />
      <Shimmer className="h-3 w-16 mt-1" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Shimmer className="h-9" />
        <Shimmer className="h-9" />
      </div>
    </div>
  );
}

// Market grid skeleton
export function MarketGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <MarketCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Dashboard full-page skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Shimmer className="h-6 w-48" />
          <Shimmer className="h-3 w-36 mt-2" />
        </div>
        <Shimmer className="h-7 w-32 rounded-full" />
      </div>
      <StatRowSkeleton />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartSkeleton height={200} />
        <ChartSkeleton height={200} />
        <ChartSkeleton height={200} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TableSkeleton rows={4} cols={3} />
        <TableSkeleton rows={6} cols={3} />
      </div>
    </div>
  );
}

// News feed skeleton
export function NewsFeedSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800">
          <div className="flex gap-2 mb-3">
            <Shimmer className="h-5 w-16 rounded-full" />
            <Shimmer className="h-5 w-12 rounded-full" />
          </div>
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-3/4 mt-2" />
          <Shimmer className="h-3 w-32 mt-3" />
        </div>
      ))}
    </div>
  );
}

// Position row skeleton
export function PositionRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg bg-brand-muted px-3 py-3 dark:bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <Shimmer className="h-2 w-2 rounded-full" />
            <div>
              <Shimmer className="h-4 w-16" />
              <Shimmer className="h-3 w-20 mt-1" />
            </div>
          </div>
          <div className="text-right">
            <Shimmer className="h-4 w-16" />
            <Shimmer className="h-3 w-10 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
