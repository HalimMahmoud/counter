import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "psBlue" | "psRed" | "psGreen" | "psPink";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Master shape and transition configurations (strictly matching MASTER.md spec)
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-[2px] active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      default: 
        "bg-transparent text-emerald-600 dark:text-emerald-400 border-2 border-emerald-600 dark:border-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-emerald-500/30",
      
      outline: 
        "bg-transparent text-text-primary border-2 border-text-primary hover:bg-text-primary hover:text-theme-bg hover:shadow-lg hover:shadow-text-primary/15",
      
      secondary: 
        "bg-transparent text-text-secondary border-2 border-theme-border hover:bg-theme-border hover:text-text-primary hover:shadow-lg hover:shadow-theme-border/20",
      
      ghost: 
        "hover:bg-theme-card text-text-secondary hover:text-text-primary shadow-none border-2 border-transparent",
      
      link: 
        "text-text-secondary underline-offset-4 hover:underline shadow-none border-2 border-transparent",
      
      destructive: 
        "bg-transparent text-rose-600 dark:text-rose-400 border-2 border-rose-600 dark:border-rose-400 hover:bg-rose-600 dark:hover:bg-rose-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-rose-500/30",
      
      psBlue: 
        "bg-transparent text-sky-600 dark:text-sky-300 border-2 border-sky-600 dark:border-sky-300 hover:bg-sky-600 dark:hover:bg-sky-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-sky-500/30",
      
      psRed: 
        "bg-transparent text-rose-600 dark:text-rose-300 border-2 border-rose-600 dark:border-rose-300 hover:bg-rose-600 dark:hover:bg-rose-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-rose-500/30",
      
      psGreen: 
        "bg-transparent text-emerald-650 dark:text-emerald-300 border-2 border-emerald-650 dark:border-emerald-300 hover:bg-emerald-650 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-emerald-500/30",
      
      psPink: 
        "bg-transparent text-pink-600 dark:text-pink-300 border-2 border-pink-600 dark:border-pink-300 hover:bg-pink-600 dark:hover:bg-pink-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-pink-500/30",
    };

    // Standardized padding and height tokens from Master guidelines
    const sizes = {
      default: "h-11 px-6",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-8 text-base",
      icon: "size-11 rounded-lg",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
