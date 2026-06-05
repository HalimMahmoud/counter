import { arenaStore } from "@/lib/arenaStore";

export function resetTestStore(resetLobbyFlag = false) {
  localStorage.clear();
  for (const key in arenaStore.scores) {
    delete arenaStore.scores[key];
  }
  arenaStore.activity.length = 0;
  arenaStore.history.length = 0;
  arenaStore.future.length = 0;

  if (resetLobbyFlag) {
    arenaStore.players.length = 0;
    arenaStore.players.push(
      { name: "Player 1", id: 0, score: 0 },
      { name: "Player 2", id: 1, score: 0 }
    );
    arenaStore.teams.length = 0;
    arenaStore.teams.push(
      { name: "Team 1", id: 0, score: 0 },
      { name: "Team 2", id: 1, score: 0 }
    );
    arenaStore.nextPlayerId = 2;
  }
}
