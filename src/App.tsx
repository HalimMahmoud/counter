import { Route, Routes } from "react-router-dom";
import useStore from "./useStore";
import { Segment } from "semantic-ui-react";
import Home from "./routes/Home";
import Players from "./routes/Players";
import Teams from "./routes/Teams";
import Switcher from "./components/Switcher";

function App() {
  const { dataPlayers, dataTeams, players, teams } = useStore();

  return (
    <Segment basic textAlign="center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Players" element={<Players {...dataPlayers} />} />
        <Route path="/Teams" element={<Teams {...dataTeams} />} />
        <Route
          path="/mode/:mode"
          element={<Switcher players={players} teams={teams} />}
        />
      </Routes>
    </Segment>
  );
}

export default App;
