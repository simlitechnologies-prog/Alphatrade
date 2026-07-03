// Firebase initialisation — fill environment variables in .env.local before connecting.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
};

export const COLLECTIONS = {
  USERS: "users", WALLETS: "wallets", PORTFOLIOS: "portfolios",
  WATCHLISTS: "watchlists", ORDERS: "orders", POSITIONS: "positions",
  TRADES: "trades", TRANSACTIONS: "transactions", MARKETS: "markets",
  NEWS: "news", ALERTS: "alerts", NOTIFICATIONS: "notifications",
  SUPPORT_TICKETS: "supportTickets", TICKET_MESSAGES: "ticketMessages",
  KYC_APPLICATIONS: "kycApplications", KYC_DOCUMENTS: "kycDocuments",
  AML_FLAGS: "amlFlags", CALENDAR_EVENTS: "calendarEvents",
  ADMINS: "admins", ADMIN_ROLES: "adminRoles", SETTINGS: "settings",
  SESSIONS: "sessions", AUDIT_LOGS: "auditLogs",
} as const;

export const STORAGE_PATHS = {
  KYC_DOCUMENTS: (userId: string) => `kyc/${userId}/documents`,
  KYC_SELFIES: (userId: string) => `kyc/${userId}/selfies`,
  AVATARS: (userId: string) => `avatars/${userId}`,
  NEWS_IMAGES: (articleId: string) => `news/${articleId}`,
} as const;

export const CLOUD_FUNCTIONS = {
  ON_USER_CREATED: "onUserCreated",
  SEND_VERIFICATION_EMAIL: "sendVerificationEmail",
  PLACE_ORDER: "placeOrder", CANCEL_ORDER: "cancelOrder",
  CLOSE_POSITION: "closePosition", CALCULATE_MARGIN: "calculateMargin",
  INITIATE_DEPOSIT: "initiateDeposit", PROCESS_WITHDRAWAL: "processWithdrawal",
  UPDATE_WALLET_BALANCE: "updateWalletBalance",
  SUBMIT_KYC: "submitKYCApplication", APPROVE_KYC: "approveKYCApplication",
  REJECT_KYC: "rejectKYCApplication", CREATE_AML_FLAG: "createAMLFlag",
  SEND_PUSH_NOTIFICATION: "sendPushNotification",
  BROADCAST_NOTIFICATION: "broadcastNotification",
  SUSPEND_USER: "suspendUser", ACTIVATE_USER: "activateUser",
  GENERATE_REPORT: "generateReport",
} as const;

/*
 * Integration: npm install firebase, fill .env.local, then uncomment:
 *
 * import { initializeApp, getApps, getApp } from "firebase/app";
 * import { getAuth } from "firebase/auth";
 * import { getFirestore } from "firebase/firestore";
 * import { getStorage } from "firebase/storage";
 * import { getFunctions } from "firebase/functions";
 *
 * const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
 * export const auth      = getAuth(app);
 * export const db        = getFirestore(app);
 * export const storage   = getStorage(app);
 * export const functions = getFunctions(app, "europe-west1");
 */
