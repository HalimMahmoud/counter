export type Player   = { id: number; name: string; score: number; avatar?: string };
export type Team     = { id: number; name: string; score: number; avatar?: string };
export type LogEntry = {
  date: string;
  message: string;
  id: number;
  competitorId?: string;
  points?: number;
  oldName?: string;
  newName?: string;
  type?: "score" | "rename" | "system";
};

export type CompetitorActionProps = {
  method: (args: { date: string; message: string }) => void;
  shapeIndex: number;
  onSetAvatar: (type: "player" | "team", id: number, avatar: string) => void;
  onClearAvatar: (type: "player" | "team", id: number) => void;
  onChangeName: (type: "player" | "team", id: number, name: string) => void;
  onInitializeScore: (key: string, score: number) => void;
};

