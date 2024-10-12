import { Equal, Expect } from "..";

namespace keys {
  type Keys<Obj> = TODO;

  type res1 = Keys<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, "a" | "b">>;

  type res2 = Keys<{ a: number; b: string; c: unknown }>;
  type test2 = Expect<Equal<res2, "a" | "b" | "c">>;

  type res3 = Keys<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = Keys<{ [K in string]: boolean }>;
  type test4 = Expect<Equal<res4, string>>;
}
