import { useState } from "react";
import { Button, Input, Item, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import type { DataPlayers, Player } from "../useStore";

export interface IPlayerComponent {
  name: string;
  id: number;
  method: (id: number, name: string) => void;
}

export function Player({ name, id, method }: IPlayerComponent) {
  const [playerName, setPlayerName] = useState(name);

  return (
    <Input
      placeholder="Player Name"
      value={playerName}
      onChange={(e) => {
        setPlayerName(e.target.value);
        method(id, e.target.value);
      }}
    />
  );
}

export default function Players({
  players,
  addPlayer,
  removePlayer,
  changePlayer,
}: DataPlayers) {
  return (
    <Container>
      <Button as={Link} to="/">
        Back to Home
      </Button>

      <Button onClick={() => addPlayer()}>Add</Button>

      <Item.Group as={Container} text relaxed divided>
        {players.map(({ id, name }: Player) => (
          <Item key={id}>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />

            <Item.Content verticalAlign="middle">
              <Player name={name} id={id} method={changePlayer} />

              <Button
                floated="right"
                onClick={() => removePlayer(id)}
                disabled={players.length === 2}
              >
                Remove
              </Button>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>

      <Button primary as={Link} to={`/mode/${players.length}`}>
        OK
      </Button>
    </Container>
  );
}
