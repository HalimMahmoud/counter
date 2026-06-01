import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Individual from "../components/Individual";
import "@testing-library/jest-dom";
import { arenaStore } from "../lib/arenaStore";

describe("Individual player scorecard component", () => {
  beforeEach(() => {
    localStorage.clear();
    for (const key in arenaStore.scores) {
      delete arenaStore.scores[key];
    }
    arenaStore.activity.length = 0;
    arenaStore.history.length = 0;
    arenaStore.future.length = 0;
  });
  it("renders player details and score correctly", () => {
    const mockMethod = vi.fn();
    render(
      <Individual
        id={0}
        name="Gamer 1"
        score={100}
        method={mockMethod}
        shapeIndex={0}
      />
    );

    // Assert name and score are in the DOM
    expect(screen.getByText("Gamer 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("updates points input value and increments score on Add Points click", () => {
    const mockMethod = vi.fn();
    render(
      <Individual
        id={0}
        name="Gamer 1"
        score={100}
        method={mockMethod}
        shapeIndex={0}
      />
    );

    const input = screen.getByPlaceholderText("Points");
    expect(input).toBeInTheDocument();

    // Type 25 points into input
    fireEvent.change(input, { target: { value: "25" } });
    expect(input).toHaveValue(25);

    // Click Add Points button
    const addButton = screen.getByText("Add Points");
    fireEvent.click(addButton);

    // The score display should now show 125
    expect(screen.getByText("125")).toBeInTheDocument();

    // The input should be cleared back to 0
    expect(input).toHaveValue(null);

    // Assert callback was called
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0].message).toContain("Added 25 to Gamer 1");
  });

  it("handles negative scoring subtraction correctly", () => {
    const mockMethod = vi.fn();
    render(
      <Individual
        id={0}
        name="Gamer 1"
        score={100}
        method={mockMethod}
        shapeIndex={0}
      />
    );

    const input = screen.getByPlaceholderText("Points");
    fireEvent.change(input, { target: { value: "-15" } });

    const addButton = screen.getByText("Add Points");
    fireEvent.click(addButton);

    // The score display should now show 85
    expect(screen.getByText("85")).toBeInTheDocument();

    // Assert callback was called with subtraction message
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0].message).toContain("Subtracted 15 from Gamer 1");
  });

  it("ignores score submission when the points input is 0", () => {
    const mockMethod = vi.fn();
    render(
      <Individual
        id={0}
        name="Gamer 1"
        score={100}
        method={mockMethod}
        shapeIndex={0}
      />
    );

    const input = screen.getByPlaceholderText("Points");
    // Explicitly set to 0 (default input state)
    fireEvent.change(input, { target: { value: "0" } });

    const addButton = screen.getByText("Add Points");
    fireEvent.click(addButton);

    // Score must remain 100
    expect(screen.getByText("100")).toBeInTheDocument();

    // Callback must NOT have been called
    expect(mockMethod).not.toHaveBeenCalled();
  });
});
