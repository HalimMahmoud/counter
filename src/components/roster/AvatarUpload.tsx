import { useRef } from "react";
import { psShapes } from "../../lib/psShapes";
import {
  renderShapeIcon,
  getAvatarStyles,
  handleAvatarFileChange,
} from "../../lib/avatarUploadUtils";

interface AvatarUploadProps {
  id: number;
  name: string;
  avatar?: string;
  shapeIndex: number;
  onUpload: (id: number, dataUrl: string) => void;
  onClear: (id: number) => void;
  isArena?: boolean;
}

function AvatarContent({
  avatar,
  name,
  isArena,
  shape,
  shapeIndex,
  svgClass,
}: {
  avatar?: string;
  name: string;
  isArena: boolean;
  shape: any;
  shapeIndex: number;
  svgClass: string;
}) {
  if (avatar) {
    return <img src={avatar} alt={`${name}'s avatar`} className="w-full h-full object-cover" />;
  }

  const fallbackClass = isArena
    ? `w-full h-full flex items-center justify-center opacity-60 ${shape.colorClass.split(" ")[0]}`
    : "w-full h-full flex items-center justify-center";

  return (
    <div className={fallbackClass}>
      {renderShapeIcon(shapeIndex, svgClass)}
    </div>
  );
}

export default function AvatarUpload({
  id,
  name,
  avatar,
  shapeIndex,
  onUpload,
  onClear,
  isArena = false,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shape = psShapes[shapeIndex % psShapes.length];

  const { containerClass, svgClass, hoverText, hoverOverlayClass, clearBtnClass } =
    getAvatarStyles(isArena, avatar, shape.colorClass);

  return (
    <div className="relative group shrink-0 select-none">
      <div onClick={() => fileInputRef.current?.click()} className={containerClass}>
        <AvatarContent
          avatar={avatar}
          name={name}
          isArena={isArena}
          shape={shape}
          shapeIndex={shapeIndex}
          svgClass={svgClass}
        />
        <div className={hoverOverlayClass}>{hoverText}</div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleAvatarFileChange(e, id, onUpload)}
        accept="image/*"
        className="hidden"
      />

      {avatar && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear(id);
          }}
          className={clearBtnClass}
          title="Remove avatar"
        >
          ✕
        </button>
      )}
    </div>
  );
}

