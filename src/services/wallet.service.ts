/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Transaction, DepositRequest, WithdrawalRequest } from "@/types";
import { transactions, portfolioStats } from "@/data/dashboard";

export interface WalletResult {
  success: boolean;
  transactionId?: string;
  redirectUrl?: string;
  error?: string;
}

export async function initiateDeposit(request: DepositRequest): Promise<WalletResult> {
  await new Promise((r) => setTimeout(r, 500));
  return {
    success: true,
    transactionId: `DEP-${Date.now()}`,
    redirectUrl: request.method === "card" ? "https://checkout.placeholder.example" : undefined,
  };
}

export async function requestWithdrawal(request: WithdrawalRequest): Promise<WalletResult> {
  await new Promise((r) => setTimeout(r, 600));
  if (request.amount > portfolioStats.freeMargin) {
    return { success: false, error: "Insufficient free margin for this withdrawal amount." };
  }
  return { success: true, transactionId: `WDR-${Date.now()}` };
}

export async function fetchTransactions(_userId?: string, _limit?: number): Promise<Transaction[]> {
  await new Promise((r) => setTimeout(r, 200));
  // Firestore:
  // const { collection, query, where, orderBy, getDocs } = await import("firebase/firestore");
  // const { db, COLLECTIONS } = await import("@/lib/firebase");
  // const q = query(collection(db, COLLECTIONS.TRANSACTIONS), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(limit));
  // const snap = await getDocs(q);
  // return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));

  return transactions as unknown as Transaction[];
}

export async function fetchWalletBalance(_userId?: string): Promise<number> {
  await new Promise((r) => setTimeout(r, 150));
  return portfolioStats.balance;
}
