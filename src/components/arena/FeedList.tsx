import type { LogEntry, Player, Team } from "../../lib/types";
import FeedItem from "./FeedItem";
import { findActorShape } from "../../lib/actorUtils";
import { getLogMessage } from "../../lib/logUtils";

type FeedListProps = {
  activity: readonly LogEntry[];
  players: readonly Player[];
  teams: readonly Team[];
};

export default function FeedList({ activity, players, teams }: FeedListProps) {
  if (activity.length === 0) {
    return <p className="text-xs text-text-secondary text-center py-4">No active session logs.</p>;
  }

  return (
    <div className="relative border-l border-theme-border ml-3 pl-5 space-y-5">
      {activity.map((x, i) => (
        <FeedItem
          key={x.id ?? i}
          log={x}
          actorShape={findActorShape(x, players, teams)}
          displayMessage={getLogMessage(x, players, teams)}
        />
      ))}
    </div>
  );
}
