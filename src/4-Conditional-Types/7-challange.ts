import { Equal, Expect } from "..";

namespace last {
  type Last<Tuple extends any[]> = Tuple extends [...unknown[], infer Last]
    ? Last
    : never;

  type res1 = Last<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, 3>>;

  type res2 = Last<[1]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Last<[]>;
  type test3 = Expect<Equal<res3, never>>;
}
