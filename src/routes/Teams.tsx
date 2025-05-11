import { useState } from "react";
import { Button, Input, Item, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import type { DataTeams, Team } from "../useStore";

export interface ITeamComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
}
export function Team({ name, id, method }: ITeamComponent) {
  const [TeamName, setTeamName] = useState(name);

  return (
    <Input
      placeholder="Team Name"
      value={TeamName}
      onChange={(e) => {
        setTeamName(e.target.value);
        method(id, e.target.value);
      }}
    />
  );
}

export default function Teams({ teams, changeTeam }: DataTeams) {
  return (
    <Container>
      <Button as={Link} to="/">
        Back to Home
      </Button>
      <Item.Group as={Container} text relaxed divided>
        {teams.map(({ id, name }: Team) => (
          <Item key={id}>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />

            <Item.Content verticalAlign="middle">
              <Team name={name} id={id} method={changeTeam} />
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <Button primary as={Link} to="/mode/1">
        OK
      </Button>
    </Container>
  );
}
