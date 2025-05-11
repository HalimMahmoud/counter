import { useState } from "react";
import Individual from "./Individual";
import {
  Divider,
  Grid,
  Button,
  Feed,
  Item,
  Segment,
  type SemanticWIDTHS,
} from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import type { Player, Team } from "../useStore";
import Group from "./Group";

type Activity = { date: string; message: string };
export default function Switcher({
  players,
  teams,
}: {
  players: Player[];
  teams: Team[];
}) {
  const params = useParams();
  const [activity, setActivity] = useState<Activity[]>([
    { date: moment().calendar(), message: `Game has been started.` },
  ]);
  const changeActivity = (newActivity: Activity) => {
    setActivity((prevActivity) => [...prevActivity, newActivity]);
  };
  return (
    <div>
      <Button as={Link} to="/">
        Back to Home
      </Button>
      <Segment basic>
        {Number(params.mode) === 1 ? (
          <Grid doubling columns="equal">
            <Grid.Row>
              {teams.map((x) => (
                <Grid.Column key={x.id}>
                  <Item>
                    <Item.Content verticalAlign="middle">
                      <Item.Image
                        size="tiny"
                        src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                      />
                      <Group {...x} method={changeActivity} />
                    </Item.Content>
                  </Item>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        ) : (
          <Grid
            doubling={players.length !== 2}
            columns={players.length as SemanticWIDTHS}
          >
            <Grid.Row>
              {players.map((x) => (
                <Grid.Column key={x.id}>
                  <Item>
                    <Item.Content verticalAlign="middle">
                      <Item.Image
                        size="tiny"
                        src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                      />
                      <Individual {...x} method={changeActivity} />
                    </Item.Content>
                  </Item>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        )}
        <Divider vertical>VS</Divider>
      </Segment>
      <Segment textAlign="center">
        <Feed>
          {activity.length
            ? activity.map((x, i) => (
                <Feed.Event
                  date={moment().calendar()}
                  image="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                  summary={x.message}
                  key={i}
                />
              ))
            : "No activity"}
        </Feed>
      </Segment>
    </div>
  );
}
