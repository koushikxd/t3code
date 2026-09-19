import type { NetworkStateType } from "expo-network";

/** The string value of a `NetworkStateType`, so the rule below is enum-free. */
export type NetworkPath = `${NetworkStateType}`;

export interface ObservedNetworkPath {
  readonly path: NetworkPath | null;
  readonly changed: boolean;
}

/**
 * Decides whether a network state event is a real interface handoff, given the
 * last known interface. Pass `undefined` for a disconnected or indeterminate
 * state.
 */
export function observeNetworkPath(
  previous: NetworkPath | null,
  next: NetworkPath | undefined,
): ObservedNetworkPath {
  if (next === undefined || next === "UNKNOWN") {
    return { path: null, changed: false };
  }
  // With no baseline there is nothing to hand off from: either this is the
  // first event of the process, or connectivity just returned and the
  // supervisor is already reconnecting on this interface.
  if (previous === null) {
    return { path: next, changed: false };
  }
  return { path: next, changed: next !== previous };
}
