import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Individual from "@/components/roster/Individual";
import "@testing-library/jest-dom";
import { resetTestStore } from "@/__tests__/testHelper";
import { arenaStore } from "@/lib/arenaStore";

const setup = () => {
  const mockMethod = vi.fn();
  arenaStore.scores["player-0"] = 100;
  render(
    <Individual
      id={0}
      name="Gamer 1"
      score={100}
      method={mockMethod}
      shapeIndex={0}
      onSetAvatar={vi.fn()}
      onClearAvatar={vi.fn()}
      onChangeName={vi.fn()}
      onInitializeScore={vi.fn()}
    />
  );
  const input = screen.getByPlaceholderText("Pts") as HTMLInputElement;
  const addButton = screen.getByText("+Points");
  return { mockMethod, input, addButton };
};

describe("Individual player scorecard rendering", () => {
  beforeEach(() => resetTestStore(false));

  it("renders player details and score correctly", () => {
    setup();
    // Assert name and score are in the DOM
    expect(screen.getByText("Gamer 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});

describe("Individual player scorecard mutations", () => {
  beforeEach(() => resetTestStore(false));


  it("updates points input value and increments score on Add Points click", async () => {
    const { mockMethod, input, addButton } = setup();
    expect(input).toBeInTheDocument();

    // Type 25 points into input
    fireEvent.change(input, { target: { value: "25" } });
    expect(input).toHaveValue(25);

    // Click Add Points button
    fireEvent.click(addButton);

    // The score display should now show 125
    expect(await screen.findByText("125")).toBeInTheDocument();

    // The input should be cleared back to 0
    expect(input).toHaveValue(null);

    // Assert callback was called
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0].message).toContain("Added 25 to Gamer 1");
  });

  it("handles negative scoring subtraction correctly", async () => {
    const { mockMethod, input, addButton } = setup();

    fireEvent.change(input, { target: { value: "-15" } });
    fireEvent.click(addButton);

    // The score display should now show 85
    expect(await screen.findByText("85")).toBeInTheDocument();

    // Assert callback was called with subtraction message
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0].message).toContain("Subtracted 15 from Gamer 1");
  });

  it("ignores score submission when the points input is 0", () => {
    const { mockMethod, input, addButton } = setup();

    // Explicitly set to 0 (default input state)
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(addButton);

    // Score must remain 100
    expect(screen.getByText("100")).toBeInTheDocument();

    // Callback must NOT have been called
    expect(mockMethod).not.toHaveBeenCalled();
  });
});
