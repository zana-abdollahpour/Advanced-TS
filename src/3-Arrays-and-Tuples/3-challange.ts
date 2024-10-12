import { Equal, Expect } from "..";

namespace concat {
  type Concat<Tuple1 extends any[], Tuple2 extends any[]> = TODO;

  type res1 = Concat<[1, 2, 3], [4, 5]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4, 5]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}
