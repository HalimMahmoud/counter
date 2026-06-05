import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { psShapes } from "../../lib/psShapes";
import AvatarUpload from "./AvatarUpload";

interface IPlayerComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
  focusColorClass: string;
}

function Player({ name, id, method, focusColorClass }: IPlayerComponent) {
  const [playerName, setPlayerName] = useState(name);

  return (
    <Input
      type="text"
      placeholder="Name"
      value={playerName}
      onChange={(e) => {
        setPlayerName(e.target.value);
        method(id, e.target.value);
      }}
      className={`w-full h-7 md:h-9 text-xs md:text-sm px-2 md:px-3 focus:border-${focusColorClass}`}
    />
  );
}

interface PlayerItemProps {
  id: number;
  name: string;
  avatar?: string;
  index: number;
  disableDelete: boolean;
  onSetAvatar: (id: number, data: string) => void;
  onClearAvatar: (id: number) => void;
  onChangeName: (id: number, name: string) => void;
  onRemovePlayer: (id: number) => void;
}

export default function PlayerItem({
  id,
  name,
  avatar,
  index,
  disableDelete,
  onSetAvatar,
  onClearAvatar,
  onChangeName,
  onRemovePlayer,
}: PlayerItemProps) {
  const shape = psShapes[index % psShapes.length];

  return (
    <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3.5 rounded-xl border border-theme-border bg-theme-bg/20 transition-colors duration-200 hover:border-theme-border/60">
      <AvatarUpload
        id={id}
        name={name}
        avatar={avatar}
        shapeIndex={index}
        onUpload={onSetAvatar}
        onClear={onClearAvatar}
      />

      {/* Name input — takes remaining space */}
      <div className="flex-1 min-w-0">
        <Player
          name={name}
          id={id}
          method={onChangeName}
          focusColorClass={shape.colorName}
        />
      </div>

      {/* Remove button */}
      <Button
        onClick={() => onRemovePlayer(id)}
        disabled={disableDelete}
        variant="destructive"
        size="sm"
        className="h-7 md:h-9 px-2 md:px-3 text-[10px] md:text-xs shrink-0"
      >
        ✕
      </Button>
    </div>
  );
}
