import { useState, useEffect } from "react";
import Individual from "./Individual";
import { Link, useParams } from "react-router-dom";
import type { Player, Team } from "../lib/arenaStore";
import Group from "./Group";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { psShapes } from "../routes/Players";
import { useSnapshot } from "valtio";
import { arenaStore } from "../lib/arenaStore";

import { ArrowLeft, RotateCcw, Undo2, Redo2 } from "lucide-react";

type Activity = { date: string; message: string };

export default function Switcher({
  players,
  teams,
}: {
  players: Player[];
  teams: Team[];
}) {
  const params = useParams();
  const [resetKey, setResetKey] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const snap = useSnapshot(arenaStore);

  const isTeamMode = Number(params.mode) === 1;
  const listItems = isTeamMode ? teams : players;

  useEffect(() => {
    const ids = isTeamMode
      ? teams.map((t) => `team-${t.id}`)
      : players.map((p) => `player-${p.id}`);
    
    const storeKeys = Object.keys(arenaStore.scores);
    const matches = ids.length === storeKeys.length && ids.every(id => storeKeys.includes(id));
    
    if (!matches) {
      arenaStore.initializeSession(ids);
    }
  }, [isTeamMode, players.length, teams.length]);

  const changeActivity = (_newActivity: Activity) => {
    // Score cards submit points directly to Valtio, no local activity update needed.
  };

  // Determine grid columns: spacious 2-column grid layout for all configurations (2, 3, or 4 players)
  const gridCols = "grid-cols-1 md:grid-cols-2";

  // Dynamic helper to match timeline logs with the correct PlayStation button shape
  const findActorShape = (msg: string) => {
    // Check players
    const pIdx = players.findIndex(p => msg.includes(p.name));
    if (pIdx !== -1) return psShapes[pIdx % psShapes.length];
    
    // Check teams
    const tIdx = teams.findIndex(t => msg.includes(t.name));
    if (tIdx !== -1) return psShapes[tIdx % psShapes.length];

    return null;
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto my-4 select-none">
      {/* Top Console Bar */}
      <div className="flex justify-between items-center gap-4 border-b border-theme-border pb-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            Console Home
          </Button>
        </Link>
        
        <h1 className="text-sm font-black tracking-wider uppercase text-text-secondary">
          {isTeamMode ? "Team Arena Dashboard" : "Player Arena Dashboard"}
        </h1>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowResetModal(true)}
          className="gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* Main Scoreboard Arena */}
      <div className="relative">
        {/* Versus Overlay D-pad for exactly 2 competitors */}
        {listItems.length === 2 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
            <div className="w-12 h-12 rounded-xl bg-theme-card border border-theme-border flex items-center justify-center text-xs font-black tracking-widest text-text-secondary shadow-md relative">
              {/* D-Pad cross lines */}
              <div className="absolute w-8 h-2 bg-theme-bg rounded-full"></div>
              <div className="absolute w-2 h-8 bg-theme-bg rounded-full"></div>
              <div className="absolute z-10 text-[9px] font-black uppercase text-text-secondary">VS</div>
            </div>
          </div>
        )}

        <div className={`grid ${gridCols} gap-6 relative`}>
          {listItems.map((x, idx) => {
            const shape = psShapes[idx % psShapes.length];

            return (
              <Card
                key={`${x.id}-${resetKey}`}
                className="relative overflow-hidden bg-theme-card border-theme-border hover:border-theme-border/80 shadow-md"
              >
                {/* PlayStation shape watermark */}
                <div className="absolute right-3 top-3 opacity-[0.04] dark:opacity-[0.025] pointer-events-none text-text-primary">
                  {shape.svg}
                </div>

                <CardContent className="p-6 flex flex-col items-center relative">
                  {/* Competitor Shape Identifier Badge */}
                  <div className={`size-10 rounded-xl flex items-center justify-center border ${shape.colorClass} shadow-inner shrink-0 select-none mb-2`}>
                    {shape.svg}
                  </div>

                  {/* Render Score controller */}
                  {isTeamMode ? (
                    <Group {...(x as Team)} method={changeActivity} shapeIndex={idx} />
                  ) : (
                    <Individual {...(x as Player)} method={changeActivity} shapeIndex={idx} />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modern Live Activity logs */}
      <Card className="bg-theme-card border-theme-border shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-center gap-4 mb-6">
            <h3 className="text-xs font-black tracking-widest uppercase text-text-secondary flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              System Arena Feed
            </h3>

            {/* Undo / Redo controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => arenaStore.undo()}
                disabled={snap.history.length === 0}
                className="gap-1 px-2.5 py-1 text-[11px] font-black tracking-wider uppercase disabled:opacity-40 shadow-sm cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => arenaStore.redo()}
                disabled={snap.future.length === 0}
                className="gap-1 px-2.5 py-1 text-[11px] font-black tracking-wider uppercase disabled:opacity-40 shadow-sm cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all"
              >
                <Redo2 className="w-3.5 h-3.5" />
                Redo
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-h-[25vh] overflow-y-auto pr-2">
            {snap.activity.length > 0 ? (
              <div className="relative border-l border-theme-border ml-3 pl-5 space-y-5">
                {snap.activity.map((x, i) => {
                  const actorShape = findActorShape(x.message);

                  return (
                    <div key={x.id ?? i} className="relative group">
                      {/* Timeline shape bullet indicator */}
                      <span className={`absolute -left-[27px] top-1 size-3.5 rounded-md bg-theme-bg border border-theme-border flex items-center justify-center text-[7px] font-black group-hover:scale-105 transition-transform ${
                        actorShape ? actorShape.colorClass : "text-text-secondary"
                      }`}>
                        {actorShape ? actorShape.symbol : "🕹️"}
                      </span>
                      
                      <div className="flex flex-col text-xs gap-0.5">
                        <p className="font-semibold text-text-primary">
                          {x.message}
                        </p>
                        <span className="text-[10px] text-text-secondary font-medium">
                          {x.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-text-secondary text-center py-4">
                No active session logs.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* PlayStation-Inspired Yes/No Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-theme-bg/60 backdrop-blur-sm transition-opacity duration-300">
          <Card className="w-full max-w-sm bg-theme-card border-theme-border shadow-xl animate-in fade-in-50 zoom-in-95 duration-200">
            <CardContent className="p-6 flex flex-col items-center text-center gap-6">
              {/* Reset Warning Symbol Accent */}
              <div className="size-12 rounded-xl flex items-center justify-center border border-rose-500/20 text-rose-500 bg-rose-500/5 shadow-inner">
                <RotateCcw className="w-6 h-6 animate-spin-reverse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-black tracking-widest uppercase text-text-primary">
                  RESET SESSION?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold uppercase tracking-wider">
                  ARE YOU SURE YOU WANT TO CLEAR ALL COMPETITOR ARENA SCORES?
                </p>
              </div>

              <div className="flex items-center gap-3 w-full">
                {/* Cancel / No Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1"
                >
                  NO
                </Button>
                
                {/* Confirm / Yes Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setResetKey((prev) => prev + 1);
                    arenaStore.resetSession();
                    setShowResetModal(false);
                  }}
                  className="flex-1"
                >
                  YES
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
