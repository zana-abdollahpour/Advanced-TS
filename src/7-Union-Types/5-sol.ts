import { Equal, Expect } from "..";

namespace partition {
  declare function partition<Item, Narrowed extends Item>(
    //                                         👆
    //                     `Narrowed` has to be assignable to `Item`
    //                         to be usable in a type guard.
    list: Item[],
    predicate: (value: Item) => value is Narrowed
  ): [Narrowed[], Exclude<Item, Narrowed>[]];
  //      👆                        👆
  // We do not need To use        We filter the `Item`
  // `Extract` here since         type to only include members
  // `Narrowed` is already        that aren't assignable to
  // what we want.                `Narrowed`.

  const res1 = partition(
    [1, 2, "N/A", 7, "oops"],
    (x): x is number => typeof x === "number"
  );
  type test1 = Expect<Equal<typeof res1, [number[], string[]]>>;

  const res2 = partition(
    [true, false, 1, true, 0],
    (x): x is boolean => typeof x === "boolean"
  );
  type test2 = Expect<Equal<typeof res2, [boolean[], number[]]>>;

  const res3 = partition(
    ["value", "onChange", "onSubmit", "valid", "focused"],
    (x): x is `on${string}` => x.startsWith("on")
  );
  type test3 = Expect<Equal<typeof res3, [`on${string}`[], string[]]>>;
}
