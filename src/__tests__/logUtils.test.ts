import { describe, it, expect } from "vitest";
import { getCompetitorName, formatScoreLog, getLogMessage } from "@/lib/logUtils";

describe("logUtils", () => {
  it("should be defined and return correct messages", () => {
    expect(getCompetitorName).toBeDefined();
    expect(formatScoreLog).toBeDefined();
    expect(getLogMessage).toBeDefined();

    // Direct invocation to satisfy runtime coverage logic if needed
    expect(formatScoreLog("Player 1", 5)).toBe("Added 5 to Player 1");
    expect(formatScoreLog("Player 1", -3)).toBe("Subtracted 3 from Player 1");
  });
});
