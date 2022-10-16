import { Bridge, Hiker } from "../app/types";

export interface BridgeInfo {
  length: number;
  count: number;
  hikers: string[];
  time: number;
}

export function truncate(input: number): number {
  return Math.trunc(input * 100) / 100;
}

export function traverseBridge(bridge: Bridge, hikers: Hiker[]): BridgeInfo {
  const { length } = bridge;

  const localHikers = [...hikers];

  // Sort the hikers by speed from slowest to fastest
  localHikers.sort((a, b) => {
    if (a.speed > b.speed) return 1;
    if (a.speed < b.speed) return -1;
    return 0;
  });

  // Pop off the last hiker, as it is the fastest and traverses the bridge more than once
  const fastestHiker = localHikers.pop() as Hiker; // "as Hiker" to appease typescript that there definitely is a hiker

  const fastestTimeToCross = truncate(length / fastestHiker.speed);

  // Calculate the amount of time it takes each hiker to cross
  const timesToCross = localHikers.map((hiker) =>
    truncate(length / hiker.speed)
  );

  // The time of all the non-fastest hikers can be summed, as they will determine the speed of their crossing
  const nonFastestTime = timesToCross.reduce((sum, time) => sum + time, 0);

  // The fastest hiker has to make a return trip with the torch for each additional hiker past the first
  const fastestTime = fastestTimeToCross * Math.abs(localHikers.length - 1);

  // Adding the time for all crosses results in the total time for all hikers to cross a bridge
  const totalTime = truncate(nonFastestTime) + truncate(fastestTime);

  return {
    length,
    count: bridge.hikers,
    hikers: hikers.map((h) => h.id),
    time: totalTime,
  };
}
