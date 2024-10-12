import { Equal, Expect } from "..";

namespace dropFirst {
  type DropFirst<Tuple extends any[]> = Tuple extends [any, ...infer Rest]
    ? Rest
    : [];

  type res1 = DropFirst<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, [2, 3]>>;

  type res2 = DropFirst<[1]>;
  type test2 = Expect<Equal<res2, []>>;

  type res3 = DropFirst<[]>;
  type test3 = Expect<Equal<res3, []>>;
}
