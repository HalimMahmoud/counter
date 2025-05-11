import { useState } from "react";

export type Player = {
  id: number;
  name: string;
  score: number;
};

export type Team = {
  id: number;
  name: string;
  score: number;
};

export type DataPlayers = {
  players: Player[];
  addPlayer: () => void;
  removePlayer: (id: number) => void;
  changePlayer: (id: number, name: string) => void;
};

export type DataTeams = {
  teams: Team[];
  changeTeam: (id: number, name: string) => void;
};

export default function useStore(): {
  dataPlayers: DataPlayers;
  dataTeams: DataTeams;
  players: Player[];
  teams: Team[];
} {
  const [players, setPlayers] = useState([
    { name: "Player 1", id: 0, score: 0 },
    { name: "Player 2", id: 1, score: 0 },
  ]);
  const [teams, setTeams] = useState([
    { name: "Team 1", id: 0, score: 0 },
    { name: "Team 2", id: 1, score: 0 },
  ]);
  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        {
          name: `Player ${prevPlayers.length + 1}`,
          id: prevPlayers.length + 1,
          score: 0,
        },
      ]);
    }
  };
  const changePlayer = (id: number, name: string) => {
    setPlayers((prevPlayers) =>
      [...prevPlayers.filter((x) => x.id !== id), { name, id, score: 0 }].sort(
        (a, b) => a.id - b.id
      )
    );
  };
  const removePlayer = (id: number) => {
    if (players.length > 2) {
      setPlayers((prevPlayers) => [...prevPlayers.filter((x) => x.id !== id)]);
    }
  };

  const changeTeam = (id: number, name: string) => {
    setTeams((prevTeams) =>
      [{ name, id, score: 0 }, ...prevTeams.filter((x) => x.id !== id)].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  const dataPlayers = { players, addPlayer, removePlayer, changePlayer };
  const dataTeams = { teams, changeTeam };

  return { dataPlayers, dataTeams, players, teams };
}
