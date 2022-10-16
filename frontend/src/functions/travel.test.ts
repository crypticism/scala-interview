import { traverseBridge } from "./travel";

test("one hiker, one bridge", () => {
  const hiker = { id: "A", speed: 10 };
  const bridge = { id: 0, length: 100, hikers: 1 };

  const info = traverseBridge(bridge, [hiker]);
  expect(info).toEqual({
    length: 100,
    count: 1,
    hikers: ["A"],
    time: 10,
  });
});

test("two hikers, one bridge", () => {
  const hiker1 = { id: "A", speed: 100 };
  const hiker2 = { id: "B", speed: 10 };
  const bridge = { id: 0, length: 100, hikers: 2 };

  const info = traverseBridge(bridge, [hiker1, hiker2]);
  expect(info).toEqual({
    length: 100,
    count: 2,
    hikers: ["A", "B"],
    time: 10,
  });
});

test("base hikers, one bridge", () => {
  const hiker1 = { id: "A", speed: 100 };
  const hiker2 = { id: "B", speed: 50 };
  const hiker3 = { id: "C", speed: 20 };
  const hiker4 = { id: "D", speed: 10 };
  const bridge = { id: 0, length: 100, hikers: 4 };

  const info = traverseBridge(bridge, [hiker1, hiker2, hiker3, hiker4]);
  expect(info).toEqual({
    length: 100,
    count: 4,
    hikers: ["A", "B", "C", "D"],
    time: 19,
  });
});
