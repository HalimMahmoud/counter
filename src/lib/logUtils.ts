import type { LogEntry, Player, Team } from "./types";

export function getCompetitorName(
  competitorId: string,
  players: readonly Player[],
  teams: readonly Team[],
  fallbackName?: string
): string {
  const [type, idStr] = competitorId.split("-");
  const list = type === "player" ? players : teams;
  const item = list.find((x) => String(x.id) === idStr);
  const label = type === "player" ? "Player" : "Team";
  return item?.name ?? fallbackName ?? `${label} ${idStr}`;
}

export function formatScoreLog(name: string, points: number): string {
  const abs = Math.abs(points);
  return points >= 0 ? `Added ${abs} to ${name}` : `Subtracted ${abs} from ${name}`;
}

export const getLogMessage = (
  log: LogEntry,
  players: readonly Player[],
  teams: readonly Team[]
): string => {
  const { type, competitorId, points, oldName, newName, message } = log;

  if (type === "score" && competitorId && points !== undefined) {
    return formatScoreLog(
      getCompetitorName(competitorId, players, teams, newName),
      points
    );
  }

  return type === "rename" && oldName && newName
    ? `${oldName} changed name to ${newName}`
    : message;
};

