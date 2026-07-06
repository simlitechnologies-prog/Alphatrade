"use client";

import {
  Bell,
  Search,
  Sun,
  Moon,
  Euro,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/config";

// Helper to format currency with €
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardTopbar({}: { title: string }) {
  const { user } = useAuth(); // ✅ Removed logout from destructuring
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock balance - in production, this would come from your data
  const [balance] = useState(15243.8);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Use Firebase signOut directly
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserInitials = () => {
    if (!user?.displayName) return "U";
    return user.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm px-4 md:px-6 dark:border-slate-800 dark:bg-slate-950/80 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Balance indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-800/30">
          <Euro size={14} className="text-green-600 dark:text-green-400" />
          <span className="text-xs font-semibold text-green-700 dark:text-green-300">
            {formatEuro(balance)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            placeholder="Search markets…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-48 md:w-56 rounded-xl border border-gray-200 bg-gray-50/50 pl-8 pr-3 text-xs text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-400"
          />
          {searchQuery && (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 dark:text-gray-500">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700/50"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700/50">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-200 dark:shadow-red-900/30">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-2 py-1.5 pr-1.5 hover:bg-gray-100 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30">
              {getUserInitials()}
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "text-gray-400 transition-transform duration-200",
                isProfileOpen && "rotate-180",
              )}
            />
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "user@example.com"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Euro
                    size={12}
                    className="text-green-600 dark:text-green-400"
                  />
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">
                    {formatEuro(balance)}
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1 z-50">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:bg-gray-800">
                  <User size={16} className="text-gray-400" />
                  Profile Settings
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:bg-gray-800">
                  <Settings size={16} className="text-gray-400" />
                  Preferences
                </button>
                <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">
                  Signed in as{" "}
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {user?.email?.split("@")[0] || "user"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
