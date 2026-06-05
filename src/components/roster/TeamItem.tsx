import { useState } from "react";
import { Input } from "@/components/ui/input";
import { psShapes } from "@/lib/psShapes";
import AvatarUpload from "@/components/roster/AvatarUpload";

interface ITeamComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
  focusColorClass: string;
}

function Team({ name, id, method, focusColorClass }: ITeamComponent) {
  const [teamName, setTeamName] = useState(name);

  return (
    <Input
      type="text"
      placeholder="Name"
      value={teamName}
      onChange={(e) => {
        setTeamName(e.target.value);
        method(id, e.target.value);
      }}
      className={`w-full h-7 md:h-9 text-xs md:text-sm px-2 md:px-3 focus:border-${focusColorClass}`}
    />
  );
}

interface TeamItemProps {
  id: number;
  name: string;
  avatar?: string;
  index: number;
  onSetAvatar: (id: number, data: string) => void;
  onClearAvatar: (id: number) => void;
  onChangeName: (id: number, name: string) => void;
}

export default function TeamItem({
  id,
  name,
  avatar,
  index,
  onSetAvatar,
  onClearAvatar,
  onChangeName,
}: TeamItemProps) {
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
        <Team
          name={name}
          id={id}
          method={onChangeName}
          focusColorClass={shape.colorName}
        />
      </div>
    </div>
  );
}
