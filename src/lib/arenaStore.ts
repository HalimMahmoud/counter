import { proxy, subscribe } from "valtio";
import moment from "moment";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Player   = { id: number; name: string; score: number };
export type Team     = { id: number; name: string; score: number };
export type LogEntry = { date: string; message: string; id: number };

// ─── Persistence helpers ──────────────────────────────────────────────────────

const STORAGE_KEY = "arena-store-v1";

type PersistedState = {
  players:  Player[];
  teams:    Team[];
  scores:   Record<string, number>;
  activity: LogEntry[];
  history:  { scores: Record<string, number>; activity: LogEntry[] }[];
  future:   { scores: Record<string, number>; activity: LogEntry[] }[];
};

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

// ─── Default values ───────────────────────────────────────────────────────────

const defaults = {
  players:  [{ name: "Player 1", id: 0, score: 0 }, { name: "Player 2", id: 1, score: 0 }] as Player[],
  teams:    [{ name: "Team 1",  id: 0, score: 0 }, { name: "Team 2",  id: 1, score: 0 }]  as Team[],
  scores:   {} as Record<string, number>,
  activity: [] as LogEntry[],
  history:  [] as { scores: Record<string, number>; activity: LogEntry[] }[],
  future:   [] as { scores: Record<string, number>; activity: LogEntry[] }[],
};

// Hydrate from localStorage (or fall back to defaults)
const saved = loadState();

// ─── Unified Valtio Store ─────────────────────────────────────────────────────

export const arenaStore = proxy({
  // ── Lobby configuration ──────────────────────────────────────────────────
  players: (saved?.players ?? defaults.players) as Player[],
  teams:   (saved?.teams   ?? defaults.teams)   as Team[],

  // ── Arena session ─────────────────────────────────────────────────────────
  scores:   (saved?.scores   ?? defaults.scores)   as Record<string, number>,
  activity: (saved?.activity ?? defaults.activity) as LogEntry[],

  // History stacks — persisted so undo/redo survives app restarts
  history: (saved?.history ?? defaults.history) as { scores: Record<string, number>; activity: LogEntry[] }[],
  future:  (saved?.future  ?? defaults.future)  as { scores: Record<string, number>; activity: LogEntry[] }[],

  // ── Lobby actions ─────────────────────────────────────────────────────────

  addPlayer() {
    if (this.players.length >= 4) return;
    const nextId =
      this.players.length > 0
        ? Math.max(...this.players.map((p) => p.id)) + 1
        : 1;
    this.players.push({ name: `Player ${nextId + 1}`, id: nextId, score: 0 });
  },

  removePlayer(id: number) {
    if (this.players.length <= 2) return;
    const idx = this.players.findIndex((p) => p.id === id);
    if (idx !== -1) this.players.splice(idx, 1);
  },

  changePlayer(id: number, name: string) {
    const p = this.players.find((p) => p.id === id);
    if (p) p.name = name;
  },

  changeTeam(id: number, name: string) {
    const t = this.teams.find((t) => t.id === id);
    if (t) t.name = name;
  },

  // ── Arena session actions ─────────────────────────────────────────────────

  initializeSession(competitorIds: string[]) {
    for (const key in this.scores) delete this.scores[key];
    competitorIds.forEach((id) => { this.scores[id] = 0; });
    this.activity.length = 0;
    this.activity.push({ date: moment().calendar(), message: "Game has been started.", id: 0 });
    this.history.length = 0;
    this.future.length  = 0;
  },

  submitPoints(competitorId: string, points: number, message: string, date: string) {
    this.history.push({ scores: { ...this.scores }, activity: [...this.activity] });
    this.future.length = 0;
    this.scores[competitorId] = (this.scores[competitorId] ?? 0) + points;
    this.activity.push({ date, message, id: Date.now() });
  },

  undo() {
    if (this.history.length === 0) return;
    this.future.push({ scores: { ...this.scores }, activity: [...this.activity] });
    const prev = this.history.pop()!;
    for (const key in this.scores) delete this.scores[key];
    Object.assign(this.scores, prev.scores);
    this.activity.length = 0;
    this.activity.push(...prev.activity);
  },

  redo() {
    if (this.future.length === 0) return;
    this.history.push({ scores: { ...this.scores }, activity: [...this.activity] });
    const next = this.future.pop()!;
    for (const key in this.scores) delete this.scores[key];
    Object.assign(this.scores, next.scores);
    this.activity.length = 0;
    this.activity.push(...next.activity);
  },

  resetSession() {
    this.history.length = 0;
    this.future.length  = 0;
    for (const key in this.scores) this.scores[key] = 0;
    this.activity.length = 0;
    this.activity.push({ date: moment().calendar(), message: "Arena scores have been reset.", id: Date.now() });
  },
});

// ─── Auto-persist on any store mutation ──────────────────────────────────────
// Debounced so rapid keystrokes (player name typing) don't thrash storage.

let saveTimer: ReturnType<typeof setTimeout> | null = null;

subscribe(arenaStore, () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveState({
      players:  [...arenaStore.players],
      teams:    [...arenaStore.teams],
      scores:   { ...arenaStore.scores },
      activity: [...arenaStore.activity],
      history:  arenaStore.history.map(s => ({ scores: { ...s.scores }, activity: [...s.activity] })),
      future:   arenaStore.future.map(s  => ({ scores: { ...s.scores }, activity: [...s.activity] })),
    });
  }, 300);
});
