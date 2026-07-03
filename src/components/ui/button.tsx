import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-secondary text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20",
        success: "bg-brand-success text-white hover:bg-green-700",
        danger: "bg-brand-danger text-white hover:bg-red-700",
        outline:
          "border border-slate-300 dark:border-slate-700 text-foreground dark:text-white cursor-pointer hover:bg-brand-muted hover:text-foreground",
        ghost:
          "text-foreground dark:text-white cursor-pointer hover:bg-brand-muted hover:text-foreground",
        dark: "bg-brand-primary text-white hover:bg-slate-800",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
