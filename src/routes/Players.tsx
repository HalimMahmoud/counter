import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { arenaStore } from "../lib/arenaStore";
import type { Player as PlayerType } from "../lib/arenaStore";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Plus } from "lucide-react";

export interface IPlayerComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
  focusColorClass: string;
}

export function Player({ name, id, method, focusColorClass }: IPlayerComponent) {
  const [playerName, setPlayerName] = useState(name);

  return (
    <Input
      type="text"
      placeholder="Player Name"
      value={playerName}
      onChange={(e) => {
        setPlayerName(e.target.value);
        method(id, e.target.value);
      }}
      className={`w-full sm:max-w-xs focus:border-${focusColorClass}`}
    />
  );
}

// Map index of player to PlayStation symbols
export const psShapes = [
  {
    symbol: "✕",
    label: "Cross",
    colorName: "sky-500",
    colorClass: "text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-850 bg-sky-100 dark:bg-sky-950",
    badgeVariant: "cross" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
  },
  {
    symbol: "◯",
    label: "Circle",
    colorName: "rose-500",
    colorClass: "text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-850 bg-rose-100 dark:bg-rose-950",
    badgeVariant: "circle" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
  {
    symbol: "△",
    label: "Triangle",
    colorName: "emerald-500",
    colorClass: "text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-855 bg-emerald-100 dark:bg-emerald-950",
    badgeVariant: "triangle" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
        <polygon points="12 4, 20 19, 4 19" />
      </svg>
    ),
  },
  {
    symbol: "▢",
    label: "Square",
    colorName: "pink-500",
    colorClass: "text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-850 bg-pink-100 dark:bg-pink-950",
    badgeVariant: "square" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
      </svg>
    ),
  },
];

export default function Players() {
  const snap = useSnapshot(arenaStore);
  const players = snap.players as PlayerType[];

  return (
    <Card className="w-full max-w-2xl mx-auto my-4 bg-theme-card border-theme-border shadow-md">
      <CardContent className="p-6 md:p-8">
        {/* Header navigation bar */}
        <div className="flex flex-row justify-between items-center mb-8 gap-4 border-b border-theme-border pb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              Back
            </Button>
          </Link>
          <h2 className="text-sm font-black tracking-wider uppercase text-text-secondary">
            Players Configuration
          </h2>
          <Button
            onClick={() => arenaStore.addPlayer()}
            disabled={players.length >= 4}
            variant="default"
            size="sm"
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Add
          </Button>
        </div>

        {/* Competitors setup panel */}
        <div className="space-y-4 mb-8 max-h-[45vh] overflow-y-auto pr-1">
          {players.map(({ id, name }: PlayerType, index) => {
            const shape = psShapes[index % psShapes.length];

            return (
              <div
                key={id}
                className="flex items-center justify-between p-4 rounded-xl border border-theme-border bg-theme-bg/20 transition-colors duration-200 hover:border-theme-border/60 flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* PlayStation Identifier Tag */}
                  <div className={`size-12 rounded-xl flex items-center justify-center border ${shape.colorClass} shadow-inner shrink-0 select-none`}>
                    {shape.svg}
                  </div>
                  <div className="w-full sm:w-auto">
                    <Player
                      name={name}
                      id={id}
                      method={(id, name) => arenaStore.changePlayer(id, name)}
                      focusColorClass={shape.colorName}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Badge variant={shape.badgeVariant} className="uppercase font-black tracking-widest text-[8px] py-1">
                    Slot {index + 1}
                  </Badge>
                  <Button
                    onClick={() => arenaStore.removePlayer(id)}
                    disabled={players.length === 2}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* OK / Confirm Setup */}
        <div className="flex justify-end pt-4 border-t border-theme-border">
          <Link to={`/mode/${players.length}`}>
            <Button variant="psBlue">
              Confirm Controllers
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
