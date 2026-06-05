import { useArenaState } from "@/lib/useArenaState";
import AvatarUpload from "@/components/roster/AvatarUpload";
import ScoreControls from "@/components/arena/ScoreControls";
import CompetitorNameEditor from "@/components/roster/CompetitorNameEditor";
import { useCompetitorCardState } from "@/lib/useCompetitorCardState";
import type { CompetitorActionProps } from "@/lib/types";

type CompetitorCardProps = CompetitorActionProps & {
  type: "player" | "team";
  id: number;
  score: number;
  name: string;
};


const VARIANTS = [
  { text: "text-sky-600 dark:text-sky-400", focus: "focus:border-sky-500", btn: "psBlue" as const },
  { text: "text-rose-600 dark:text-rose-400", focus: "focus:border-rose-500", btn: "psRed" as const },
  { text: "text-emerald-655 dark:text-emerald-400", focus: "focus:border-emerald-500", btn: "psGreen" as const },
  { text: "text-pink-600 dark:text-pink-400", focus: "focus:border-pink-500", btn: "psPink" as const },
];

function getAvatar(snap: any, type: "player" | "team", id: number): string | undefined {
  const list = type === "player" ? snap.players : snap.teams;
  return list.find((item: any) => item.id === id)?.avatar;
}

export default function CompetitorCard({
  type, id, score, name, method, shapeIndex,
  onSetAvatar, onClearAvatar, onChangeName, onInitializeScore,
}: CompetitorCardProps) {
  const snap = useArenaState();
  const key = `${type}-${id}`;
  const count = snap.scores[key] ?? score;
  const { isEditing, setIsEditing, editedName, setEditedName, handleSave } =
    useCompetitorCardState(type, id, name, key, score, onChangeName, onInitializeScore);
  const avatar = getAvatar(snap, type, id);
  const theme = VARIANTS[shapeIndex % VARIANTS.length];

  return (
    <div className="flex flex-col items-center p-1.5 sm:p-3 md:p-4 lg:p-5 text-center w-full">
      <AvatarUpload
        id={id} name={name} avatar={avatar} shapeIndex={shapeIndex} isArena={true}
        onUpload={(uid, data) => onSetAvatar(type, uid, data)}
        onClear={(uid) => onClearAvatar(type, uid)}
      />
      <CompetitorNameEditor
        isEditing={isEditing} editedName={editedName} name={name}
        setEditedName={setEditedName} setIsEditing={setIsEditing} onSave={handleSave}
      />
      <div className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter my-1 sm:my-3 md:my-4 ${theme.text}`}>
        {count}
      </div>
      <ScoreControls competitorKey={key} name={name} score={score} method={method} theme={theme} />
    </div>
  );
}
