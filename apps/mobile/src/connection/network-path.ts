import type { NetworkStateType } from "expo-network";

/** The string value of a `NetworkStateType`, so the rule below is enum-free. */
export type NetworkPath = `${NetworkStateType}`;

export interface ObservedNetworkPath {
  readonly path: NetworkPath | null;
  readonly changed: boolean;
}

/**
 * Decides whether a network state event is a real interface handoff, given the
 * last known interface.
 */
export function observeNetworkPath(
  previous: NetworkPath | null,
  next: NetworkPath | undefined,
): ObservedNetworkPath {
  // An unreported or indeterminate interface says nothing about the route, so
  // clear the baseline instead of probing. A WIFI -> UNKNOWN -> WIFI blip then
  // costs one probe on the way back rather than two.
  if (next === undefined || next === "UNKNOWN") {
    return { path: null, changed: false };
  }
  // The first known interface probes too: the listener only fires on change,
  // so that first event may itself be the handoff.
  return { path: next, changed: next !== previous };
}
