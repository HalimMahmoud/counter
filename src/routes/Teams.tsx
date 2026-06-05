import { Link } from "react-router-dom";
import { useArenaState } from "../lib/useArenaState";
import { arenaStore } from "../lib/arenaStore";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import RosterHeader from "../components/roster/RosterHeader";
import TeamItem from "../components/roster/TeamItem";

export default function Teams() {
  const snap = useArenaState();
  const teams = snap.teams;

  return (
    <Card className="w-full max-w-2xl lg:max-w-3xl mx-auto my-2 md:my-4 bg-theme-card border-theme-border shadow-md">
      <CardContent className="p-3 sm:p-5 md:p-6 lg:p-8">
        {/* Header navigation bar */}
        <RosterHeader title="Teams" />

        {/* Teams List */}
        <div className="space-y-2 mb-4">
          {teams.map(({ id, name, avatar }, index) => (
            <TeamItem
              key={id}
              id={id}
              name={name}
              avatar={avatar}
              index={index}
              onSetAvatar={(uid, data) => arenaStore.setAvatar("team", uid, data)}
              onClearAvatar={(uid) => arenaStore.setAvatar("team", uid, "")}
              onChangeName={(uid, val) => arenaStore.changeName("team", uid, val)}
            />
          ))}
        </div>

        {/* OK / Confirm Setup */}
        <div className="flex justify-end pt-3 md:pt-4 border-t border-theme-border">
          <Link to="/mode/1">
            <Button variant="psBlue" size="sm" className="h-7 md:h-9 px-3 md:px-5 text-[10px] md:text-xs">
              Confirm
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
