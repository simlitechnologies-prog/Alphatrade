import { useUIStore } from "@/store/ui.store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, STALE_TIMES } from "@/lib/query-provider";
import { fetchTransactions, initiateDeposit, requestWithdrawal, fetchWalletBalance } from "@/services/wallet.service";
import { useAuthStore } from "@/store/auth.store";
import type { DepositRequest, WithdrawalRequest } from "@/types";

const MOCK_USER_ID = "u001";

export function useWalletBalance(userId = MOCK_USER_ID) {
  return useQuery({
    queryKey: QUERY_KEYS.BALANCE(userId),
    queryFn: () => fetchWalletBalance(userId),
    staleTime: STALE_TIMES.PORTFOLIO,
    refetchInterval: 30_000,
  });
}

export function useTransactions(userId = MOCK_USER_ID) {
  return useQuery({
    queryKey: QUERY_KEYS.TRANSACTIONS(userId),
    queryFn: () => fetchTransactions(userId),
    staleTime: STALE_TIMES.PORTFOLIO,
  });
}

export function useInitiateDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DepositRequest) => initiateDeposit(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCE(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS(MOCK_USER_ID) });
    },
  });
}

export function useRequestWithdrawal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: WithdrawalRequest) => requestWithdrawal(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCE(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS(MOCK_USER_ID) });
    },
  });
}

// Auth hook
export function useAuth() {
  const { user, isAuthenticated, isLoading, error, setUser, setLoading, setError, logout } =
    useAuthStore();
  return { user, isAuthenticated, isLoading, error, setUser, setLoading, setError, logout };
}

// Local storage hook for theme
export function useTheme() {
  const { isDark, toggleTheme } = useUIStore();
  return { isDark, toggleTheme };
}


