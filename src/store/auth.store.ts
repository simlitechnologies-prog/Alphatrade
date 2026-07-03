import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user, error: null }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      logout: () =>
        set({ user: null, isAuthenticated: false, error: null }),
    }),
    {
      name: "alphatrade-auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
