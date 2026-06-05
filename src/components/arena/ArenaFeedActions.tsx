import { Undo2, Redo2 } from "lucide-react";

type ArenaFeedActionsProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

export default function ArenaFeedActions({ canUndo, canRedo, onUndo, onRedo }: ArenaFeedActionsProps) {
  const btnClass = "inline-flex items-center justify-center gap-1 rounded-lg text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-[2px] active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-40 select-none bg-transparent text-text-primary border-2 border-text-primary hover:bg-text-primary hover:text-theme-bg h-9 px-2 md:px-2.5 py-1 shadow-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.1)]";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={btnClass}
      >
        <Undo2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
        Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={btnClass}
      >
        <Redo2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
        Redo
      </button>
    </div>
  );
}

