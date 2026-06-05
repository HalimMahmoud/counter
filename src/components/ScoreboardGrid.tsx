import { Card, CardContent } from "./ui/card";
import { psShapes } from "../lib/psShapes";
import type { Player, Team } from "../lib/types";
import Individual from "./Individual";
import Group from "./Group";
import { arenaActions } from "../lib/useArenaState";

function VersusOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
          <Group {...(item as Team)} method={changeActivity} shapeIndex={idx} />
        ) : (
          <Individual {...(item as Player)} method={changeActivity} shapeIndex={idx} />
        )}
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
            changeActivity={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
