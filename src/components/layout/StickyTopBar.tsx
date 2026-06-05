import BrandLogo from "./BrandLogo";
import PersistenceToggle from "./PersistenceToggle";
import ThemeToggle from "./ThemeToggle";

type StickyTopBarProps = {
  persistEnabled: boolean;
  isSavingAnim: boolean;
  theme: "light" | "dark";
  onPersistToggle: () => void;
  onThemeToggle: () => void;
};

export default function StickyTopBar({
  persistEnabled,
  isSavingAnim,
  theme,
  onPersistToggle,
  onThemeToggle,
}: StickyTopBarProps) {
  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 border-b border-theme-border/40 bg-theme-bg/80 backdrop-blur-sm shrink-0">
      <BrandLogo />

      {/* Right-side controls */}
      <div className="flex items-center gap-2">
        <PersistenceToggle
          persistEnabled={persistEnabled}
          isSavingAnim={isSavingAnim}
          onPersistToggle={onPersistToggle}
        />

        <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} />
      </div>
    </div>
  );
}
