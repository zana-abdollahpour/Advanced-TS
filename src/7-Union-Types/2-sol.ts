import { Equal, Expect } from "..";

namespace allValues {
  type AllValues<T> = T extends object ? T[keyof T] : never;
  //                  👆
  //        We start by distributing T, and the access
  //        all of it's property with `T[keyof T]`.

  type res1 = AllValues<{ a: "value a" }>;
  type test1 = Expect<Equal<res1, "value a">>;

  type res2 = AllValues<{ a: "value a" } | { b: "value b" }>;
  type test2 = Expect<Equal<res2, "value a" | "value b">>;

  type res3 = AllValues<{ a: string; b: number } | { b: boolean; c: bigint }>;
  type test3 = Expect<Equal<res3, string | number | boolean | bigint>>;
}
