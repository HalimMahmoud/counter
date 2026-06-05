import { Card, CardContent } from "../ui/card";
import type { Player, Team } from "../../lib/types";
import Individual from "../roster/Individual";
import Group from "../roster/Group";
import { useCompetitorActions } from "../../lib/useArenaState";

function VersusOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20 pointer-events-none select-none">
      <div className="w-12 h-12 rounded-xl bg-theme-card border border-theme-border flex items-center justify-center text-xs font-black tracking-widest text-text-secondary shadow-md relative">
        {/* D-Pad cross lines */}
        <div className="absolute w-8 h-2 bg-theme-bg rounded-full"></div>
        <div className="absolute w-2 h-8 bg-theme-bg rounded-full"></div>
        <div className="absolute z-10 text-[9px] font-black uppercase text-text-secondary">VS</div>
      </div>
    </div>
  );
}

type CompetitorCardGridItemProps = {
  item: Player | Team;
  idx: number;
  isTeamMode: boolean;
};

function CompetitorCardGridItem({ item, idx, isTeamMode }: CompetitorCardGridItemProps) {
  const actions = useCompetitorActions();
  const sharedProps = { ...actions, method: () => {}, shapeIndex: idx };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        {isTeamMode
          ? <Group {...(item as Team)} {...sharedProps} />
          : <Individual {...(item as Player)} {...sharedProps} />}
      </CardContent>
    </Card>
  );
}

type ScoreboardGridProps = {
  listItems: readonly Player[] | readonly Team[];
  isTeamMode: boolean;
  resetKey: number;
};

export function ScoreboardGrid({ listItems, isTeamMode, resetKey }: ScoreboardGridProps) {
  return (
    <div className="relative">
      <VersusOverlay show={listItems.length === 2} />

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 relative">
        {listItems.map((x, idx) => (
          <CompetitorCardGridItem
            key={`${x.id}-${resetKey}`}
            item={x}
            idx={idx}
            isTeamMode={isTeamMode}
          />
        ))}
      </div>
    </div>
  );
}
