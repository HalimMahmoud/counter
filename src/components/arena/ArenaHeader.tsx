import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

type ArenaHeaderProps = {
  isTeamMode: boolean;
  onResetClick: () => void;
};

export default function ArenaHeader({ isTeamMode, onResetClick }: ArenaHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-2 border-b border-theme-border pb-3">
      <Link to="/">
        <Button
          variant="outline"
          size="sm"
          className="gap-1 px-2 text-[10px] sm:text-xs md:text-sm sm:gap-1.5 sm:px-3 md:px-4"
        >
          <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
          Home
        </Button>
      </Link>

      <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-black tracking-wider uppercase text-text-secondary text-center">
        {isTeamMode ? "Team Arena" : "Player Arena"}
      </h1>

      <Button
        variant="destructive"
        size="sm"
        onClick={onResetClick}
        className="gap-1 px-2 text-[10px] sm:text-xs md:text-sm sm:gap-1.5 sm:px-3 md:px-4 shrink-0"
      >
        <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        Reset
      </Button>
    </div>
  );
}
