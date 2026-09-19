import { describe, expect, it } from "@effect/vitest";

import { observeNetworkPath } from "./network-path";

describe("observeNetworkPath", () => {
  it("ignores a repeated interface", () => {
    expect(observeNetworkPath("WIFI", "WIFI")).toEqual({ path: "WIFI", changed: false });
  });

  it("reports a Wi-Fi to cellular handoff", () => {
    expect(observeNetworkPath("WIFI", "CELLULAR")).toEqual({ path: "CELLULAR", changed: true });
  });

  it("adopts the first known interface without reporting a handoff", () => {
    expect(observeNetworkPath(null, "CELLULAR")).toEqual({ path: "CELLULAR", changed: false });
  });

  it("clears the baseline for a disconnected or indeterminate interface", () => {
    expect(observeNetworkPath("WIFI", "UNKNOWN")).toEqual({ path: null, changed: false });
    expect(observeNetworkPath("WIFI", undefined)).toEqual({ path: null, changed: false });
  });

  it("does not report a handoff across a connectivity outage", () => {
    const lost = observeNetworkPath("WIFI", undefined);
    expect(observeNetworkPath(lost.path, "CELLULAR")).toEqual({
      path: "CELLULAR",
      changed: false,
    });
  });
});
