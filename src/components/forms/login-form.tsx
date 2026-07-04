"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { LogIn, Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";
import { signIn } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/forms/inputs";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = methods;

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    const result = await signIn(values);
    if (!result.success) {
      setServerError(result.error ?? "Login failed. Please try again.");
    }
    // On success: router.push("/dashboard") — wire once Firebase is connected
  }

  return (
    <FormProvider {...methods}>
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
              <LogIn size={20} strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-white/80">
                Log in to your AlphaTrade account
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Google OAuth */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-medium text-gray-400">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm pl-10 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Mail size={16} className="text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm pl-10 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
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

            {/* Remember Me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                {...register("rememberMe")}
                type="checkbox"
                className="h-4 w-4 rounded border-2 border-gray-300 accent-blue-600 cursor-pointer transition-all duration-200"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
                Remember me for 30 days
              </span>
            </label>

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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size={18} className="text-white" />
                  Signing in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </Card>
    </FormProvider>
  );
}
