import { Equal, Expect } from "..";

/**
 * Write a `WithIndex` type function
 * that takes a tuple, and maps it to a tuple
 * of [value, index] pairs.
 *
 * Hint: you will need to use T["length"]
 * to generate indices
 */
namespace withIndex {
  type WithIndex<
    Tuple extends any[],
    Output extends any[] = []
  > = Tuple extends [infer First, ...infer Rest]
    ? WithIndex<Rest, [...Output, [First, Output["length"]]]>
    : Output;

  type res1 = WithIndex<["a"]>;
  type test1 = Expect<Equal<res1, [["a", 0]]>>;

  type res2 = WithIndex<["a", "b"]>;
  type test2 = Expect<Equal<res2, [["a", 0], ["b", 1]]>>;

  type res3 = WithIndex<["a", "b", "c"]>;
  type test3 = Expect<Equal<res3, [["a", 0], ["b", 1], ["c", 2]]>>;
}
