import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "triangle" | "circle" | "cross" | "square";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-lg px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none select-none";

  const variants = {
    default:
      "border-2 border-theme-border bg-transparent text-text-primary",
    secondary:
      "border-2 border-theme-border bg-transparent text-text-secondary",
    outline: "border-2 border-theme-border bg-transparent text-text-secondary",
    destructive:
      "border-2 border-rose-600 dark:border-rose-400 bg-transparent text-rose-600 dark:text-rose-400",
      
    // PlayStation action variants (100% outline, glare-free colors matching button aesthetics)
    triangle: "border-2 border-emerald-650 dark:border-emerald-300 bg-transparent text-emerald-650 dark:text-emerald-300",
    circle: "border-2 border-rose-600 dark:border-rose-300 bg-transparent text-rose-600 dark:text-rose-300",
    cross: "border-2 border-sky-600 dark:border-sky-300 bg-transparent text-sky-600 dark:text-sky-300",
    square: "border-2 border-pink-600 dark:border-pink-300 bg-transparent text-pink-600 dark:text-pink-300",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
