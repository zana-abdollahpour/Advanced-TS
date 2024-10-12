import { Equal, Expect } from "..";

namespace valueof {
  type ValueOf<Obj> = TODO;

  type res1 = ValueOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<{ a: number; b: string; c: boolean }>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<{ [K in string]: boolean }>;
  type test4 = Expect<Equal<res4, boolean>>;
}
