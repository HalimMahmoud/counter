import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Button.Group
      size="large"
      style={{
        display: "flex",
        justifyContent: "center", // horizontally center
        alignItems: "center", // vertically center
        height: "100vh",
      }}
    >
      <Link to="/Players">
        <Button>Players</Button>
      </Link>

      <Button.Or />

      <Link to="/Teams">
        <Button>Teams</Button>
      </Link>
    </Button.Group>
  );
}
