import { describe, it, expect } from "vitest";
import { useTheme } from "@/lib/useTheme";

describe("useTheme", () => {
  it("should be defined", () => {
    expect(useTheme).toBeDefined();
  });
});
