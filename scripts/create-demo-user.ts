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
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

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
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, DEMO_EMAIL);
      if (signInMethods && signInMethods.length > 0) {
        userExists = true;
        console.log("✅ User already exists with methods:", signInMethods);
      }
    } catch (error: any) {
      console.log("ℹ️ User does not exist yet, will create new account");
    }

    if (userExists) {
      console.log("✅ Demo user already exists!");
      return;
    }

    // Create the user
    console.log("📝 Creating demo user in Firebase Auth...");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      DEMO_EMAIL,
      DEMO_PASSWORD,
    );

    const user = userCredential.user;
    console.log(`✅ Demo user created with UID: ${user.uid}`);

    // Create user profile in Firestore
    console.log("📝 Creating user profile in Firestore...");
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
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

    // Create portfolio
    console.log("📝 Creating portfolio...");
    await setDoc(doc(db, "portfolios", user.uid), {
      userId: user.uid,
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

    // Create positions
    console.log("📝 Creating positions...");
    const positions = [
      {
        id: "pos-1",
        userId: user.uid,
        symbol: "EUR/USD",
        direction: "long",
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
        userId: user.uid,
        symbol: "BTC/USD",
        direction: "long",
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
        userId: user.uid,
        symbol: "DE40",
        direction: "long",
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
        userId: user.uid,
        symbol: "XAU/USD",
        direction: "long",
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
      const docId = safeDocId(`${user.uid}_${position.id}`);
      await setDoc(doc(db, "positions", docId), position);
    }

    // Create watchlist - FIXED: Use safe document IDs
    console.log("📝 Creating watchlist...");
    const watchlist = [
      {
        symbol: "BTCUSD",
        displaySymbol: "BTC/USD",
        name: "Bitcoin",
        price: 118650,
        changePercent: 3.82,
      },
      {
        symbol: "ETHUSD",
        displaySymbol: "ETH/USD",
        name: "Ethereum",
        price: 6840,
        changePercent: 2.41,
      },
      {
        symbol: "EURUSD",
        displaySymbol: "EUR/USD",
        name: "Euro/US Dollar",
        price: 1.1248,
        changePercent: 0.63,
      },
      {
        symbol: "DE40",
        displaySymbol: "DE40",
        name: "Germany 40",
        price: 24360,
        changePercent: 1.45,
      },
      {
        symbol: "XAUUSD",
        displaySymbol: "XAU/USD",
        name: "Gold",
        price: 3348,
        changePercent: 0.91,
      },
      {
        symbol: "US500",
        displaySymbol: "US500",
        name: "S&P 500",
        price: 7285,
        changePercent: 0.52,
      },
    ];

    for (const item of watchlist) {
      const docId = safeDocId(`${user.uid}_${item.symbol}`);
      await setDoc(doc(db, "watchlists", docId), {
        userId: user.uid,
        symbol: item.displaySymbol || item.symbol,
        name: item.name,
        price: item.price,
        changePercent: item.changePercent,
        createdAt: serverTimestamp(),
      });
    }

    // Create order history
    console.log("📝 Creating order history...");
    const orders = [
      {
        id: "ord-1",
        userId: user.uid,
        symbol: "EUR/USD",
        type: "market",
        direction: "buy",
        lots: 8,
        price: 1.0715,
        status: "filled",
        createdAt: new Date("2012-07-18T10:25:00"),
        filledAt: new Date("2012-07-18T10:25:06"),
      },
      {
        id: "ord-2",
        userId: user.uid,
        symbol: "DE40",
        type: "market",
        direction: "buy",
        lots: 15,
        price: 12180,
        status: "filled",
        createdAt: new Date("2016-05-11T09:30:00"),
        filledAt: new Date("2016-05-11T09:30:04"),
      },
      {
        id: "ord-3",
        userId: user.uid,
        symbol: "BTC/USD",
        type: "market",
        direction: "buy",
        lots: 6.5,
        price: 23850,
        status: "filled",
        createdAt: new Date("2020-11-09T13:10:00"),
        filledAt: new Date("2020-11-09T13:10:05"),
      },
      {
        id: "ord-4",
        userId: user.uid,
        symbol: "XAU/USD",
        type: "market",
        direction: "buy",
        lots: 32,
        price: 1765,
        status: "filled",
        createdAt: new Date("2018-02-21T14:15:00"),
        filledAt: new Date("2018-02-21T14:15:08"),
      },
    ];

    for (const order of orders) {
      const docId = safeDocId(`${user.uid}_${order.id}`);
      await setDoc(doc(db, "orders", docId), order);
    }

    // Create portfolio growth data
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
      const docId = safeDocId(`${user.uid}_${data.month}`);
      await setDoc(doc(db, "portfolioHistory", docId), {
        userId: user.uid,
        ...data,
        createdAt: serverTimestamp(),
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
    console.log("═══════════════════════════════════════");
    console.log("🎯 You can now log in with these credentials!");
  } catch (error: any) {
    console.error("❌ Error setting up demo user:", error);

    // Provide helpful error messages
    if (error.code === "auth/invalid-api-key") {
      console.error("\n🔑 Invalid API Key. Check your .env.local file.");
      console.error("Make sure NEXT_PUBLIC_FIREBASE_API_KEY is correct.");
    } else if (error.code === "auth/email-already-in-use") {
      console.error("\n📧 Email already in use. Try a different email.");
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
    } else if (error.code === "invalid-argument") {
      console.error(
        "\n📄 Invalid document reference. This might be due to special characters in the ID.",
      );
      console.error("The script has been fixed to handle this.");
    }
  }
}

// Run the script
createDemoUser();
