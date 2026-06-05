import { useNavigate } from "react-router-dom";
import StickyTopBar from "@/components/layout/StickyTopBar";
import GamingBackgroundShapes from "@/components/layout/GamingBackgroundShapes";
import PersistConfirmModal from "@/components/roster/PersistConfirmModal";
import { useTheme } from "@/lib/useTheme";
import { usePersistence } from "@/lib/usePersistence";
import { AppRoutes } from "@/components/AppRoutes";

function App() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    persistEnabled,
    showPersistConfirm,
    isSavingAnim,
    setShowPersistConfirm,
    handlePersistToggle,
    confirmDisablePersist,
  } = usePersistence(navigate);

  return (
    <div className="min-h-screen bg-theme-bg text-text-primary transition-colors duration-300 gaming-grid-bg flex flex-col relative overflow-hidden">
      <StickyTopBar
        persistEnabled={persistEnabled}
        isSavingAnim={isSavingAnim}
        theme={theme}
        onPersistToggle={handlePersistToggle}
        onThemeToggle={toggleTheme}
      />

      <GamingBackgroundShapes />

      <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-6 relative z-10">
        <div className="w-full max-w-4xl">
          <AppRoutes />
        </div>
      </div>

      <footer className="w-full text-center py-4 text-xs text-text-secondary/60 relative z-10 border-t border-theme-border/20 bg-theme-card/10 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Game Counter • v{import.meta.env.APP_VERSION}</p>
      </footer>

      <PersistConfirmModal
        isOpen={showPersistConfirm}
        onCancel={() => setShowPersistConfirm(false)}
        onConfirm={confirmDisablePersist}
      />
    </div>
  );
}

export default App;
