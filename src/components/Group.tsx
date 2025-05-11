import { useState } from "react";
import { Header, Button, Input } from "semantic-ui-react";
import moment from "moment";
import type { Team } from "../useStore";

type GroupProps = Team & {
  method: (args: { date: string; message: string }) => void;
};

export default function Group({ score, name, method }: GroupProps) {
  const [count, setCount] = useState(score);
  const [points, setPoints] = useState(0);

  return (
    <div>
      <Header as="h1">{name}</Header>

      <Header as="h1">{count}</Header>
      <div>
        <Input
          placeholder="Points won"
          type="number"
          fluid
          value={points === 0 ? "" : points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>
      <Button
        onClick={() => {
          setCount((prevCount) => prevCount + points);
          method({
            date: moment().calendar(),
            message: `added ${points} to ${name}`,
          });
          setPoints(0);
        }}
      >
        Add
      </Button>
    </div>
  );
}
