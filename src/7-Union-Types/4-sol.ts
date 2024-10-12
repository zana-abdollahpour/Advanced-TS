import { Equal, Expect } from "..";

namespace compact {
  type Falsy = false | null | 0 | undefined | "";

  declare function compact<Item>(list: Item[]): Exclude<Item, Falsy>[];
  //                 👆
  // We can use `Exclude` to remove falsy values
  // From our union type.

  let res1 = compact([1, 2, null, 3, undefined, 4]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  let res2 = compact([undefined, 0 as const, "a", "", "b", "c", "d"]);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  let res3 = compact([...([1, undefined, true, "", "hello", null] as const)]);
  type test3 = Expect<Equal<typeof res3, (1 | true | "hello")[]>>;
}
