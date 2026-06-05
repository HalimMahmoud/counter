import { describe, it, expect } from "vitest";
import { handleScoreSubmit } from "@/lib/scoreUtils";

describe("scoreUtils", () => {
  it("should be defined", () => {
    expect(handleScoreSubmit).toBeDefined();
  });
});
