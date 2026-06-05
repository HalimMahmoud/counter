import { useArenaState } from "@/lib/useArenaState";
import { arenaStore } from "@/lib/arenaStore";
import { Card, CardContent } from "@/components/ui/card";
import ArenaFeedActions from "@/components/arena/ArenaFeedActions";
import FeedList from "@/components/arena/FeedList";

export default function ArenaFeed() {
  const snap = useArenaState();

  return (
    <Card className="bg-theme-card border-theme-border shadow-md">
      <CardContent className="p-3 sm:p-5 md:p-6">
        <div className="flex justify-between items-center gap-4 mb-4 md:mb-6">
          <h3 className="text-xs md:text-sm font-black tracking-widest uppercase text-text-secondary flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Arena Feed
          </h3>

          <ArenaFeedActions
            canUndo={snap.history.length > 0}
            canRedo={snap.future.length > 0}
            onUndo={() => arenaStore.undo()}
            onRedo={() => arenaStore.redo()}
          />
        </div>

        <div className="space-y-4 max-h-[25vh] overflow-y-auto pr-2">
          <FeedList
            activity={snap.activity}
            players={snap.players}
            teams={snap.teams}
          />
        </div>
      </CardContent>
    </Card>
  );
}
