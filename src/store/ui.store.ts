import { create } from "zustand";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  variant: ToastVariant;
  duration?: number;
}

export type ModalType =
  | "trade_confirm"
  | "close_position"
  | "cancel_order"
  | "deposit"
  | "withdrawal"
  | "kyc_upload"
  | "two_factor"
  | "alert_create"
  | null;

interface UIStore {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Modals
  activeModal: ModalType;
  modalData: Record<string, unknown> | null | undefined;
  openModal: (type: ModalType, data?: Record<string, unknown> | null) => void;
  closeModal: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Loading overlay
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  activeModal: null,
  modalData: null,
  openModal: (type, data) => set({ activeModal: type, modalData: data ?? null }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const duration = toast.duration ?? 4000;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    if (duration > 0) {
      setTimeout(() => get().removeToast(id), duration);
    }
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),

  isDark: false,
  toggleTheme: () => set((s) => ({ isDark: !s.isDark })),

  isGlobalLoading: false,
  setGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
}));

// Convenience helpers
export const toast = {
  success: (title: string, message?: string) =>
    useUIStore.getState().addToast({ title, message, variant: "success" }),
  error: (title: string, message?: string) =>
    useUIStore.getState().addToast({ title, message, variant: "error" }),
  warning: (title: string, message?: string) =>
    useUIStore.getState().addToast({ title, message, variant: "warning" }),
  info: (title: string, message?: string) =>
    useUIStore.getState().addToast({ title, message, variant: "info" }),
};
