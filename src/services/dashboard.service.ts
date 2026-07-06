import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase/config";
import {
  STATIC_PORTFOLIO,
  STATIC_POSITIONS,
  STATIC_WATCHLIST,
  STATIC_ORDERS,
  STATIC_PORTFOLIO_GROWTH,
  STATIC_DAILY_PNL,
  STATIC_ALLOCATION,
  STATIC_NEWS,
  STATIC_CALENDAR_EVENTS,
} from "../../data/static-users";

// Check if user is the static German demo user
export function isStaticDemoUser(userId: string): boolean {
  console.log("🔍 Checking if user is static demo:", userId);

  // Demo user UIDs
  const demoUserIds = [
    "static_demo_user",
    "DeOF7uGDm8cUKK37yhLq9Hka4rn2",
    "lKyUS99fg8RVHp5JaG5FEOfzg922",
  ];

  // Check by UID
  if (demoUserIds.includes(userId)) {
    console.log("✅ User is demo user by UID");
    return true;
  }

  // Also check by email if available
  try {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
      const demoEmails = ["kwame@example.com", "lukas.schneider@example.de"];
      const isDemoEmail = demoEmails.includes(currentUser.email);
      if (isDemoEmail) {
        console.log("✅ User is demo user by email:", currentUser.email);
        return true;
      }
    }
  } catch (error) {
    console.error("Error checking email:", error);
  }

  console.log("❌ User is NOT a demo user");
  return false;
}

// Alternative: Check by email
export function isDemoEmail(email: string): boolean {
  const demoEmails = ["kwame@example.com", "lukas.schneider@example.de"];
  return demoEmails.includes(email);
}

// Get user data (static or from Firestore)
export async function getUserData(userId: string) {
  console.log("📝 Getting user data for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("📝 Returning static user data");
    return {
      uid: userId,
      firstName: "Lukas",
      lastName: "Schneider",
      displayName: "Lukas Schneider",
      email: "lukas.schneider@example.de",
      country: "DE",
      phoneNumber: "+49 176 45298173",
      emailVerified: true,
      isActive: true,
      role: "user",
      isStaticUser: true,
    };
  }

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      console.log("📝 User data found in Firestore");
      return userDoc.data();
    }
    console.log("📝 No user data found in Firestore");
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Get portfolio data
export async function getPortfolioData(userId: string) {
  console.log("💰 Getting portfolio data for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("💰 Returning static portfolio data");
    return STATIC_PORTFOLIO;
  }

  try {
    const portfolioDoc = await getDoc(doc(db, "portfolios", userId));
    if (portfolioDoc.exists()) {
      console.log("💰 Portfolio data found in Firestore");
      return portfolioDoc.data();
    }

    console.log("💰 No portfolio data found, returning empty");
    return {
      balance: 0,
      equity: 0,
      freeMargin: 0,
      usedMargin: 0,
      marginLevel: 0,
      todayPnL: 0,
      todayPnLPercent: 0,
      weeklyPnL: 0,
      allTimePnL: 0,
      allTimePnLPercent: 0,
      currency: "EUR",
    };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Get positions
export async function getPositions(userId: string) {
  console.log("📊 Getting positions for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("📊 Returning static positions");
    return STATIC_POSITIONS;
  }

  try {
    const positionsQuery = query(
      collection(db, "positions"),
      where("userId", "==", userId),
      where("status", "==", "open"),
    );
    const snapshot = await getDocs(positionsQuery);
    const positions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(`📊 Found ${positions.length} positions`);
    return positions;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

// Get watchlist
export async function getWatchlist(userId: string) {
  console.log("👀 Getting watchlist for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("👀 Returning static watchlist");
    return STATIC_WATCHLIST.map((item) => ({
      ...item,
      id: item.symbol,
    }));
  }

  try {
    const watchlistQuery = query(
      collection(db, "watchlists"),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(watchlistQuery);
    const watchlist = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(`👀 Found ${watchlist.length} watchlist items`);
    return watchlist;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
}

// Get pending orders
export async function getPendingOrders(userId: string) {
  console.log("📝 Getting pending orders for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("📝 Returning static pending orders");
    return STATIC_ORDERS.filter((order) => order.status === "pending");
  }

  try {
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      where("status", "==", "pending"),
    );
    const snapshot = await getDocs(ordersQuery);
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(`📝 Found ${orders.length} pending orders`);
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

// Get portfolio growth data
export async function getPortfolioGrowth(userId: string) {
  console.log("📈 Getting portfolio growth for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("📈 Returning static portfolio growth");
    return STATIC_PORTFOLIO_GROWTH;
  }

  try {
    const growthQuery = query(
      collection(db, "portfolioHistory"),
      where("userId", "==", userId),
      orderBy("month", "asc"),
    );
    const snapshot = await getDocs(growthQuery);
    if (!snapshot.empty) {
      const data = snapshot.docs.map((doc) => doc.data());
      console.log(`📈 Found ${data.length} growth data points`);
      return data;
    }
    console.log("📈 No growth data found");
    return [];
  } catch (error) {
    console.error("Error fetching growth data:", error);
    return [];
  }
}

// Get daily P&L
export async function getDailyPnL(userId: string) {
  console.log("📊 Getting daily P&L for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("📊 Returning static daily P&L");
    return STATIC_DAILY_PNL;
  }

  try {
    const pnlQuery = query(
      collection(db, "dailyPnL"),
      where("userId", "==", userId),
      orderBy("day", "asc"),
    );
    const snapshot = await getDocs(pnlQuery);
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => doc.data());
    }

    return [
      { day: "Mon", pnl: 0 },
      { day: "Tue", pnl: 0 },
      { day: "Wed", pnl: 0 },
      { day: "Thu", pnl: 0 },
      { day: "Fri", pnl: 0 },
      { day: "Sat", pnl: 0 },
      { day: "Sun", pnl: 0 },
    ];
  } catch (error) {
    console.error("Error fetching daily P&L:", error);
    return [];
  }
}

// Get allocation
export async function getAllocation(userId: string) {
  console.log("🎯 Getting allocation for:", userId);

  if (isStaticDemoUser(userId)) {
    console.log("🎯 Returning static allocation");
    return STATIC_ALLOCATION;
  }

  try {
    const allocationQuery = query(
      collection(db, "allocations"),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(allocationQuery);
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => doc.data());
    }

    return [{ name: "No Holdings", value: 100, color: "#E5E7EB" }];
  } catch (error) {
    console.error("Error fetching allocation:", error);
    return [];
  }
}

// Get news (always show static news for now)
export async function getNews() {
  return STATIC_NEWS;
}

// Get calendar events (always show static events)
export async function getCalendarEvents() {
  return STATIC_CALENDAR_EVENTS;
}
