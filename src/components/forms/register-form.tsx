"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { UserPlus, Check, Eye, EyeOff } from "lucide-react";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas";
import { signUp } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RHFInput, Spinner, Select } from "@/components/forms/inputs";
import { COUNTRIES } from "@/constants";

const perks = [
  "Free account, no minimum deposit",
  "180+ markets from day one",
  "Demo account included",
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", password: "",
      confirmPassword: "", phoneNumber: "", country: "",
      agreedToTerms: false, agreedToRisk: false,
    },
  });

  const {
    handleSubmit, register,
    formState: { isSubmitting, errors },
  } = methods;

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    const result = await signUp(values);
    if (result.success) {
      setSuccess(true);
    } else {
      setServerError(result.error ?? "Registration failed. Please try again.");
    }
  }

  if (success) {
    return (
      <Card className="bg-white text-center py-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-brand-success">
          <Check size={28} />
        </span>
        <h2 className="font-display mt-4 text-xl font-bold text-foreground">Account created!</h2>
        <p className="mt-2 text-sm text-foreground/55">
          Check your inbox for a verification email, then log in to start trading.
        </p>
        <Link href="/login">
          <Button variant="primary" size="md" className="mt-6 w-full">Go to login</Button>
        </Link>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      <Card className="bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
            <UserPlus size={18} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Open free account</h1>
            <p className="text-xs text-foreground/50">Takes less than 5 minutes</p>
          </div>
        </div>

        <ul className="mb-5 space-y-1">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-foreground/60">
              <Check size={12} className="shrink-0 text-brand-success" />
              {p}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <RHFInput<RegisterFormValues>
              name="firstName"
              label="First name"
              placeholder="Kwame"
              required
            />
            <RHFInput<RegisterFormValues>
              name="lastName"
              label="Last name"
              placeholder="Mensah"
              required
            />
          </div>

          <RHFInput<RegisterFormValues>
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            required
          />

          <RHFInput<RegisterFormValues>
            name="phoneNumber"
            label="Phone number"
            type="tel"
            placeholder="+233 20 000 0000"
          />

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Country of residence <span className="text-brand-danger">*</span>
            </label>
            <Select
              {...register("country")}
              options={COUNTRIES.map((c) => ({ value: c.code, label: c.name }))}
              placeholder="Select country…"
              error={errors.country?.message}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Password <span className="text-brand-danger">*</span>
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm text-foreground placeholder:text-foreground/40 focus:border-brand-secondary focus:outline-none dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-brand-danger">{errors.password.message}</p>
            )}
          </div>

          <RHFInput<RegisterFormValues>
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            required
          />

          <div className="space-y-2.5 pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                {...register("agreedToTerms")}
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-secondary"
              />
              <span className="text-xs text-foreground/55">
                I agree to the{" "}
                <Link href="/terms-of-service" className="text-brand-secondary hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-brand-secondary hover:underline">Privacy Policy</Link>.
              </span>
            </label>
            {errors.agreedToTerms && (
              <p className="text-xs text-brand-danger">{errors.agreedToTerms.message}</p>
            )}

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                {...register("agreedToRisk")}
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-secondary"
              />
              <span className="text-xs text-foreground/55">
                I have read and understood the{" "}
                <Link href="/risk-disclosure" className="text-brand-secondary hover:underline">Risk Disclosure</Link>.
              </span>
            </label>
            {errors.agreedToRisk && (
              <p className="text-xs text-brand-danger">{errors.agreedToRisk.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-lg border border-brand-danger/20 bg-red-50 p-3 text-xs text-brand-danger dark:bg-red-950/20">
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Spinner size={15} /> Creating account…</> : "Create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-foreground/50">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-secondary hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </FormProvider>
  );
}
