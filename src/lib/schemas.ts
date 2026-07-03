import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{6,14}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  country: z.string().min(1, "Please select your country"),
  agreedToTerms: z.boolean().refine((v) => v === true, "You must agree to the Terms of Service"),
  agreedToRisk: z.boolean().refine((v) => v === true, "You must acknowledge the Risk Disclosure"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits").regex(/^\d{6}$/, "Code must contain only digits"),
});

// ─── Trading ─────────────────────────────────────────────────────────────────

export const tradeSchema = z.object({
  symbol: z.string().min(1, "Please select an instrument"),
  direction: z.enum(["buy", "sell"]),
  orderType: z.enum(["market", "limit", "stop", "stop-limit", "trailing-stop"]),
  lots: z.number().min(0.01, "Minimum volume is 0.01 lots").max(1000, "Maximum volume is 1,000 lots"),
  limitPrice: z.number().positive("Limit price must be positive").optional(),
  stopPrice: z.number().positive("Stop price must be positive").optional(),
  stopLoss: z.number().positive("Stop loss must be positive").optional(),
  takeProfit: z.number().positive("Take profit must be positive").optional(),
  trailingStop: z.number().min(1, "Trailing stop must be at least 1 pip").optional(),
  leverage: z.number().min(1).max(500),
  comment: z.string().max(200, "Comment cannot exceed 200 characters").optional(),
});

// ─── Finance ─────────────────────────────────────────────────────────────────

export const depositSchema = z.object({
  amount: z.number().min(10, "Minimum deposit is $10").max(1_000_000, "Please contact us for deposits above $1,000,000"),
  method: z.enum(["bank_transfer", "card", "crypto", "wire"]),
});

export const withdrawalSchema = z.object({
  amount: z.number().min(10, "Minimum withdrawal is $10"),
  method: z.enum(["bank_transfer", "card", "crypto", "wire"]),
  accountDetail: z.string().min(1, "Please select or enter a withdrawal destination"),
  twoFactorCode: z.string().length(6, "2FA code must be 6 digits").regex(/^\d{6}$/, "2FA code must contain only digits").optional(),
});

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const alertSchema = z.object({
  symbol: z.string().min(1, "Please select an instrument"),
  condition: z.enum(["above", "below", "percent_change"]),
  targetPrice: z.number().positive("Price must be positive"),
  percentageValue: z.number().min(0.1).max(100).optional(),
  channels: z.array(z.enum(["email", "push", "sms"])).min(1, "Select at least one notification channel"),
  note: z.string().max(200, "Note cannot exceed 200 characters").optional(),
});

// ─── Profile & contact ────────────────────────────────────────────────────────

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{6,14}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  country: z.string().min(1, "Please select your country"),
});

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const supportTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  category: z.enum(["deposit_withdrawal", "kyc", "trading", "technical", "account", "other"]),
  body: z.string().min(20, "Please describe your issue in at least 20 characters").max(5000),
});

// ─── Inferred types ──────────────────────────────────────────────────────────

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;
export type TradeFormValues = z.infer<typeof tradeSchema>;
export type DepositFormValues = z.infer<typeof depositSchema>;
export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;
export type AlertFormValues = z.infer<typeof alertSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type SupportTicketFormValues = z.infer<typeof supportTicketSchema>;
