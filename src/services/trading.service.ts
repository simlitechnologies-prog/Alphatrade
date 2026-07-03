/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Trading service — place orders, close positions, cancel orders.
 * Ready to wire to Firebase Cloud Functions or a REST trading API.
 */

import type { Order, TradeFormValues } from "@/types";
import { openPositions, pendingOrders } from "@/data/dashboard";

export interface OrderResult {
  success: boolean;
  order?: Partial<Order>;
  error?: string;
}

export interface PositionCloseResult {
  success: boolean;
  closedPnL?: number;
  error?: string;
}

// Place a new order
export async function placeOrder(values: TradeFormValues): Promise<OrderResult> {
  // Firebase Cloud Function:
  // const { httpsCallable } = await import("firebase/functions");
  // const { functions } = await import("@/lib/firebase");
  // const fn = httpsCallable(functions, "placeOrder");
  // const result = await fn(values);
  // return result.data as OrderResult;

  await new Promise((r) => setTimeout(r, 400));

  const order: Partial<Order> = {
    id: `ORD-${Date.now()}`,
    symbol: values.symbol,
    direction: values.direction,
    type: values.orderType,
    lots: values.lots,
    price: values.limitPrice ?? 0,
    stopLoss: values.stopLoss,
    takeProfit: values.takeProfit,
    status: values.orderType === "market" ? "filled" : "pending",
    createdAt: new Date().toISOString(),
  };

  return { success: true, order };
}

// Cancel a pending order
export async function cancelOrder(orderId: string): Promise<OrderResult> {
  await new Promise((r) => setTimeout(r, 300));
  const order = pendingOrders.find((o) => o.id === orderId);
  if (!order) return { success: false, error: "Order not found." };
  return { success: true, order: { ...order, status: "cancelled" } };
}

// Close an open position at market price
export async function closePosition(positionId: string): Promise<PositionCloseResult> {
  await new Promise((r) => setTimeout(r, 350));
  const position = openPositions.find((p) => p.id === positionId);
  if (!position) return { success: false, error: "Position not found." };
  return { success: true, closedPnL: position.pnl };
}

// Close all open positions
export async function closeAllPositions(): Promise<PositionCloseResult> {
  await new Promise((r) => setTimeout(r, 600));
  const totalPnL = openPositions.reduce((s, p) => s + p.pnl, 0);
  return { success: true, closedPnL: totalPnL };
}

// Modify SL/TP on an existing position
export async function modifyPosition(
  _positionId: string,
  _updates: Record<string, number | undefined>
): Promise<OrderResult> {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}

// Calculate required margin for a given trade
export async function calculateMargin(symbol: string, lots: number, leverage: number): Promise<number> {
  const { tickerAssets } = await import("@/data/markets");
  const asset = tickerAssets.find((a) => a.symbol === symbol);
  if (!asset) return 0;
  return (lots * asset.price) / leverage;
}
