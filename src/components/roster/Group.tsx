import type { Team, CompetitorActionProps } from "@/lib/types";
import CompetitorCard from "@/components/roster/CompetitorCard";

type GroupProps = Team & CompetitorActionProps;

export default function Group(props: GroupProps) {
  return <CompetitorCard type="team" {...props} />;
}

