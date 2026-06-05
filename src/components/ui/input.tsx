import * as React from "react";
import { cn } from "../../lib/utils";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-theme-border bg-theme-bg px-4 py-2 text-sm font-semibold text-text-primary placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
