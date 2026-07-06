"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  resetPassword: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔥 AUTH LISTENER DEBUG
  useEffect(() => {
    console.log("🔄 [Auth] Listener mounted");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔥 [Auth] State changed:", user);

      setUser(user);
      setLoading(false);

      console.log("📦 [Auth] Loading = false");
    });

    return () => {
      console.log("🧹 [Auth] Listener cleanup");
      unsubscribe();
    };
  }, []);

  // 🔐 LOGIN DEBUG
  const login = async (email: string, password: string) => {
    console.log("🚀 [Login] Attempt:", email);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("✅ [Login] Firebase success:", userCredential.user);

      setUser(userCredential.user);

      console.log("➡️ [Login] Redirecting to /dashboard");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ [Login] Error:", {
        code: error.code,
        message: error.message,
      });

      throw error;
    }
  };

  // 🆕 SIGNUP DEBUG
  const signup = async (email: string, password: string) => {
    console.log("🆕 [Signup] Attempt:", email);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("✅ [Signup] Success:", userCredential.user.email);

      setUser(userCredential.user);

      console.log("➡️ [Signup] Redirecting to /dashboard");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ [Signup] Error:", {
        code: error.code,
        message: error.message,
      });

      throw error;
    }
  };

  // 🚪 LOGOUT DEBUG
  const logout = async () => {
    console.log("🚪 [Logout] Attempt");

    try {
      await signOut(auth);

      console.log("✅ [Logout] Success");

      setUser(null);

      router.push("/login");
    } catch (error: any) {
      console.error("❌ [Logout] Error:", error);
      throw error;
    }
  };

  // 🔁 RESET PASSWORD DEBUG
  const resetPassword = async (email: string) => {
    console.log("🔁 [ResetPassword] Attempt:", email);

    try {
      await sendPasswordResetEmail(auth, email);

      console.log("✅ [ResetPassword] Email sent:", email);
    } catch (error: any) {
      console.error("❌ [ResetPassword] Error:", {
        code: error.code,
        message: error.message,
      });

      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
