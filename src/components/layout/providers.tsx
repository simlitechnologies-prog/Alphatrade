"use client";

import { QueryProvider } from "@/lib/query-provider";
import { ToastContainer } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <ToastContainer />
    </QueryProvider>
  );
}
