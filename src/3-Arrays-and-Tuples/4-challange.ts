import { Equal, Expect } from "..";

namespace tupleToArray {
  type TupleToArray<Tuple extends any[]> = TODO;

  type res1 = TupleToArray<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, (1 | 2 | 3)[]>>;

  type res2 = TupleToArray<[number, string]>;
  type test2 = Expect<Equal<res2, (number | string)[]>>;

  type res3 = TupleToArray<[]>;
  type test3 = Expect<Equal<res3, never[]>>;

  type res4 = TupleToArray<[1] | [2] | [3]>;
  type test4 = Expect<Equal<res4, (1 | 2 | 3)[]>>;
}
