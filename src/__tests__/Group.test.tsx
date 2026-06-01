import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Group from "../components/Group";
import "@testing-library/jest-dom";
import { arenaStore } from "../lib/arenaStore";

describe("Group team scorecard component", () => {
  beforeEach(() => {
    localStorage.clear();
    for (const key in arenaStore.scores) {
      delete arenaStore.scores[key];
    }
    arenaStore.activity.length = 0;
    arenaStore.history.length = 0;
    arenaStore.future.length = 0;
  });
  it("renders team name and initial score correctly", () => {
    const mockMethod = vi.fn();
    render(
      <Group
        id={0}
        name="Team Alpha"
        score={500}
        method={mockMethod}
        shapeIndex={1}
      />
    );

    // Assert name and score are in the DOM
    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("updates points input value and increments score on Add Points click", () => {
    const mockMethod = vi.fn();
    render(
      <Group
        id={0}
        name="Team Alpha"
        score={500}
        method={mockMethod}
        shapeIndex={1}
      />
    );

    const input = screen.getByPlaceholderText("Points");
    expect(input).toBeInTheDocument();

    // Type 75 points into input
    fireEvent.change(input, { target: { value: "75" } });
    expect(input).toHaveValue(75);

    // Click Add Points button
    const addButton = screen.getByText("Add Points");
    fireEvent.click(addButton);

    // The score display should now show 575
    expect(screen.getByText("575")).toBeInTheDocument();

    // Assert callback was called
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0].message).toContain("Added 75 to Team Alpha");
  });
});
