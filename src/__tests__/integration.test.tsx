import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom";
import { resetTestStore } from "./testHelper";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

function confirmSetup() {
  const confirmButton = screen.getByText("Confirm").closest("a");
  expect(confirmButton).toBeInTheDocument();
  if (confirmButton) {
    fireEvent.click(confirmButton);
  }
}

function verifyHomeState() {
  expect(screen.getByText("GAME COUNTER")).toBeInTheDocument();
  expect(screen.getByText("PLAYERS MODE")).toBeInTheDocument();
  expect(screen.getByText("TEAMS MODE")).toBeInTheDocument();
}

function clickPlayersMode() {
  const playersModeCard = screen.getByText("PLAYERS MODE").closest("a");
  expect(playersModeCard).toBeInTheDocument();
  if (playersModeCard) {
    fireEvent.click(playersModeCard);
  }
}

async function verifyAndEditPlayers() {
  expect(screen.getByRole("heading", { name: "Players" })).toBeInTheDocument();
  const inputs = screen.getAllByPlaceholderText("Name") as HTMLInputElement[];
  expect(inputs).toHaveLength(2);
  expect(inputs[0].value).toBe("Player 1");
  expect(inputs[1].value).toBe("Player 2");

  fireEvent.change(inputs[0], { target: { value: "Challenger A" } });
  expect(inputs[0].value).toBe("Challenger A");

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  let inputsAfterAdding!: HTMLInputElement[];
  await waitFor(() => {
    inputsAfterAdding = screen.getAllByPlaceholderText("Name") as HTMLInputElement[];
    expect(inputsAfterAdding).toHaveLength(3);
  });
  expect(inputsAfterAdding[2].value).toBe("Alpha");
}

function clickTeamsMode() {
  const teamsModeCard = screen.getByText("TEAMS MODE").closest("a");
  expect(teamsModeCard).toBeInTheDocument();
  if (teamsModeCard) {
    fireEvent.click(teamsModeCard);
  }
}

function verifyAndEditTeams() {
  expect(screen.getByRole("heading", { name: "Teams" })).toBeInTheDocument();
  const inputs = screen.getAllByPlaceholderText("Name") as HTMLInputElement[];
  expect(inputs).toHaveLength(2);
  expect(inputs[0].value).toBe("Team 1");
  expect(inputs[1].value).toBe("Team 2");

  fireEvent.change(inputs[1], { target: { value: "United Alliance" } });
  expect(inputs[1].value).toBe("United Alliance");
}

async function testScoreArenaActivity() {
  const pointInputs = screen.getAllByPlaceholderText("Pts") as HTMLInputElement[];
  expect(pointInputs).toHaveLength(3);

  fireEvent.change(pointInputs[0], { target: { value: "15" } });
  const addPointsButtons = screen.getAllByText("+Points");
  fireEvent.click(addPointsButtons[0]);

  expect(await screen.findByText("15")).toBeInTheDocument();
  expect(await screen.findByText("Added 15 to Challenger A")).toBeInTheDocument();

  fireEvent.change(pointInputs[0], { target: { value: "-5" } });
  fireEvent.click(addPointsButtons[0]);

  expect(await screen.findByText("10")).toBeInTheDocument();
  expect(await screen.findByText("Subtracted 5 from Challenger A")).toBeInTheDocument();
}

async function testTeamsArenaActivity() {
  const pointInputs = screen.getAllByPlaceholderText("Pts") as HTMLInputElement[];
  expect(pointInputs).toHaveLength(2);

  fireEvent.change(pointInputs[1], { target: { value: "80" } });
  const addButtons = screen.getAllByText("+Points");
  fireEvent.click(addButtons[1]);

  expect(await screen.findByText("80")).toBeInTheDocument();
  expect(await screen.findByText("Added 80 to United Alliance")).toBeInTheDocument();

  fireEvent.change(pointInputs[1], { target: { value: "-30" } });
  fireEvent.click(addButtons[1]);

  expect(await screen.findByText("50")).toBeInTheDocument();
  expect(await screen.findByText("Subtracted 30 from United Alliance")).toBeInTheDocument();
}

async function testResetModalFlow() {
  const resetOpenButton = screen.getByText("Reset");
  expect(resetOpenButton).toBeInTheDocument();
  fireEvent.click(resetOpenButton);

  expect(screen.getByText("RESET SESSION?")).toBeInTheDocument();
  expect(screen.getByText(/ARE YOU SURE YOU WANT TO CLEAR ALL/i)).toBeInTheDocument();

  const noButton = screen.getByText("NO");
  fireEvent.click(noButton);

  expect(screen.queryByText("RESET SESSION?")).not.toBeInTheDocument();
  expect(screen.getByText("50")).toBeInTheDocument();

  fireEvent.click(resetOpenButton);
  const yesButton = screen.getByText("YES");
  fireEvent.click(yesButton);

  expect(screen.queryByText("RESET SESSION?")).not.toBeInTheDocument();
  const zeroScores = screen.getAllByText("0");
  expect(zeroScores).toHaveLength(2);

  expect(await screen.findByText("Arena scores have been reset.")).toBeInTheDocument();
}

async function testPlayersArenaFlow() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  verifyHomeState();
  clickPlayersMode();
  await verifyAndEditPlayers();
  confirmSetup();

  expect(screen.getByText("Player Arena")).toBeInTheDocument();
  expect(screen.getByText("Challenger A")).toBeInTheDocument();
  expect(screen.getByText("Player 2")).toBeInTheDocument();
  expect(screen.getByText("Alpha")).toBeInTheDocument();

  await testScoreArenaActivity();
}

async function testTeamsArenaFlow() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  clickTeamsMode();
  verifyAndEditTeams();
  confirmSetup();

  expect(screen.getByText("Team Arena")).toBeInTheDocument();
  expect(screen.getByText("Team 1")).toBeInTheDocument();
  expect(await screen.findByText("United Alliance")).toBeInTheDocument();

  await testTeamsArenaActivity();
  await testResetModalFlow();
}

function testThemeToggle() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const toggleButton = screen.getByTitle(/Switch to/i);
  expect(toggleButton).toBeInTheDocument();

  const root = document.documentElement;
  const isInitiallyDark = root.classList.contains("dark");

  fireEvent.click(toggleButton);

  if (isInitiallyDark) {
    expect(root.classList.contains("light")).toBe(true);
    expect(root.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  } else {
    expect(root.classList.contains("dark")).toBe(true);
    expect(root.classList.contains("light")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("dark");
  }

  fireEvent.click(toggleButton);
  expect(root.classList.contains(isInitiallyDark ? "dark" : "light")).toBe(true);
}

async function testUndoRedoFlow() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const playersModeCard = screen.getByText("PLAYERS MODE").closest("a");
  if (playersModeCard) {
    fireEvent.click(playersModeCard);
  }

  const confirmButton = screen.getByText("Confirm").closest("a");
  if (confirmButton) {
    fireEvent.click(confirmButton);
  }

  expect(screen.getByText("Player Arena")).toBeInTheDocument();

  const pointInputs = screen.getAllByPlaceholderText("Pts") as HTMLInputElement[];
  fireEvent.change(pointInputs[0], { target: { value: "30" } });
  
  const addPointsButtons = screen.getAllByText("+Points");
  fireEvent.click(addPointsButtons[0]);

  expect(await screen.findByText("30")).toBeInTheDocument();
  expect(await screen.findByText("Added 30 to Player 1")).toBeInTheDocument();

  const undoButton = screen.getByText("Undo");
  const redoButton = screen.getByText("Redo");
  expect(undoButton).not.toBeDisabled();
  expect(redoButton).toBeDisabled();

  fireEvent.click(undoButton);
  expect(await screen.findByText("0")).toBeInTheDocument();
  expect(screen.queryByText("Added 30 to Player 1")).not.toBeInTheDocument();

  expect(undoButton).toBeDisabled();
  expect(redoButton).not.toBeDisabled();

  fireEvent.click(redoButton);
  expect(await screen.findByText("30")).toBeInTheDocument();
  expect(await screen.findByText("Added 30 to Player 1")).toBeInTheDocument();

  expect(undoButton).not.toBeDisabled();
  expect(redoButton).toBeDisabled();
}

describe("Games Counter Integration Flow Tests", () => {
  beforeEach(() => resetTestStore(true));

  it("navigates from Home to Players Configuration, edits players, and loads Score Arena", testPlayersArenaFlow);

  it("navigates from Home to Teams Configuration, edits teams, and loads Teams Arena", testTeamsArenaFlow);

  it("handles the Dark/Light Mode Theme Toggle controller perfectly", testThemeToggle);

  it("performs Undo and Redo operations correctly in the Score Arena", testUndoRedoFlow);
});
