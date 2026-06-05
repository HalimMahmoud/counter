import { proxy, subscribe } from "valtio";
import moment from "moment";
import type { Player, Team, LogEntry } from "@/lib/types";

export type { Player, Team, LogEntry };



// ─── Checkpoint helpers ───────────────────────────────────────────────────────

export function copyStateCheckpoint(s: {
  scores: Record<string, number>;
  activity: LogEntry[];
  players: Player[];
  teams: Team[];
}) {
  return {
    scores: { ...s.scores },
    activity: s.activity.map((a) => ({ ...a })),
    players: s.players.map((p) => ({ ...p })),
    teams: s.teams.map((t) => ({ ...t })),
  };
}

export function applyStateCheckpoint(
  store: { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] },
  checkpoint: { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }
) {
  Object.keys(store.scores).forEach((key) => { delete store.scores[key]; });
  Object.assign(store.scores, checkpoint.scores);

  store.activity.length = 0;
  store.activity.push(...checkpoint.activity);

  store.players.length = 0;
  checkpoint.players.forEach((p) => store.players.push({ ...p }));

  store.teams.length = 0;
  checkpoint.teams.forEach((t) => store.teams.push({ ...t }));
}

// ─── Persistence helpers ──────────────────────────────────────────────────────

const STORAGE_KEY      = "arena-store-v1";
const PERSIST_FLAG_KEY = "arena-persist-enabled";

type PersistedState = {
  players:      Player[];
  teams:        Team[];
  scores:       Record<string, number>;
  activity:     LogEntry[];
  history:      { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[];
  future:       { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[];
  nextPlayerId: number;
};

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

// ─── Persistence control flag ─────────────────────────────────────────────────
// A plain mutable object (not proxy) — checked inside the subscribe callback.
// Allows App.tsx to disable persistence without triggering a re-subscribe.

export const persistenceControl = {
  enabled: localStorage.getItem(PERSIST_FLAG_KEY) !== "false",
};

export function setPersistence(enabled: boolean) {
  persistenceControl.enabled = enabled;
  localStorage.setItem(PERSIST_FLAG_KEY, String(enabled));
}

// ─── Default values ───────────────────────────────────────────────────────────

const storeDefaults = {
  players:      [{ name: "Alpha", id: 0, score: 0 }, { name: "Bravo", id: 1, score: 0 }] as Player[],
  teams:        [{ name: "Team 1", id: 0, score: 0 }, { name: "Team 2", id: 1, score: 0 }]  as Team[],
  scores:       {} as Record<string, number>,
  activity:     [] as LogEntry[],
  history:      [] as { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[],
  future:       [] as { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[],
  nextPlayerId: 2, // 0 and 1 are already used by the two defaults
};

// Hydrate from localStorage only if persistence is enabled
const saved = persistenceControl.enabled ? loadState() : null;

// ─── Unified Valtio Store ─────────────────────────────────────────────────────

const getStoreList = (store: any, type: "player" | "team"): (Player | Team)[] => {
  return type === "player" ? store.players : store.teams;
};

function findNextName(players: Player[]): string {
  const codenames = ["Alpha", "Bravo", "Nova", "Cipher"];
  const usedNames = new Set(players.map((p) => p.name));
  return codenames.find((c) => !usedNames.has(c)) ?? "Player";
}

function getPersistedState(store: typeof arenaStore): PersistedState {
  return {
    players:      [...store.players],
    teams:        [...store.teams],
    scores:       { ...store.scores },
    activity:     [...store.activity],
    nextPlayerId: store.nextPlayerId,
    history:      store.history.map(copyStateCheckpoint),
    future:       store.future.map(copyStateCheckpoint),
  };
}

// ─── Store method helpers ────────────────────────────────────────────────────

function clearListAndRefill<T extends object>(list: T[], defaults: T[]) {
  list.length = 0;
  defaults.forEach((item) => list.push({ ...item }));
}

function clearScores(scores: Record<string, number>) {
  Object.keys(scores).forEach((key) => { delete scores[key]; });
}

function buildRenameEntry(
  type: "player" | "team",
  id: number,
  oldName: string,
  newName: string
): LogEntry {
  return {
    date: moment().calendar(),
    message: `${oldName} changed name to ${newName}`,
    id: Date.now(),
    competitorId: `${type}-${id}`,
    oldName,
    newName,
    type: "rename",
  };
}

export const arenaStore = proxy({
  // ── Lobby configuration ──────────────────────────────────────────────────
  players: (saved?.players ?? storeDefaults.players) as Player[],
  teams:   (saved?.teams   ?? storeDefaults.teams)   as Team[],

  // ── Monotonic ID counter (never resets, never reuses) ────────────────────
  nextPlayerId: saved?.nextPlayerId
    ?? (saved?.players && saved.players.length > 0
        ? Math.max(...saved.players.map((p) => p.id)) + 1
        : storeDefaults.nextPlayerId),

  // ── Arena session ─────────────────────────────────────────────────────────
  scores:   (saved?.scores   ?? storeDefaults.scores)   as Record<string, number>,
  activity: (saved?.activity ?? storeDefaults.activity) as LogEntry[],

  // History stacks
  history: (saved?.history ?? storeDefaults.history) as { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[],
  future:  (saved?.future  ?? storeDefaults.future)  as { scores: Record<string, number>; activity: LogEntry[]; players: Player[]; teams: Team[] }[],

  // ── Lobby actions ─────────────────────────────────────────────────────────

  addPlayer() {
    if (this.players.length >= 4) return;
    const id = this.nextPlayerId++;
    const name = findNextName(this.players);
    this.players.push({ name, id, score: 0 });
  },

  removePlayer(id: number) {
    if (this.players.length <= 2) return;
    const idx = this.players.findIndex((p) => p.id === id);
    if (idx !== -1) this.players.splice(idx, 1);
  },

  changeName(type: "player" | "team", id: number, name: string) {
    const list = getStoreList(this, type);
    const p = list.find((item) => item.id === id);
    if (!p) return;
    const oldName = p.name;
    const isActive = this.activity.length > 0;
    if (isActive) {
      this.history.push(copyStateCheckpoint(this));
      this.future.length = 0;
    }
    p.name = name;
    if (isActive) this.activity.push(buildRenameEntry(type, id, oldName, name));
  },

  setAvatar(type: "player" | "team", id: number, avatar: string) {
    const list = getStoreList(this, type);
    const p = list.find((item) => item.id === id);
    if (p) p.avatar = avatar;
  },

  // ── Full reset to factory defaults ────────────────────────────────────────

  clearAndReset() {
    clearListAndRefill(this.players, storeDefaults.players);
    clearListAndRefill(this.teams, storeDefaults.teams);
    clearScores(this.scores);
    this.activity.length = 0;
    this.history.length = 0;
    this.future.length = 0;
    this.nextPlayerId = storeDefaults.nextPlayerId;
  },

  // ── Arena session actions ─────────────────────────────────────────────────

  initializeSession(competitorIds: string[]) {
    clearScores(this.scores);
    competitorIds.forEach((id) => { this.scores[id] = 0; });
    this.activity.length = 0;
    this.activity.push({ date: moment().calendar(), message: "Game has been started.", id: 0 });
    this.history.length = 0;
    this.future.length = 0;
  },

  submitPoints(competitorId: string, points: number, message: string, date: string) {
    this.history.push(copyStateCheckpoint(this));
    this.future.length = 0;
    this.scores[competitorId] = (this.scores[competitorId] ?? 0) + points;
    this.activity.push({ date, message, id: Date.now(), competitorId, points, type: "score" });
  },

  undo() {
    if (this.history.length === 0) return;
    this.future.push(copyStateCheckpoint(this));
    const prev = this.history.pop()!;
    applyStateCheckpoint(this, prev);
  },

  redo() {
    if (this.future.length === 0) return;
    this.history.push(copyStateCheckpoint(this));
    const next = this.future.pop()!;
    applyStateCheckpoint(this, next);
  },

  resetSession() {
    this.history.length = 0;
    this.future.length  = 0;
    Object.keys(this.scores).forEach((key) => { this.scores[key] = 0; });
    this.activity.length = 0;
    this.activity.push({ date: moment().calendar(), message: "Arena scores have been reset.", id: Date.now() });
  },
});

// ─── Auto-persist on any store mutation ──────────────────────────────────────

let saveTimer: ReturnType<typeof setTimeout> | null = null;

subscribe(arenaStore, () => {
  if (!persistenceControl.enabled) return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveState(getPersistedState(arenaStore));
  }, 300);
});
