import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { handleScoreSubmit } from "@/lib/scoreUtils";

type ScoreControlsProps = {
  competitorKey: string;
  name: string;
  score: number;
  method: (args: { date: string; message: string }) => void;
  theme: {
    focus: string;
    btn: "psBlue" | "psRed" | "psGreen" | "psPink";
  };
};

export default function ScoreControls({
  competitorKey,
  name,
  score,
  method,
  theme,
}: ScoreControlsProps) {
  const [points, setPoints] = useState(0);

  return (
    <div className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] space-y-1.5 sm:space-y-2 md:space-y-3 mt-0.5 sm:mt-2">
      <div className="flex items-center gap-1 sm:gap-1.5 w-full">
        {/* Custom Minus Spin Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPoints((prev) => prev - 1)}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 px-0 shrink-0 select-none"
        >
          <Minus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[3.5]" />
        </Button>

        {/* Points Input */}
        <Input
          type="number"
          placeholder="Pts"
          value={points === 0 ? "" : points}
          onChange={(e) => {
            const val = Number(e.target.value);
            setPoints(isNaN(val) ? 0 : val);
          }}
          className={`text-center h-6 sm:h-8 md:h-9 px-0.5 text-[10px] sm:text-xs md:text-sm placeholder:text-[8px] sm:placeholder:text-[10px] font-bold ${theme.focus} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />

        {/* Custom Plus Spin Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPoints((prev) => prev + 1)}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 px-0 shrink-0 select-none"
        >
          <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[3.5]" />
        </Button>
      </div>

      <Button
        onClick={() => handleScoreSubmit(points, competitorKey, name, score, method, setPoints)}
        variant={theme.btn}
        size="sm"
        className="w-full text-[9px] sm:text-xs md:text-sm h-6 sm:h-8 md:h-9"
      >
        +Points
      </Button>
    </div>
  );
}
