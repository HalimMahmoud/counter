import moment from "moment";
import { arenaStore } from "@/lib/arenaStore";

export function handleScoreSubmit(
  points: number,
  competitorKey: string,
  name: string,
  score: number,
  method: (args: { date: string; message: string }) => void,
  setPoints: (val: number) => void
) {
  if (points === 0 || isNaN(points)) return;
  const message =
    points > -1
      ? `Added ${points} to ${name}`
      : `Subtracted ${Math.abs(points)} from ${name}`;
  const date = moment().calendar();
  if (arenaStore.scores[competitorKey] === undefined) {
    arenaStore.scores[competitorKey] = score;
  }
  arenaStore.submitPoints(competitorKey, points, message, date);
  method({ date, message });
  setPoints(0);
}

