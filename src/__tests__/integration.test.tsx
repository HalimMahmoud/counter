import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import "@testing-library/jest-dom";
import { arenaStore } from "../lib/arenaStore";

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

describe("Games Counter Integration Flow Tests", () => {
  beforeEach(() => {
    localStorage.clear(); // prevent persisted state from bleeding into tests

    // Reset arena session state
    for (const key in arenaStore.scores) delete arenaStore.scores[key];
    arenaStore.activity.length = 0;
    arenaStore.history.length  = 0;
    arenaStore.future.length   = 0;

    // Reset lobby to defaults so tests don't bleed into each other
    arenaStore.players.length = 0;
    arenaStore.players.push(
      { name: "Player 1", id: 0, score: 0 },
      { name: "Player 2", id: 1, score: 0 }
    );
    arenaStore.teams.length = 0;
    arenaStore.teams.push(
      { name: "Team 1", id: 0, score: 0 },
      { name: "Team 2", id: 1, score: 0 }
    );
  });
  it("navigates from Home to Players Configuration, edits players, and loads Score Arena", async () => {
    // Render the App with starting path as "/"
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // 1. Verify Home Page Elements
    expect(screen.getByText("GAME COUNTER")).toBeInTheDocument();
    expect(screen.getByText("PLAYERS MODE")).toBeInTheDocument();
    expect(screen.getByText("TEAMS MODE")).toBeInTheDocument();

    // 2. Simulate clicking "PLAYERS MODE" link
    const playersModeCard = screen.getByText("PLAYERS MODE").closest("a");
    expect(playersModeCard).toBeInTheDocument();
    if (playersModeCard) {
      fireEvent.click(playersModeCard);
    }

    // 3. Verify Players Configuration Screen
    expect(screen.getByText("Players Configuration")).toBeInTheDocument();

    // Verify initial inputs (default 2 players: "Player 1" and "Player 2")
    const inputs = screen.getAllByPlaceholderText("Player Name") as HTMLInputElement[];
    expect(inputs).toHaveLength(2);
    expect(inputs[0].value).toBe("Player 1");
    expect(inputs[1].value).toBe("Player 2");

    // Edit Player 1 name
    fireEvent.change(inputs[0], { target: { value: "Challenger A" } });
    expect(inputs[0].value).toBe("Challenger A");

    // Add Player slot (up to max 4)
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Verify a 3rd player was added (Valtio re-renders are async — wait for the new input)
    let inputsAfterAdding!: HTMLInputElement[];
    await waitFor(() => {
      inputsAfterAdding = screen.getAllByPlaceholderText("Player Name") as HTMLInputElement[];
      expect(inputsAfterAdding).toHaveLength(3);
    });
    expect(inputsAfterAdding[2].value).toBe("Player 3");

    // Simulate clicking "Confirm Controllers" to enter the Score Arena
    const confirmButton = screen.getByText("Confirm Controllers").closest("a");
    expect(confirmButton).toBeInTheDocument();
    if (confirmButton) {
      fireEvent.click(confirmButton);
    }

    // 4. Verify Arena Dashboard loaded
    expect(screen.getByText("Player Arena Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Challenger A")).toBeInTheDocument();
    expect(screen.getByText("Player 2")).toBeInTheDocument();
    expect(screen.getByText("Player 3")).toBeInTheDocument();

    // 5. Test Live feed score increment logic
    const pointInputs = screen.getAllByPlaceholderText("Points") as HTMLInputElement[];
    expect(pointInputs).toHaveLength(3);

    // Input 15 points for Challenger A
    fireEvent.change(pointInputs[0], { target: { value: "15" } });
    const addPointsButtons = screen.getAllByText("Add Points");
    fireEvent.click(addPointsButtons[0]);

    // Check that score updated on display (starts at 0, goes to 15)
    expect(await screen.findByText("15")).toBeInTheDocument();

    // Check if the System Arena Feed has a timeline log
    expect(await screen.findByText("Added 15 to Challenger A")).toBeInTheDocument();

    // Input negative subtraction points for Challenger A
    fireEvent.change(pointInputs[0], { target: { value: "-5" } });
    fireEvent.click(addPointsButtons[0]);

    // Score should be 15 - 5 = 10
    expect(await screen.findByText("10")).toBeInTheDocument();

    // Check if the System Arena Feed log represents subtraction correctly
    expect(await screen.findByText("Subtracted 5 from Challenger A")).toBeInTheDocument();
  });

  it("navigates from Home to Teams Configuration, edits teams, and loads Teams Arena", async () => {
    // Render App with starting path "/"
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Simulate clicking "TEAMS MODE" Link
    const teamsModeCard = screen.getByText("TEAMS MODE").closest("a");
    expect(teamsModeCard).toBeInTheDocument();
    if (teamsModeCard) {
      fireEvent.click(teamsModeCard);
    }

    // Verify Teams Configuration screen loaded
    expect(screen.getByText("Teams Configuration")).toBeInTheDocument();

    // Verify default teams (default 2 teams: "Team 1" and "Team 2")
    const inputs = screen.getAllByPlaceholderText("Team Name") as HTMLInputElement[];
    expect(inputs).toHaveLength(2);
    expect(inputs[0].value).toBe("Team 1");
    expect(inputs[1].value).toBe("Team 2");

    // Edit Team 2 Name
    fireEvent.change(inputs[1], { target: { value: "United Alliance" } });
    expect(inputs[1].value).toBe("United Alliance");

    // Confirm setup to launch Score Arena
    const confirmButton = screen.getByText("Confirm Arena").closest("a");
    expect(confirmButton).toBeInTheDocument();
    if (confirmButton) {
      fireEvent.click(confirmButton);
    }

    // Verify Teams Dashboard
    expect(screen.getByText("Team Arena Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Team 1")).toBeInTheDocument();
    expect(await screen.findByText("United Alliance")).toBeInTheDocument();

    // Verify scoreboard adding/subtracting logic in Team Arena
    const pointInputs = screen.getAllByPlaceholderText("Points") as HTMLInputElement[];
    expect(pointInputs).toHaveLength(2);

    // Add 80 points to United Alliance
    fireEvent.change(pointInputs[1], { target: { value: "80" } });
    const addButtons = screen.getAllByText("Add Points");
    fireEvent.click(addButtons[1]);

    // Validate Score
    expect(await screen.findByText("80")).toBeInTheDocument();
    expect(await screen.findByText("Added 80 to United Alliance")).toBeInTheDocument();

    // Subtract 30 points (negative input) and check if Subtracted message is properly logged in Team Mode (harmonized bugfix)
    fireEvent.change(pointInputs[1], { target: { value: "-30" } });
    fireEvent.click(addButtons[1]);

    expect(await screen.findByText("50")).toBeInTheDocument();
    expect(await screen.findByText("Subtracted 30 from United Alliance")).toBeInTheDocument();

    // 6. Test Reset session button and Yes/No modal
    const resetOpenButton = screen.getByText("Reset");
    expect(resetOpenButton).toBeInTheDocument();
    fireEvent.click(resetOpenButton);

    // Verify modal elements loaded
    expect(screen.getByText("RESET SESSION?")).toBeInTheDocument();
    expect(screen.getByText(/ARE YOU SURE YOU WANT TO CLEAR ALL/i)).toBeInTheDocument();

    // Click "NO" to cancel
    const noButton = screen.getByText("NO");
    fireEvent.click(noButton);

    // Modal should disappear, score should remain 50
    expect(screen.queryByText("RESET SESSION?")).not.toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    // Click "Reset" again and confirm with "YES"
    fireEvent.click(resetOpenButton);
    const yesButton = screen.getByText("YES");
    fireEvent.click(yesButton);

    // Modal disappears, score display must reset to 0 for both teams
    expect(screen.queryByText("RESET SESSION?")).not.toBeInTheDocument();
    const zeroScores = screen.getAllByText("0");
    expect(zeroScores).toHaveLength(2);

    // Timeline logs are cleared and log reset entry is present
    expect(await screen.findByText("Arena scores have been reset.")).toBeInTheDocument();
  });

  it("handles the Dark/Light Mode Theme Toggle controller perfectly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const toggleButton = screen.getByTitle(/Switch to/i);
    expect(toggleButton).toBeInTheDocument();

    // Check documentElement class before clicking (default is dark in test setup or depends on storage)
    const root = document.documentElement;
    const isInitiallyDark = root.classList.contains("dark");

    // Click toggle button
    fireEvent.click(toggleButton);

    // The theme class should have flipped
    if (isInitiallyDark) {
      expect(root.classList.contains("light")).toBe(true);
      expect(root.classList.contains("dark")).toBe(false);
      expect(localStorage.getItem("theme")).toBe("light");
    } else {
      expect(root.classList.contains("dark")).toBe(true);
      expect(root.classList.contains("light")).toBe(false);
      expect(localStorage.getItem("theme")).toBe("dark");
    }

    // Toggle back
    fireEvent.click(toggleButton);
    expect(root.classList.contains(isInitiallyDark ? "dark" : "light")).toBe(true);
  });

  it("performs Undo and Redo operations correctly in the Score Arena", async () => {
    // 1. Render App starting at Home
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // 2. Navigate to Players Configuration
    const playersModeCard = screen.getByText("PLAYERS MODE").closest("a");
    if (playersModeCard) {
      fireEvent.click(playersModeCard);
    }

    // 3. Confirm to enter Score Arena
    const confirmButton = screen.getByText("Confirm Controllers").closest("a");
    if (confirmButton) {
      fireEvent.click(confirmButton);
    }

    // Verify Player Arena Dashboard is loaded
    expect(screen.getByText("Player Arena Dashboard")).toBeInTheDocument();

    // 4. Submit 30 points to Player 1
    const pointInputs = screen.getAllByPlaceholderText("Points") as HTMLInputElement[];
    fireEvent.change(pointInputs[0], { target: { value: "30" } });
    
    const addPointsButtons = screen.getAllByText("Add Points");
    fireEvent.click(addPointsButtons[0]);

    // Check that score updated to 30 and timeline log has updated
    expect(await screen.findByText("30")).toBeInTheDocument();
    expect(await screen.findByText("Added 30 to Player 1")).toBeInTheDocument();

    // 5. Verify Undo button is enabled, Redo button is disabled
    const undoButton = screen.getByText("Undo");
    const redoButton = screen.getByText("Redo");
    expect(undoButton).not.toBeDisabled();
    expect(redoButton).toBeDisabled();

    // 6. Click Undo and verify score reverts to 0, log is cleared
    fireEvent.click(undoButton);
    expect(await screen.findByText("0")).toBeInTheDocument();
    expect(screen.queryByText("Added 30 to Player 1")).not.toBeInTheDocument();

    // Now Undo is disabled, Redo is enabled
    expect(undoButton).toBeDisabled();
    expect(redoButton).not.toBeDisabled();

    // 7. Click Redo and verify score goes back to 30, log is restored
    fireEvent.click(redoButton);
    expect(await screen.findByText("30")).toBeInTheDocument();
    expect(await screen.findByText("Added 30 to Player 1")).toBeInTheDocument();

    // Undo is enabled again, Redo is disabled again
    expect(undoButton).not.toBeDisabled();
    expect(redoButton).toBeDisabled();
  });
});
