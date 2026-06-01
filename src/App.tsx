import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { arenaStore } from "./lib/arenaStore";
import Home from "./routes/Home";
import Players from "./routes/Players";
import Teams from "./routes/Teams";
import Switcher from "./components/Switcher";
import { Sun, Moon } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  const snap = useSnapshot(arenaStore);

  // Load theme preference from localStorage or default to preferences
  const [theme, setTheme] = useState<"light" | "dark">((() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  })());

  // Apply theme class to HTML element on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-theme-bg text-text-primary transition-colors duration-300 gaming-grid-bg py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Theme Toggle Controller */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="rounded-full shadow-md border-theme-border bg-theme-card hover:bg-theme-bg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:rotate-12"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-400 stroke-[2.5]" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500 stroke-[2.5]" />
          )}
        </Button>
      </div>

      {/* Restful, highly subtle decorative gaming button shapes in the background corners */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-0">
        {/* Top-Left: Triangle Shape (Green) */}
        <div className="absolute top-[8%] left-[4%] lg:left-[8%] xl:left-[12%] hidden sm:block text-ps-triangle opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
          <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
            <polygon points="12 3, 21 20, 3 20" />
          </svg>
        </div>
        
        {/* Bottom-Left: Square Shape (Pink) */}
        <div className="absolute bottom-[8%] left-[4%] lg:left-[8%] xl:left-[12%] hidden sm:block text-ps-square opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
          <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>

        {/* Top-Right: Circle Shape (Red) */}
        <div className="absolute top-[8%] right-[4%] lg:right-[8%] xl:right-[12%] hidden sm:block text-ps-circle opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
          <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>

        {/* Bottom-Right: Cross Shape (Blue) */}
        <div className="absolute bottom-[8%] right-[4%] lg:right-[8%] xl:right-[12%] hidden sm:block text-ps-cross opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
          <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Main View Container */}
      <div className="w-full max-w-4xl relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Players" element={<Players />} />
          <Route path="/Teams" element={<Teams />} />
          <Route
            path="/mode/:mode"
            element={
              <Switcher
                players={snap.players as typeof arenaStore.players}
                teams={snap.teams as typeof arenaStore.teams}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
