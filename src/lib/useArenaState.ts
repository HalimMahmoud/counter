import { useSnapshot } from "valtio";
import { arenaStore } from "./arenaStore";

export function useArenaState() {
  return useSnapshot(arenaStore);
}

/** Pre-bound callbacks for competitor card props — avoids importing arenaStore in UI components. */
export function useCompetitorActions() {
  return {
    onSetAvatar: (type: "player" | "team", id: number, avatar: string) =>
      arenaStore.setAvatar(type, id, avatar),
    onClearAvatar: (type: "player" | "team", id: number) =>
      arenaStore.setAvatar(type, id, ""),
    onChangeName: (type: "player" | "team", id: number, name: string) =>
      arenaStore.changeName(type, id, name),
    onInitializeScore: (key: string, score: number) => {
      if (!(key in arenaStore.scores)) arenaStore.scores[key] = score;
    },
  };
}

