// Pure theme utilities — no React dependencies

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const META_COLORS: Record<Theme, string> = {
  dark: "#0F172A",
  light: "#E2E8F0",
};

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.add(theme);
  root.classList.remove(theme === "dark" ? "light" : "dark");
  localStorage.setItem(STORAGE_KEY, theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", META_COLORS[theme]);
}
