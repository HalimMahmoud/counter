import { useEffect } from "react";
import { arenaStore } from "@/lib/arenaStore";

export function useSessionInitializer(snap: any, isTeamMode: boolean, playersLength: number, teamsLength: number) {
  useEffect(() => {
    const list = isTeamMode ? snap.teams : snap.players;
    const prefix = isTeamMode ? "team-" : "player-";
    const ids = list.map((x: { id: number }) => `${prefix}${x.id}`);
    const storeKeys = Object.keys(snap.scores);

    const matches = ids.length === storeKeys.length && ids.every((id: string) => storeKeys.includes(id));
    if (!matches) {
      arenaStore.initializeSession(ids);
    }
  }, [isTeamMode, playersLength, teamsLength, snap.teams, snap.players, snap.scores]);
}


