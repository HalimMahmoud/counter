import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import { arenaStore } from "../lib/arenaStore";
import type { Team as TeamType } from "../lib/arenaStore";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { psShapes } from "./Players";
import { ArrowLeft } from "lucide-react";

export interface ITeamComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
  focusColorClass: string;
}

export function Team({ name, id, method, focusColorClass }: ITeamComponent) {
  const [teamName, setTeamName] = useState(name);

  return (
    <Input
      type="text"
      placeholder="Team Name"
      value={teamName}
      onChange={(e) => {
        setTeamName(e.target.value);
        method(id, e.target.value);
      }}
      className={`w-full sm:max-w-xs focus:border-${focusColorClass}`}
    />
  );
}

export default function Teams() {
  const snap = useSnapshot(arenaStore);
  const teams = snap.teams as TeamType[];

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
            Teams Configuration
          </h2>
          <div className="w-[68px]"></div> {/* Spacer to balance header centering */}
        </div>

        {/* Teams List */}
        <div className="space-y-4 mb-8">
          {teams.map(({ id, name }: TeamType, index) => {
            const shape = psShapes[index % psShapes.length];

            return (
              <div
                key={id}
                className="flex items-center p-4 rounded-xl border border-theme-border bg-theme-bg/20 transition-colors duration-200 hover:border-theme-border/60 gap-4 flex-col sm:flex-row justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* PlayStation Action Badge */}
                  <div className={`size-12 rounded-xl flex items-center justify-center border ${shape.colorClass} shadow-inner shrink-0 select-none`}>
                    {shape.svg}
                  </div>
                  <div className="w-full sm:w-auto">
                    <Team
                      name={name}
                      id={id}
                      method={(id, name) => arenaStore.changeTeam(id, name)}
                      focusColorClass={shape.colorName}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <Badge variant={shape.badgeVariant} className="uppercase font-black tracking-widest text-[8px] py-1">
                    Arena {index + 1}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* OK / Confirm Setup */}
        <div className="flex justify-end pt-4 border-t border-theme-border">
          <Link to="/mode/1">
            <Button variant="psBlue">
              Confirm Arena
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
