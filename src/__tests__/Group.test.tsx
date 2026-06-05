import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Group from "../components/roster/Group";
import "@testing-library/jest-dom";
import { resetTestStore } from "./testHelper";
import { arenaStore } from "../lib/arenaStore";

describe("Group team scorecard component", () => {
  beforeEach(() => resetTestStore(false));

  const setupGroup = (initialScore = 500) => {
    const mockLog = vi.fn();
    arenaStore.scores["team-0"] = initialScore;
    const view = render(
      <Group
        id={0}
        name="Team Alpha"
        score={initialScore}
        method={mockLog}
        shapeIndex={1}
        onSetAvatar={vi.fn()}
        onClearAvatar={vi.fn()}
        onChangeName={vi.fn()}
        onInitializeScore={vi.fn()}
      />
    );
    const input = view.container.querySelector('input[placeholder="Pts"]') as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: /\+Points/i });
    return { mockMethod: mockLog, input, addButton };
  };

  it("renders team name and initial score correctly", () => {
    setupGroup();
    // Assert name and score are in the DOM
    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("updates points input value and increments score on Add Points click", async () => {
    const { mockMethod: groupMockMethod, input: groupInput, addButton: groupAddButton } = setupGroup();
    expect(groupInput).toBeInTheDocument();

    // Type 75 points into input
    fireEvent.change(groupInput, { target: { value: "75" } });
    expect(groupInput).toHaveValue(75);

    // Click Add Points button
    fireEvent.click(groupAddButton);

    // The score display should now show 575
    expect(await screen.findByText("575")).toBeInTheDocument();

    // Assert callback was called
    expect(groupMockMethod).toHaveBeenCalledTimes(1);
    expect(groupMockMethod.mock.calls[0][0].message).toContain("Added 75 to Team Alpha");
  });
});
