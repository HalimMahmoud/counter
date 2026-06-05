import { describe, it, expect, beforeEach } from "vitest";
import { arenaStore } from "../lib/arenaStore";

// Reset players/teams to a clean default state before every test
function resetLobby() {
  localStorage.clear(); // prevent persisted state from bleeding into tests
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
}

describe("arenaStore — lobby (players & teams)", () => {
  beforeEach(() => resetLobby());

  it("initialises with 2 default players and 2 default teams", () => {
    expect(arenaStore.players).toHaveLength(2);
    expect(arenaStore.players[0].name).toBe("Player 1");
    expect(arenaStore.players[1].name).toBe("Player 2");

    expect(arenaStore.teams).toHaveLength(2);
    expect(arenaStore.teams[0].name).toBe("Team 1");
    expect(arenaStore.teams[1].name).toBe("Team 2");
  });

  it("adds a player correctly up to a maximum of 4", () => {
    arenaStore.addPlayer();
    expect(arenaStore.players).toHaveLength(3);
    expect(arenaStore.players[2].name).toBe("Player 3");

    arenaStore.addPlayer();
    expect(arenaStore.players).toHaveLength(4);
    expect(arenaStore.players[3].name).toBe("Player 4");

    // Attempting a 5th player should be capped
    arenaStore.addPlayer();
    expect(arenaStore.players).toHaveLength(4);
  });

  it("removes a player correctly down to a minimum of 2", () => {
    arenaStore.addPlayer(); // now 3
    arenaStore.removePlayer(1);
    expect(arenaStore.players).toHaveLength(2);
    expect(arenaStore.players.find((p) => p.id === 1)).toBeUndefined();

    // Trying to remove below the minimum should be blocked
    arenaStore.removePlayer(0);
    expect(arenaStore.players).toHaveLength(2);
  });

  it("updates a player name correctly", () => {
    arenaStore.changePlayer(0, "Alpha");
    expect(arenaStore.players[0].name).toBe("Alpha");
    expect(arenaStore.players[0].id).toBe(0);
  });

  it("updates a team name correctly", () => {
    arenaStore.changeTeam(1, "Beta Team");
    expect(arenaStore.teams[1].name).toBe("Beta Team");
    expect(arenaStore.teams[1].id).toBe(1);
  });

  it("avoids duplicate player IDs after add → delete → add", () => {
    arenaStore.addPlayer(); // IDs: 0, 1, 2
    expect(arenaStore.players[2].id).toBe(2);

    arenaStore.removePlayer(1); // IDs: 0, 2
    expect(arenaStore.players).toHaveLength(2);

    arenaStore.addPlayer(); // nextId = max(0, 2) + 1 = 3
    expect(arenaStore.players).toHaveLength(3);

    const ids = arenaStore.players.map((p) => p.id);
    expect(ids).toEqual([0, 2, 3]);

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
