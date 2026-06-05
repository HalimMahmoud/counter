import { Card, CardContent } from "../ui/card";
import { Trash2 } from "lucide-react";

type PersistConfirmModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function PersistConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
}: PersistConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-theme-bg/60 backdrop-blur-sm transition-opacity duration-300">
      <Card className="w-full max-w-sm bg-theme-card border-theme-border shadow-xl animate-in fade-in-50 zoom-in-95 duration-200">
        <CardContent className="p-6 flex flex-col items-center text-center gap-6">
          {/* Warning Symbol Accent */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-rose-500/20 text-rose-500 bg-rose-500/5 shadow-inner">
            <Trash2 className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-black tracking-widest uppercase text-text-primary">
              DISABLE SAVING?
            </h3>
            <p className="text-[10px] text-text-secondary leading-relaxed font-semibold uppercase tracking-wider">
              ARE YOU SURE? THIS WILL CLEAR ALL CURRENT DATA, RESET YOUR SCOREBOARD TO DEFAULTS, AND RETURN YOU TO THE HOME SCREEN.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full">
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-[2px] active:scale-95 bg-transparent text-text-primary border-2 border-text-primary hover:bg-text-primary hover:text-theme-bg hover:shadow-lg hover:shadow-text-primary/15 h-9 px-4"
            >
              CANCEL
            </button>
            
            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-[2px] active:scale-95 bg-transparent text-rose-600 dark:text-rose-400 border-2 border-rose-600 dark:border-rose-400 hover:bg-rose-600 dark:hover:bg-rose-400 hover:text-white dark:hover:text-theme-bg hover:shadow-lg hover:shadow-rose-500/30 h-9 px-4"
            >
              CLEAR & DISABLE
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
