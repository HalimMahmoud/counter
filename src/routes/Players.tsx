import { Link } from "react-router-dom";
import { useArenaState } from "@/lib/useArenaState";
import { arenaStore } from "@/lib/arenaStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RosterHeader from "@/components/roster/RosterHeader";
import PlayerItem from "@/components/roster/PlayerItem";

export default function Players() {
  const snap = useArenaState();
  const players = snap.players;

  return (
    <Card className="w-full max-w-2xl lg:max-w-3xl mx-auto my-2 md:my-4 bg-theme-card border-theme-border shadow-md">
      <CardContent className="p-3 sm:p-5 md:p-6 lg:p-8">
        {/* Header navigation bar */}
        <RosterHeader
          title="Players"
          onAdd={() => arenaStore.addPlayer()}
          disableAdd={players.length >= 4}
        />

        {/* Competitors setup panel */}
        <div className="space-y-2 mb-4 max-h-[45vh] overflow-y-auto pr-0.5">
          {players.map(({ id, name, avatar }, index) => (
            <PlayerItem
              key={id}
              id={id}
              name={name}
              avatar={avatar}
              index={index}
              disableDelete={players.length === 2}
              onSetAvatar={(uid, data) => arenaStore.setAvatar("player", uid, data)}
              onClearAvatar={(uid) => arenaStore.setAvatar("player", uid, "")}
              onChangeName={(uid, val) => arenaStore.changeName("player", uid, val)}
              onRemovePlayer={(uid) => arenaStore.removePlayer(uid)}
            />
          ))}
        </div>

        {/* OK / Confirm Setup */}
        <div className="flex justify-end pt-3 md:pt-4 border-t border-theme-border">
          <Link to={`/mode/${players.length}`}>
            <Button variant="psBlue" size="sm" className="h-7 md:h-9 px-3 md:px-5 text-[10px] md:text-xs">
              Confirm
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
