import { Equal, Expect } from "..";

/**
 * ❕❕❕ This is *not* a recursive flatten!
 * Only one level of nesting should be removed.
 */
namespace heterogeneousFlatten {
  type Flatten<Arr extends unknown[]> = Arr extends (infer Item)[]
    ? UnwrapArray<Item>[]
    : never;

  type UnwrapArray<T> = T extends (infer Item)[] ? Item : T;

  declare function flatten<A extends any[]>(arr: A): Flatten<A>;

  let res1 = flatten([1, 2, [3, 4]]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  // if the array is already flat, leave it unchanged
  let res2 = flatten(["a", "b", "c", "d"]);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  // This should work when the types of values are different.
  let res3 = flatten(["a", "b", [3, 4]]);
  type test3 = Expect<Equal<typeof res3, (number | string)[]>>;

  // This should work when the types of values are different.
  let res4 = flatten(["a", ["b"], [3, [4, 5]]]);
  type test4 = Expect<Equal<typeof res4, (number | string | number[])[]>>;
}
