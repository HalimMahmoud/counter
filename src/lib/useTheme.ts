import { useState, useEffect } from "react";
import { getInitialTheme, applyTheme, type Theme } from "@/lib/themeUtils";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
