import { Equal, Expect } from "..";

namespace lengthPlusOne {
  type LengthPlusOne<Tuple extends any[]> = [...Tuple, unknown]["length"];

  type res1 = LengthPlusOne<[]>;
  type test1 = Expect<Equal<res1, 1>>;

  type res2 = LengthPlusOne<[any]>;
  type test2 = Expect<Equal<res2, 2>>;

  type res3 = LengthPlusOne<[any, any]>;
  type test3 = Expect<Equal<res3, 3>>;

  type res4 = LengthPlusOne<[any, any, any]>;
  type test4 = Expect<Equal<res4, 4>>;
}
