import { useState } from "react";
import { useParams } from "react-router-dom";
import { useArenaState } from "@/lib/useArenaState";
import { arenaStore } from "@/lib/arenaStore";
import ArenaHeader from "@/components/arena/ArenaHeader";
import ArenaFeed from "@/components/arena/ArenaFeed";
import ResetConfirmModal from "@/components/arena/ResetConfirmModal";
import { ScoreboardGrid } from "@/components/arena/ScoreboardGrid";
import { useSessionInitializer } from "@/lib/useSessionInitializer";


export default function Switcher() {
  const params = useParams();
  const [resetKey, setResetKey] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const snap = useArenaState();

  const isTeamMode = Number(params.mode) === 1;
  const listItems = isTeamMode ? snap.teams : snap.players;

  useSessionInitializer(snap, isTeamMode, snap.players.length, snap.teams.length);


  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-4xl mx-auto my-2 md:my-4 select-none">
      {/* Top Console Bar */}
      <ArenaHeader isTeamMode={isTeamMode} onResetClick={() => setShowResetModal(true)} />

      {/* Main Scoreboard Arena */}
      <ScoreboardGrid
        listItems={listItems}
        isTeamMode={isTeamMode}
        resetKey={resetKey}
      />


      {/* Modern Live Activity logs */}
      <ArenaFeed />

      {/* PlayStation-Inspired Yes/No Modal */}
      <ResetConfirmModal
        isOpen={showResetModal}
        onCancel={() => setShowResetModal(false)}
        onConfirm={() => {
          setResetKey((prev) => prev + 1);
          arenaStore.resetSession();
          setShowResetModal(false);
        }}
      />
    </div>
  );
}
