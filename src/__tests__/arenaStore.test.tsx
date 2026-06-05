import { describe, it, expect, beforeEach } from "vitest";
import {
  arenaStore,
  copyStateCheckpoint,
  applyStateCheckpoint,
  loadState,
  saveState,
  persistenceControl,
  setPersistence,
} from "@/lib/arenaStore";
import { resetTestStore } from "@/__tests__/testHelper";
import { getLogMessage } from "@/lib/logUtils";

describe("arenaStore — lobby (players & teams) initialization", () => {
  beforeEach(() => resetTestStore(true));

  it("statically links module helper references", () => {
    expect(copyStateCheckpoint).toBeDefined();
    expect(applyStateCheckpoint).toBeDefined();
    expect(loadState).toBeDefined();
    expect(saveState).toBeDefined();
    expect(persistenceControl).toBeDefined();
    expect(setPersistence).toBeDefined();
  });

  it("initialises with 2 default players and 2 default teams", () => {
    expect(arenaStore.players).toHaveLength(2);
    expect(arenaStore.players[0].name).toBe("Player 1");
    expect(arenaStore.players[1].name).toBe("Player 2");

    expect(arenaStore.teams).toHaveLength(2);
    expect(arenaStore.teams[0].name).toBe("Team 1");
    expect(arenaStore.teams[1].name).toBe("Team 2");
  });

  it("updates a player name correctly", () => {
    arenaStore.changeName("player", 0, "Alpha");
    expect(arenaStore.players[0].name).toBe("Alpha");
    expect(arenaStore.players[0].id).toBe(0);
  });

  it("updates a team name correctly", () => {
    arenaStore.changeName("team", 1, "Beta Team");
    expect(arenaStore.teams[1].name).toBe("Beta Team");
    expect(arenaStore.teams[1].id).toBe(1);
  });
});

describe("arenaStore — lobby (players & teams) player alterations", () => {
  beforeEach(() => resetTestStore(true));

  it("adds a player correctly up to a maximum of 4", () => {
    arenaStore.addPlayer();
    expect(arenaStore.players).toHaveLength(3);
    expect(arenaStore.players[2].name).toBe("Alpha");

    arenaStore.addPlayer();
    expect(arenaStore.players).toHaveLength(4);
    expect(arenaStore.players[3].name).toBe("Bravo");

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

describe("arenaStore — lobby (players & teams) log messages", () => {
  beforeEach(() => resetTestStore(true));

  it("resolves competitor names dynamically in activity logs when changed", () => {
    // Start session
    arenaStore.initializeSession(["player-0", "player-1"]);
    
    // Submit score
    arenaStore.submitPoints("player-0", 5, "Added 5 to Player 1", "Today");
    expect(arenaStore.activity[1].type).toBe("score");
    expect(arenaStore.activity[1].competitorId).toBe("player-0");
    
    // Check initial resolved name
    const msgBefore = getLogMessage(arenaStore.activity[1], arenaStore.players, arenaStore.teams);
    expect(msgBefore).toBe("Added 5 to Player 1");
    
    // Change player name
    arenaStore.changeName("player", 0, "Omega");
    
    // Check if resolved name in history dynamically reflects "Omega"
    const msgAfter = getLogMessage(arenaStore.activity[1], arenaStore.players, arenaStore.teams);
    expect(msgAfter).toBe("Added 5 to Omega");
  });
});
