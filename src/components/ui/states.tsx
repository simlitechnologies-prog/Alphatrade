import { AlertTriangle, RefreshCw, Inbox, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Error state ─────────────────────────────────────────────────────────────

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-brand-danger dark:bg-red-950/40">
        <AlertTriangle size={24} />
      </span>
      <h3 className="font-display mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-foreground/55">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-5 gap-2">
          <RefreshCw size={14} />
          Try again
        </Button>
      )}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-muted text-foreground/30">
        <Icon size={24} />
      </span>
      <h3 className="font-display mt-4 text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-xs text-sm text-foreground/55">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ─── No search results ────────────────────────────────────────────────────────

export function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search size={28} className="text-foreground/20" />
      <p className="mt-3 text-sm font-medium text-foreground">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-1 text-xs text-foreground/50">
        Try a different symbol or name.
      </p>
    </div>
  );
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-brand-primary">
        <div className="flex items-center gap-3 mb-3">
          <span className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            variant === "danger" ? "bg-red-50 text-brand-danger" : "bg-blue-50 text-brand-secondary"
          )}>
            <AlertTriangle size={18} />
          </span>
          <h3 className="font-display font-bold text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-foreground/65 mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="outline" size="md" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            size="md"
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Loading overlay ──────────────────────────────────────────────────────────

export function LoadingOverlay({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-secondary/10">
        <RefreshCw size={28} className="animate-spin text-brand-secondary" />
      </div>
      <p className="mt-4 text-sm font-medium text-foreground/60">{message}</p>
    </div>
  );
}
