import { psShapes } from "../../lib/psShapes";
import type { LogEntry } from "../../lib/types";

type FeedItemProps = {
  log: LogEntry;
  actorShape: (typeof psShapes)[number] | null;
  displayMessage: string;
};

export default function FeedItem({ log, actorShape, displayMessage }: FeedItemProps) {
  return (
    <div className="relative group">
      {/* Timeline shape bullet indicator */}
      <span
        className={`absolute -left-[27px] top-1 size-3.5 rounded-md bg-theme-bg border border-theme-border flex items-center justify-center text-[7px] font-black group-hover:scale-105 transition-transform ${
          actorShape ? actorShape.colorClass : "text-text-secondary"
        }`}
      >
        {actorShape ? actorShape.symbol : "🕹️"}
      </span>

      <div className="flex flex-col text-xs md:text-sm gap-0.5">
        <p className="font-semibold text-text-primary">{displayMessage}</p>
        <span className="text-[10px] md:text-xs text-text-secondary font-medium">
          {log.date}
        </span>
      </div>
    </div>
  );
}
