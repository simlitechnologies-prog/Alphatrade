import dotenv from "dotenv";
import path from "path";

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if config is loaded
if (!firebaseConfig.apiKey) {
  console.error("❌ Firebase config not found!");
  console.error(
    "Make sure .env.local exists with NEXT_PUBLIC_FIREBASE_API_KEY",
  );
  process.exit(1);
}

console.log("✅ Firebase config loaded!");
console.log(
  `📧 Demo Email: ${process.env.NEXT_PUBLIC_DEMO_EMAIL || "lukas.schneider@gmail.com"}`,
);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Demo credentials
const DEMO_EMAIL =
  process.env.NEXT_PUBLIC_DEMO_EMAIL || "lukas.schneider@gmail.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "lukas@2024";

// Helper function to create safe document IDs (replace special characters)
function safeDocId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "_");
}

async function createDemoUser() {
  try {
    console.log("🔄 Setting up demo user...");
    console.log(`📧 Email: ${DEMO_EMAIL}`);

    // Check if user already exists
    console.log("🔍 Checking if user already exists...");
    let userExists = false;
    let existingUid = null;

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, DEMO_EMAIL);
      if (signInMethods && signInMethods.length > 0) {
        userExists = true;
        console.log("✅ User already exists with methods:", signInMethods);

        // Try to find the user's UID from Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", DEMO_EMAIL));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          existingUid = snapshot.docs[0].id;
          console.log(`📋 Found existing user with UID: ${existingUid}`);
        }
      }
    } catch (error: any) {
      console.log("ℹ️ User does not exist yet, will create new account");
    }

    let userId;

    if (userExists && existingUid) {
      userId = existingUid;
      console.log(`✅ Using existing user with UID: ${userId}`);
    } else if (userExists) {
      console.error(
        "❌ User exists in Auth but not in Firestore. Please delete the user from Firebase Auth first.",
      );
      console.log(
        "💡 Go to Firebase Console > Authentication > Users > Delete this user",
      );
      process.exit(1);
      return;
    } else {
      // Create the user
      console.log("📝 Creating demo user in Firebase Auth...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        DEMO_EMAIL,
        DEMO_PASSWORD,
      );
      const user = userCredential.user;
      userId = user.uid;
      console.log(`✅ Demo user created with UID: ${userId}`);
    }

    // === 1. CREATE USER PROFILE ===
    console.log("📝 Creating user profile in Firestore...");
    await setDoc(doc(db, "users", userId), {
      uid: userId,
      firstName: "Lukas",
      lastName: "Schneider",
      displayName: "Lukas Schneider",
      email: DEMO_EMAIL,
      country: "DE",
      phoneNumber: "+49 176 45298173",
      emailVerified: true,
      isActive: true,
      role: "user",
      isStaticUser: true,
      createdAt: new Date("2010-03-18T09:45:00"),
      lastLogin: serverTimestamp(),
    });

    // === 2. CREATE PORTFOLIO ===
    console.log("📝 Creating portfolio...");
    await setDoc(doc(db, "portfolios", userId), {
      userId: userId,
      balance: 1385420.75,
      equity: 1428735.6,
      freeMargin: 1265000.0,
      usedMargin: 163735.6,
      marginLevel: 872.35,
      todayPnL: 6842.55,
      todayPnLPercent: 0.48,
      weeklyPnL: 28150.8,
      allTimePnL: 912735.25,
      allTimePnLPercent: 192.64,
      currency: "EUR",
      updatedAt: serverTimestamp(),
    });

    // === 3. CREATE POSITIONS (FIXED: Uppercase direction, proper structure) ===
    console.log("📝 Creating positions...");
    const positions = [
      {
        id: "pos-1",
        userId: userId,
        symbol: "EUR/USD",
        direction: "BUY", // ✅ FIXED: uppercase
        lots: 18.5,
        entryPrice: 1.0715,
        currentPrice: 1.1248,
        pnl: 98540.75,
        pnlPercent: 4.98,
        status: "open",
        openDate: new Date("2013-08-19T11:20:00"),
        stopLoss: 1.045,
        takeProfit: 1.16,
        createdAt: new Date("2013-08-19T11:20:00"),
      },
      {
        id: "pos-2",
        userId: userId,
        symbol: "BTC/USD",
        direction: "BUY",
        lots: 6.5,
        entryPrice: 23850,
        currentPrice: 118650,
        pnl: 616200.0,
        pnlPercent: 397.48,
        status: "open",
        openDate: new Date("2020-11-09T13:10:00"),
        stopLoss: 21000,
        takeProfit: 135000,
        createdAt: new Date("2020-11-09T13:10:00"),
      },
      {
        id: "pos-3",
        userId: userId,
        symbol: "DE40",
        direction: "BUY",
        lots: 25,
        entryPrice: 12180,
        currentPrice: 24360,
        pnl: 304500.0,
        pnlPercent: 100.0,
        status: "open",
        openDate: new Date("2016-05-11T09:30:00"),
        stopLoss: 11800,
        takeProfit: 25000,
        createdAt: new Date("2016-05-11T09:30:00"),
      },
      {
        id: "pos-4",
        userId: userId,
        symbol: "XAU/USD",
        direction: "BUY",
        lots: 32,
        entryPrice: 1765,
        currentPrice: 3348,
        pnl: 506560.0,
        pnlPercent: 89.69,
        status: "open",
        openDate: new Date("2018-02-21T14:15:00"),
        stopLoss: 1700,
        takeProfit: 3500,
        createdAt: new Date("2018-02-21T14:15:00"),
      },
    ];

    for (const position of positions) {
      const docId = safeDocId(`${userId}_${position.id}`);
      await setDoc(doc(db, "positions", docId), position);
    }

    // === 4. CREATE WATCHLIST (FIXED: Added id field) ===
    console.log("📝 Creating watchlist...");
    const watchlist = [
      {
        id: "watch-1", // ✅ FIXED: Added id
        userId: userId,
        symbol: "BTC/USD", // ✅ FIXED: Use display format
        name: "Bitcoin",
        price: 118650,
        changePercent: 3.82,
        createdAt: serverTimestamp(),
      },
      {
        id: "watch-2",
        userId: userId,
        symbol: "ETH/USD",
        name: "Ethereum",
        price: 6840,
        changePercent: 2.41,
        createdAt: serverTimestamp(),
      },
      {
        id: "watch-3",
        userId: userId,
        symbol: "EUR/USD",
        name: "Euro/US Dollar",
        price: 1.1248,
        changePercent: 0.63,
        createdAt: serverTimestamp(),
      },
      {
        id: "watch-4",
        userId: userId,
        symbol: "DE40",
        name: "Germany 40",
        price: 24360,
        changePercent: 1.45,
        createdAt: serverTimestamp(),
      },
      {
        id: "watch-5",
        userId: userId,
        symbol: "XAU/USD",
        name: "Gold",
        price: 3348,
        changePercent: 0.91,
        createdAt: serverTimestamp(),
      },
      {
        id: "watch-6",
        userId: userId,
        symbol: "US500",
        name: "S&P 500",
        price: 7285,
        changePercent: 0.52,
        createdAt: serverTimestamp(),
      },
    ];

    for (const item of watchlist) {
      const docId = safeDocId(`${userId}_${item.id}`);
      await setDoc(doc(db, "watchlists", docId), item);
    }

    // === 5. CREATE ORDERS (FIXED: Added side and quantity) ===
    console.log("📝 Creating order history...");
    const orders = [
      {
        id: "ord-1",
        userId: userId,
        symbol: "EUR/USD",
        type: "market",
        side: "BUY", // ✅ FIXED: Added side
        price: 1.0715,
        quantity: 8, // ✅ FIXED: Added quantity
        status: "filled",
        createdAt: new Date("2012-07-18T10:25:00"),
        filledAt: new Date("2012-07-18T10:25:06"),
      },
      {
        id: "ord-2",
        userId: userId,
        symbol: "DE40",
        type: "market",
        side: "BUY",
        price: 12180,
        quantity: 15,
        status: "filled",
        createdAt: new Date("2016-05-11T09:30:00"),
        filledAt: new Date("2016-05-11T09:30:04"),
      },
      {
        id: "ord-3",
        userId: userId,
        symbol: "BTC/USD",
        type: "market",
        side: "BUY",
        price: 23850,
        quantity: 6.5,
        status: "filled",
        createdAt: new Date("2020-11-09T13:10:00"),
        filledAt: new Date("2020-11-09T13:10:05"),
      },
      {
        id: "ord-4",
        userId: userId,
        symbol: "XAU/USD",
        type: "market",
        side: "BUY",
        price: 1765,
        quantity: 32,
        status: "filled",
        createdAt: new Date("2018-02-21T14:15:00"),
        filledAt: new Date("2018-02-21T14:15:08"),
      },
    ];

    for (const order of orders) {
      const docId = safeDocId(`${userId}_${order.id}`);
      await setDoc(doc(db, "orders", docId), order);
    }

    // === 6. CREATE PORTFOLIO GROWTH DATA ===
    console.log("📝 Creating portfolio growth data...");
    const growthData = [
      { month: "2010", value: 50000 },
      { month: "2012", value: 112400 },
      { month: "2014", value: 218650 },
      { month: "2016", value: 387200 },
      { month: "2018", value: 563480 },
      { month: "2020", value: 752960 },
      { month: "2022", value: 968340 },
      { month: "2024", value: 1215400 },
      { month: "2026", value: 1385421 },
    ];

    for (const data of growthData) {
      const docId = safeDocId(`${userId}_${data.month}`);
      await setDoc(doc(db, "portfolioHistory", docId), {
        userId: userId,
        month: data.month,
        value: data.value,
        createdAt: serverTimestamp(),
      });
    }

    // === 7. CREATE DAILY P&L DATA (NEW - was missing) ===
    console.log("📝 Creating daily P&L data...");
    const dailyPnL = [
      { day: "Mon", pnl: 1250 },
      { day: "Tue", pnl: -320 },
      { day: "Wed", pnl: 2840 },
      { day: "Thu", pnl: 950 },
      { day: "Fri", pnl: 2122.55 }, // Today's P&L
    ];

    for (const data of dailyPnL) {
      const docId = safeDocId(`${userId}_${data.day}`);
      await setDoc(doc(db, "dailyPnL", docId), {
        userId: userId,
        day: data.day,
        pnl: data.pnl,
        createdAt: serverTimestamp(),
      });
    }

    // === 8. CREATE ALLOCATION DATA (NEW - was missing) ===
    console.log("📝 Creating allocation data...");
    const allocation = [
      { name: "Forex", value: 25, color: "#2563EB" },
      { name: "Crypto", value: 35, color: "#F59E0B" },
      { name: "Indices", value: 30, color: "#10B981" },
      { name: "Commodities", value: 10, color: "#8B5CF6" },
    ];

    for (const item of allocation) {
      const docId = safeDocId(`${userId}_${item.name}`);
      await setDoc(doc(db, "allocations", docId), {
        userId: userId,
        name: item.name,
        value: item.value,
        color: item.color,
        createdAt: serverTimestamp(),
      });
    }

    // === 9. CREATE NEWS (NEW - was missing) ===
    console.log("📝 Creating news items...");
    const news = [
      {
        id: "news-1",
        title: "Fed signals potential rate cuts in 2026 amid easing inflation",
        category: "Economy",
        time: "2 hours ago",
        impact: "high",
        createdAt: serverTimestamp(),
      },
      {
        id: "news-2",
        title: "Bitcoin breaks $120,000 as institutional adoption accelerates",
        category: "Crypto",
        time: "4 hours ago",
        impact: "high",
        createdAt: serverTimestamp(),
      },
      {
        id: "news-3",
        title: "European markets rally as German economic data beats forecasts",
        category: "Markets",
        time: "6 hours ago",
        impact: "medium",
        createdAt: serverTimestamp(),
      },
      {
        id: "news-4",
        title: "Gold surges to new all-time high above $3,300",
        category: "Commodities",
        time: "8 hours ago",
        impact: "medium",
        createdAt: serverTimestamp(),
      },
    ];

    for (const item of news) {
      const docId = safeDocId(`${userId}_${item.id}`);
      await setDoc(doc(db, "news", docId), {
        ...item,
        userId: userId,
      });
    }

    // === 10. CREATE CALENDAR EVENTS (NEW - was missing) ===
    console.log("📝 Creating calendar events...");
    const calendar = [
      {
        id: "cal-1",
        event: "ECB Interest Rate Decision",
        country: "EUR",
        date: "2026-07-10",
        time: "12:45",
        impact: "high",
        createdAt: serverTimestamp(),
      },
      {
        id: "cal-2",
        event: "US CPI Data Release",
        country: "US",
        date: "2026-07-11",
        time: "14:30",
        impact: "high",
        createdAt: serverTimestamp(),
      },
      {
        id: "cal-3",
        event: "Germany Industrial Production",
        country: "DE",
        date: "2026-07-08",
        time: "08:00",
        impact: "medium",
        createdAt: serverTimestamp(),
      },
      {
        id: "cal-4",
        event: "UK GDP Preliminary Q2",
        country: "UK",
        date: "2026-07-12",
        time: "09:30",
        impact: "medium",
        createdAt: serverTimestamp(),
      },
    ];

    for (const item of calendar) {
      const docId = safeDocId(`${userId}_${item.id}`);
      await setDoc(doc(db, "calendarEvents", docId), {
        ...item,
        userId: userId,
      });
    }

    console.log("✅✅✅ Demo user setup complete! ✅✅✅");
    console.log("═══════════════════════════════════════");
    console.log(`📧 Email: ${DEMO_EMAIL}`);
    console.log(`🔑 Password: ${DEMO_PASSWORD}`);
    console.log(`👤 Name: Lukas Schneider (German Trader)`);
    console.log(`📍 Country: Germany (DE)`);
    console.log(`💰 Portfolio Value: €1,385,420.75`);
    console.log(`📈 All-Time P&L: €912,735.25 (192.64%)`);
    console.log(`📊 Open Positions: 4`);
    console.log(`📋 Watchlist Items: 6`);
    console.log(`📝 Pending Orders: 0 (historical orders: 4)`);
    console.log("═══════════════════════════════════════");
    console.log("🎯 You can now log in with these credentials!");

    // === VERIFICATION ===
    console.log("\n🔍 Verifying data...");
    const verifyCollection = async (collectionName: string) => {
      const q = query(
        collection(db, collectionName),
        where("userId", "==", userId),
      );
      const snapshot = await getDocs(q);
      console.log(
        `📊 ${collectionName}: ${snapshot.docs.length} documents found`,
      );
      return snapshot.docs.length;
    };

    await verifyCollection("positions");
    await verifyCollection("watchlists");
    await verifyCollection("orders");
    await verifyCollection("portfolioHistory");
    await verifyCollection("dailyPnL");
    await verifyCollection("allocations");
    await verifyCollection("news");
    await verifyCollection("calendarEvents");
  } catch (error: any) {
    console.error("❌ Error setting up demo user:", error);

    // Provide helpful error messages
    if (error.code === "auth/invalid-api-key") {
      console.error("\n🔑 Invalid API Key. Check your .env.local file.");
      console.error("Make sure NEXT_PUBLIC_FIREBASE_API_KEY is correct.");
    } else if (error.code === "auth/email-already-in-use") {
      console.error("\n📧 Email already in use but not found in Firestore.");
      console.error("Please delete the user from Firebase Auth first:");
      console.error("Firebase Console > Authentication > Users > Delete user");
    } else if (error.code === "auth/operation-not-allowed") {
      console.error(
        "\n⚠️ Email/Password sign-in is not enabled in Firebase Console.",
      );
      console.error(
        "Go to Firebase Console > Authentication > Sign-in methods > Enable Email/Password",
      );
    } else if (error.code === "auth/too-many-requests") {
      console.error(
        "\n⏳ Too many requests. Wait a few minutes and try again.",
      );
    }
  }
}

// Run the script
createDemoUser();
