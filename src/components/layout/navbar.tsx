"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const marketLinks = [
  { href: "/forex", label: "Forex" },
  { href: "/stocks", label: "Stocks" },
  { href: "/commodities", label: "Commodities" },
  { href: "/indices", label: "Indices" },
  { href: "/etfs", label: "ETFs" },
  { href: "/cryptocurrency", label: "Crypto" },
];

const navLinks = [
  { href: "/markets", label: "Markets" },
  { href: "/education", label: "Academy" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-brand-primary/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-secondary text-white">
            <TrendingUp size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground dark:text-white">
            AlphaTrade
            <span className="text-brand-secondary dark:text-white">
              {" "}
              Markets
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div className="group relative">
            <button className="text-sm font-medium text-foreground/80 hover:text-foreground dark:text-white transition-colors">
              Markets
            </button>
            <div className="invisible absolute left-0 top-full w-48 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-brand-primary">
              {marketLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-brand-muted dark:text-white hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login">
            <Button variant="primary" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Open free account
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground dark:text-white "
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3">
          {[...navLinks, ...marketLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-foreground/80 dark:text-white hover:bg-gray-500 transition-colors p-6"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
