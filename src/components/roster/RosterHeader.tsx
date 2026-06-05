import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type RosterHeaderProps = {
  title: string;
  onAdd?: () => void;
  disableAdd?: boolean;
};

export default function RosterHeader({ title, onAdd, disableAdd }: RosterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6 gap-2 border-b border-theme-border pb-3 md:pb-4">
      <Link to="/">
        <Button variant="outline" size="sm" className="gap-1 h-7 md:h-9 px-2 md:px-3 text-[10px] md:text-xs">
          <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2.5]" />
          Back
        </Button>
      </Link>
      <h2 className="text-xs md:text-sm lg:text-base font-black tracking-wider uppercase text-text-secondary">
        {title}
      </h2>
      {onAdd ? (
        <Button
          onClick={onAdd}
          disabled={disableAdd}
          variant="default"
          size="sm"
          className="gap-1 h-7 md:h-9 px-2 md:px-3 text-[10px] md:text-xs"
        >
          <Plus className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2.5]" />
          Add
        </Button>
      ) : (
        <div className="w-[52px] md:w-[68px]" />
      )}
    </div>
  );
}
