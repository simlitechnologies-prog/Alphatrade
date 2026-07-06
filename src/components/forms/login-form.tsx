"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";
import { signIn, signInWithGoogle } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/forms/inputs";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

    if (result.success) {
      router.push("/dashboard");
    } else {
      setServerError(result.error ?? "Login failed. Please try again.");
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    setServerError(null);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setServerError(
          result.error ?? "Google sign-in failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setServerError("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
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
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isSubmitting}
          >
            {isGoogleLoading ? (
              <Spinner size={18} className="text-gray-600" />
            ) : (
              <FaGoogle size={20} className="text-blue-600" />
            )}
            <span>
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </Button>

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
              disabled={isSubmitting || isGoogleLoading}
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
