"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const marketLinks = [
  { href: "/forex", label: "Forex" },
  { href: "/stocks", label: "Aktien" },
  { href: "/commodities", label: "Rohstoffe" },
  { href: "/indices", label: "Indizes" },
  { href: "/etfs", label: "ETFs" },
  { href: "/cryptocurrency", label: "Krypto" },
];

const navLinks = [
  { href: "/markets", label: "Märkte" },
  { href: "/education", label: "Akademie" },
  { href: "/pricing", label: "Preise" },
  { href: "/about", label: "Über uns" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0050B3] to-[#003D8C] text-white shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
            <TrendingUp size={19} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-[#0B1120] dark:text-white">
            AlphaTrade
            <span className="text-[#0050B3] dark:text-[#3B82F6]">Markets</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Markets Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMarketsOpen(true)}
            onMouseLeave={() => setMarketsOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0B1120] dark:text-slate-300 dark:hover:text-white transition-colors duration-200 py-1">
              Märkte
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${marketsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute left-0 top-full pt-2 w-56 transition-all duration-200 ${
                marketsOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md shadow-xl shadow-slate-200/30 dark:shadow-black/30 p-1.5">
                {marketLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-slate-700 hover:bg-[#F0F4FF] dark:text-slate-300 dark:hover:bg-[#1E293B] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#0B1120] dark:text-slate-300 dark:hover:text-white transition-colors duration-200 py-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-white dark:text-white dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E293B]"
            >
              Anmelden
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#0050B3] to-[#003D8C] hover:from-[#003D8C] hover:to-[#002A6B] text-white shadow-sm shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 font-medium px-5"
            >
              Konto eröffnen
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-700 dark:text-slate-200 hover:text-[#0B1120] dark:hover:text-white transition-colors cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/98 dark:bg-[#0B1120]/98 backdrop-blur-sm px-6 py-5 space-y-1">
          {/* Markets Section */}
          <div className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-2">
              Märkte
            </p>
            {marketLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#F0F4FF] dark:text-slate-300 dark:hover:bg-[#1E293B] transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Navigation Section */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#F0F4FF] dark:text-slate-300 dark:hover:bg-[#1E293B] transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <Link
              href="/login"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <Button
                variant="outline"
                className="w-full border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#1E293B]"
              >
                Anmelden
              </Button>
            </Link>
            <Link
              href="/register"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <Button className="w-full bg-gradient-to-r from-[#0050B3] to-[#003D8C] hover:from-[#003D8C] hover:to-[#002A6B] text-white shadow-sm shadow-blue-500/30">
                Konto eröffnen
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
