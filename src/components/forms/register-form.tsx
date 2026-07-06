"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Check, Eye, EyeOff, Shield } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas";
import { signUp, signInWithGoogle } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RHFInput, Spinner, Select } from "@/components/forms/inputs";
import { COUNTRIES } from "@/constants";

const perks = [
  { icon: "✨", text: "Free account, no minimum deposit" },
  { icon: "📊", text: "180+ markets from day one" },
  { icon: "🎯", text: "Demo account included" },
];

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      country: "",
      agreedToTerms: false,
      agreedToRisk: false,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    const result = await signUp(values);

    if (result.success) {
      setSuccess(true);
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        router.push("/verify-email");
      }, 3000);
    } else {
      setServerError(result.error ?? "Registration failed. Please try again.");
    }
  }

  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);
    setServerError(null);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setServerError(
          result.error ?? "Google sign-up failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      setServerError("Google sign-up failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="bg-gradient-to-br from-white to-green-50/50 shadow-xl border-0 text-center py-12 px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-green-200">
          <Check size={36} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="font-display mt-6 text-2xl font-bold text-gray-800">
          Account Created! 🎉
        </h2>
        <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Check your inbox for a verification email, then log in to start
          trading.
        </p>
        <div className="mt-4 text-xs text-gray-500">
          Redirecting to verification page...
        </div>
        <Link href="/login">
          <Button
            variant="primary"
            size="lg"
            className="mt-4 w-full max-w-xs mx-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 transition-all duration-300"
          >
            Go to login
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
              <UserPlus size={20} strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-white tracking-tight">
                Open free account
              </h1>
              <p className="text-xs text-white/80">Takes less than 5 minutes</p>
            </div>
          </div>
        </div>

        {/* Perks */}
        <div className="px-6 pt-5 pb-3 border-b border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {perks.map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50/80 rounded-lg px-3 py-2 border border-gray-100"
              >
                <span className="text-base">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5"
          noValidate
        >
          {/* Google Sign-Up Button */}
          <div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full gap-2.5 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm font-semibold"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading || isSubmitting}
            >
              {isGoogleLoading ? (
                <Spinner size={18} className="text-gray-600" />
              ) : (
                <FaGoogle size={20} className="text-blue-600" />
              )}
              {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <RHFInput<RegisterFormValues>
              name="firstName"
              label="First name"
              placeholder="Enter First Name"
              required
            />
            <RHFInput<RegisterFormValues>
              name="lastName"
              label="Last name"
              placeholder="Enter Last Name"
              required
            />
          </div>

          {/* Email */}
          <RHFInput<RegisterFormValues>
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            required
          />

          {/* Phone */}
          <RHFInput<RegisterFormValues>
            name="phoneNumber"
            label="Phone number"
            type="tel"
            placeholder="+49 20 000 0000"
          />

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Country of residence <span className="text-red-500">*</span>
            </label>
            <Select
              {...register("country")}
              options={COUNTRIES.map((c) => ({
                value: c.code,
                label: c.name,
              }))}
              placeholder="Select country…"
              error={errors.country?.message}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-3 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <RHFInput<RegisterFormValues>
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            required
          />

          {/* Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register("agreedToTerms")}
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-2 border-gray-300 accent-blue-600 cursor-pointer transition-all duration-200"
              />
              <span className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.agreedToTerms && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.agreedToTerms.message}
              </p>
            )}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register("agreedToRisk")}
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-2 border-gray-300 accent-blue-600 cursor-pointer transition-all duration-200"
              />
              <span className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                I have read and understood the{" "}
                <Link
                  href="/risk-disclosure"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Risk Disclosure
                </Link>
                .
              </span>
            </label>
            {errors.agreedToRisk && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.agreedToRisk.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {serverError && (
            <div className="rounded-xl bg-red-50 border-2 border-red-200 p-3.5 text-xs text-red-600 flex items-start gap-2.5">
              <Shield size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full gap-2.5 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 text-base font-semibold"
            disabled={isSubmitting || isGoogleLoading}
          >
            {isSubmitting ? (
              <>
                <Spinner size={18} className="text-white" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </Card>
    </FormProvider>
  );
}
