import { Equal, Expect } from "..";

namespace allValues {
  type AllValues<T extends object> = T extends unknown ? T[keyof T] : never;

  type res1 = AllValues<{ a: "value a" }>;
  type test1 = Expect<Equal<res1, "value a">>;

  type res2 = AllValues<{ a: "value a" } | { b: "value b" }>;
  type test2 = Expect<Equal<res2, "value a" | "value b">>;

  type res3 = AllValues<{ a: string; b: number } | { b: boolean; c: bigint }>;
  type test3 = Expect<Equal<res3, string | number | boolean | bigint>>;
}
