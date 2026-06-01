import { useState } from "react";
import moment from "moment";
import type { Team } from "../lib/arenaStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useSnapshot } from "valtio";
import { arenaStore } from "../lib/arenaStore";

type GroupProps = Team & {
  method: (args: { date: string; message: string }) => void;
  shapeIndex: number;
};

export default function Group({ id, score, name, method, shapeIndex }: GroupProps) {
  const snap = useSnapshot(arenaStore);
  const count = snap.scores[`team-${id}`] ?? score;
  const [points, setPoints] = useState(0);

  // Map competitor to PlayStation colors
  const variants = [
    { text: "text-sky-600 dark:text-sky-400", focus: "focus:border-sky-500", btn: "psBlue" as const },
    { text: "text-rose-600 dark:text-rose-400", focus: "focus:border-rose-500", btn: "psRed" as const },
    { text: "text-emerald-655 dark:text-emerald-400", focus: "focus:border-emerald-500", btn: "psGreen" as const },
    { text: "text-pink-600 dark:text-pink-400", focus: "focus:border-pink-500", btn: "psPink" as const },
  ];
  const theme = variants[shapeIndex % variants.length];

  return (
    <div className="flex flex-col items-center p-6 text-center w-full">
      {/* Team Name */}
      <h2 className="text-sm font-black tracking-wider uppercase text-text-secondary">
        {name}
      </h2>

      {/* Giant Score Display */}
      <div className={`text-6xl font-black font-display tracking-tighter my-4 ${theme.text}`}>
        {count}
      </div>

      {/* Score Controls */}
      <div className="w-full max-w-[180px] space-y-3 mt-2">
        <div className="flex items-center gap-1.5 w-full">
          {/* Custom Minus Spin Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPoints((prev) => prev - 1)}
            className="w-9 px-0 shrink-0 select-none"
          >
            <Minus className="w-3.5 h-3.5 stroke-[3.5]" />
          </Button>

          {/* Points Input */}
          <Input
            type="number"
            placeholder="Points"
            value={points === 0 ? "" : points}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPoints(isNaN(val) ? 0 : val);
            }}
            className={`text-center h-9 px-1 text-xs placeholder:text-[11px] font-bold ${theme.focus} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />

          {/* Custom Plus Spin Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPoints((prev) => prev + 1)}
            className="w-9 px-0 shrink-0 select-none"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3.5]" />
          </Button>
        </div>

        <Button
          onClick={() => {
            if (points === 0 || isNaN(points)) return;
            const message = points > -1
              ? `Added ${points} to ${name}`
              : `Subtracted ${Math.abs(points)} from ${name}`;
            const date = moment().calendar();
            if (arenaStore.scores[`team-${id}`] === undefined) {
              arenaStore.scores[`team-${id}`] = score;
            }
            arenaStore.submitPoints(`team-${id}`, points, message, date);
            method({ date, message });
            setPoints(0);
          }}
          variant={theme.btn}
          size="sm"
          className="w-full"
        >
          Add Points
        </Button>
      </div>
    </div>
  );
}
