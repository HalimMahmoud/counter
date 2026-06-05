import { HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

type PersistenceToggleProps = {
  persistEnabled: boolean;
  isSavingAnim: boolean;
  onPersistToggle: () => void;
};

const TITLE_MAP: Record<string, string> = {
  true: "Data is being saved — click to disable and clear",
  false: "Ephemeral mode — click to enable saving",
};

const ICON_COLOR_MAP: Record<string, string> = {
  true: "text-text-secondary",
  false: "text-amber-500/60",
};

const DOT_COLOR_MAP: Record<string, string> = {
  true: "bg-emerald-500 animate-pulse",
  false: "bg-amber-500",
};

function getAnimClass(isSavingAnim: boolean, persistEnabled: boolean): string {
  return isSavingAnim && persistEnabled ? "animate-save-write" : "";
}

export default function PersistenceToggle({
  persistEnabled,
  isSavingAnim,
  onPersistToggle,
}: PersistenceToggleProps) {
  const persistKey = String(persistEnabled);
  const title = TITLE_MAP[persistKey];
  const iconColor = ICON_COLOR_MAP[persistKey];
  const animClass = getAnimClass(isSavingAnim, persistEnabled);
  const dotColor = DOT_COLOR_MAP[persistKey];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={onPersistToggle}
        title={title}
        className="rounded-full w-8 h-8 sm:w-9 sm:h-9 border-theme-border bg-theme-card hover:bg-theme-bg flex items-center justify-center cursor-pointer transition-all duration-300"
      >
        <HardDrive
          className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2] transition-all duration-300 ${animClass} ${iconColor}`}
        />
      </Button>
      {/* Status dot */}
      <span
        className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-theme-bg ${dotColor}`}
      />
    </div>
  );
}

