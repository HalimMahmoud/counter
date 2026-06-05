import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onThemeToggle: () => void;
};

export default function ThemeToggle({ theme, onThemeToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onThemeToggle}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="rounded-full w-8 h-8 sm:w-9 sm:h-9 shadow-md border border-theme-border bg-theme-card hover:bg-theme-bg flex items-center justify-center cursor-pointer transition-all duration-300 hover:rotate-12 hover:-translate-y-[2px] active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 stroke-[2.5]" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 stroke-[2.5]" />
      )}
    </button>
  );
}

