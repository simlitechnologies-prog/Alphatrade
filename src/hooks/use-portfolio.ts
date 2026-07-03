import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, STALE_TIMES } from "@/lib/query-provider";
import { placeOrder, cancelOrder, closePosition } from "@/services/trading.service";
import { openPositions, pendingOrders, recentOrders, portfolioStats } from "@/data/dashboard";
import type { TradeFormValues } from "@/lib/schemas";

const MOCK_USER_ID = "u001";

// Fetch portfolio summary
export function usePortfolio(userId = MOCK_USER_ID) {
  return useQuery({
    queryKey: QUERY_KEYS.PORTFOLIO(userId),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return portfolioStats;
    },
    staleTime: STALE_TIMES.PORTFOLIO,
    refetchInterval: STALE_TIMES.PORTFOLIO,
  });
}

// Fetch open positions
export function usePositions(userId = MOCK_USER_ID) {
  return useQuery({
    queryKey: QUERY_KEYS.POSITIONS(userId),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return openPositions;
    },
    staleTime: STALE_TIMES.PORTFOLIO,
    refetchInterval: STALE_TIMES.PORTFOLIO,
  });
}

// Fetch all orders
export function useOrders(userId = MOCK_USER_ID) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS(userId),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return [...pendingOrders, ...recentOrders];
    },
    staleTime: STALE_TIMES.PORTFOLIO,
  });
}

// Place order mutation
export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TradeFormValues) => placeOrder(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSITIONS(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PORTFOLIO(MOCK_USER_ID) });
    },
  });
}

// Cancel order mutation
export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS(MOCK_USER_ID) });
    },
  });
}

// Close position mutation
export function useClosePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (positionId: string) => closePosition(positionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSITIONS(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PORTFOLIO(MOCK_USER_ID) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS(MOCK_USER_ID) });
    },
  });
}
