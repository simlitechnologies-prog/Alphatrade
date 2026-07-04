"use client";

import * as React from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { cn } from "@/lib/utils";

// ─── Base input ───────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-lg border bg-white px-3 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:outline-none dark:bg-white",
          error
            ? "border-brand-danger focus:border-brand-danger"
            : "border-slate-300 focus:border-brand-secondary dark:border-slate-700",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-brand-danger">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";

// ─── Select ────────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, ...props }, ref) => (
    <div className="w-full">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full rounded-lg border bg-white px-3 text-sm text-foreground transition-colors focus:outline-none dark:bg-white",
          error
            ? "border-brand-danger focus:border-brand-danger"
            : "border-slate-300 focus:border-brand-secondary dark:border-slate-700",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-brand-danger">{error}</p>}
    </div>
  ),
);
Select.displayName = "Select";

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:outline-none dark:bg-white",
          error
            ? "border-brand-danger focus:border-brand-danger"
            : "border-slate-300 focus:border-brand-secondary dark:border-slate-700",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-brand-danger">{error}</p>}
    </div>
  ),
);
Textarea.displayName = "Textarea";

// ─── Field wrapper (label + error) ───────────────────────────────────────────

export function FormField({
  label,
  required,
  children,
  error,
  hint,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-xs font-medium text-foreground/60">
        {label}
        {required && <span className="ml-0.5 text-brand-danger">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-foreground/40">{hint}</p>}
      {error && <p className="text-xs text-brand-danger">{error}</p>}
    </div>
  );
}

// ─── RHF-connected field ──────────────────────────────────────────────────────

interface RHFFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  required?: boolean;
  hint?: string;
  rules?: RegisterOptions<T>;
  className?: string;
}

export function RHFInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  required,
  hint,
  rules,
  className,
}: RHFFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <Input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
        error={error}
      />
    </FormField>
  );
}

// ─── Loading spinner ──────────────────────────────────────────────────────────

export function Spinner({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
