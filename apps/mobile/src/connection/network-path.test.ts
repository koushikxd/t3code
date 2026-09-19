import { describe, expect, it } from "@effect/vitest";

import { observeNetworkPath } from "./network-path";

describe("observeNetworkPath", () => {
  it("ignores a repeated interface", () => {
    expect(observeNetworkPath("WIFI", "WIFI")).toEqual({ path: "WIFI", changed: false });
  });

  it("reports a Wi-Fi to cellular handoff", () => {
    expect(observeNetworkPath("WIFI", "CELLULAR")).toEqual({ path: "CELLULAR", changed: true });
  });

  it("reports the first known interface", () => {
    expect(observeNetworkPath(null, "CELLULAR")).toEqual({ path: "CELLULAR", changed: true });
  });

  it("clears the baseline for an indeterminate interface", () => {
    expect(observeNetworkPath("WIFI", "UNKNOWN")).toEqual({ path: null, changed: false });
    expect(observeNetworkPath("WIFI", undefined)).toEqual({ path: null, changed: false });
  });
});
