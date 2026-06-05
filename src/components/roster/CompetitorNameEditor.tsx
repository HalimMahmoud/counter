
type CompetitorNameEditorProps = {
  isEditing: boolean;
  editedName: string;
  name: string;
  setEditedName: (val: string) => void;
  setIsEditing: (val: boolean) => void;
  onSave: () => void;
};

export default function CompetitorNameEditor({
  isEditing,
  editedName,
  name,
  setEditedName,
  setIsEditing,
  onSave,
}: CompetitorNameEditorProps) {
  if (isEditing) {
    return (
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        onBlur={onSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") {
            setEditedName(name);
            setIsEditing(false);
          }
        }}
        autoFocus
        className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-black tracking-wider uppercase text-text-primary bg-theme-bg border border-theme-border/60 rounded px-1.5 py-0.5 text-center focus:outline-none w-full max-w-[120px] sm:max-w-[160px]"
      />
    );
  }

  return (
    <h2
      onClick={() => setIsEditing(true)}
      className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-black tracking-wider uppercase text-text-secondary truncate w-full cursor-pointer hover:text-text-primary hover:bg-theme-bg/10 rounded px-1.5 py-0.5 transition-all select-none flex items-center justify-center gap-1 group"
    >
      {name}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-text-secondary/50 font-normal">
        ✎
      </span>
    </h2>
  );
}
