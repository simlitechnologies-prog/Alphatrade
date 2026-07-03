"use client";


import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useUIStore, type Toast } from "@/store/ui.store";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "border-brand-success/20 bg-green-50 dark:bg-green-950/40",
  error: "border-brand-danger/20 bg-red-50 dark:bg-red-950/40",
  warning: "border-brand-accent/20 bg-amber-50 dark:bg-amber-950/40",
  info: "border-brand-secondary/20 bg-blue-50 dark:bg-blue-950/40",
};

const iconStyles = {
  success: "text-brand-success",
  error: "text-brand-danger",
  warning: "text-brand-accent",
  info: "text-brand-secondary",
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUIStore((s) => s.removeToast);
  const Icon = icons[toast.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg",
        styles[toast.variant]
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", iconStyles[toast.variant])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{toast.title}</p>
        {toast.message && (
          <p className="mt-0.5 text-xs text-foreground/65">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-foreground/40 hover:text-foreground transition-colors"
      >
        <X size={15} />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
