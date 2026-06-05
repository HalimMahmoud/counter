import { psShapes } from "./psShapes";
import type { LogEntry, Player, Team } from "./types";

function findShapeById(
  competitorId: string,
  players: readonly Player[],
  teams: readonly Team[]
) {
  const [type, idStr] = competitorId.split("-");
  const list = type === "player" ? players : (type === "team" ? teams : []);
  const idx = list.findIndex((item) => String(item.id) === idStr);
  return psShapes[idx % psShapes.length] ?? null;
}

function findShapeByMessage(
  message: string,
  players: readonly Player[],
  teams: readonly Team[]
) {
  const pIdx = players.findIndex((p) => message.includes(p.name));
  if (pIdx !== -1) return psShapes[pIdx % psShapes.length];

  const tIdx = teams.findIndex((t) => message.includes(t.name));
  return psShapes[tIdx % psShapes.length] ?? null;
}

export function findActorShape(
  log: LogEntry,
  players: readonly Player[],
  teams: readonly Team[]
) {
  const shape = log.competitorId ? findShapeById(log.competitorId, players, teams) : null;
  return shape ?? findShapeByMessage(log.message || "", players, teams);
}

