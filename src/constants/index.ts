// ─── Countries ────────────────────────────────────────────────────────────────
export const COUNTRIES = [
  { code: "DE", name: "Germany" },
  { code: "AT", name: "Austria" },
  { code: "CH", name: "Switzerland" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "LU", name: "Luxembourg" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "SE", name: "Sweden" },
  { code: "DK", name: "Denmark" },
  { code: "NO", name: "Norway" },
  { code: "FI", name: "Finland" },
  { code: "IE", name: "Ireland" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "AE", name: "United Arab Emirates" },
] as const;

// ─── Currencies ───────────────────────────────────────────────────────────────
export const ACCOUNT_CURRENCIES = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "JPY",
  "USDT",
] as const;

// ─── Leverage options ─────────────────────────────────────────────────────────
// Professional broker values. If targeting EU retail clients,
// change forex to [2,5,10,20,30] for ESMA compliance.
export const LEVERAGE_OPTIONS = {
  forex: [10, 20, 50, 100, 200, 500],
  stock: [1, 2, 5, 10, 20],
  commodity: [10, 20, 50, 100],
  index: [10, 20, 50, 100],
  etf: [1, 2, 5, 10],
  crypto: [2, 5, 10, 20, 50],
} as const;

// ─── Payment methods ──────────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
  {
    value: "card",
    label: "Visa / Mastercard",
    note: "Instant",
    icon: "CreditCard",
  },
  {
    value: "sepa",
    label: "SEPA Bank Transfer",
    note: "1–2 business days",
    icon: "Building2",
  },
  {
    value: "swift",
    label: "International Bank Transfer (SWIFT)",
    note: "2–5 business days",
    icon: "Building2",
  },
  {
    value: "crypto",
    label: "Cryptocurrency (USDT/BTC)",
    note: "Under 1 hour",
    icon: "Bitcoin",
  },
] as const;
