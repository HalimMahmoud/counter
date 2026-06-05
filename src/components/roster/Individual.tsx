import type { Player, CompetitorActionProps } from "../../lib/types";
import CompetitorCard from "./CompetitorCard";

type IndividualProps = Player & CompetitorActionProps;

export default function Individual(props: IndividualProps) {
  return <CompetitorCard type="player" {...props} />;
}

