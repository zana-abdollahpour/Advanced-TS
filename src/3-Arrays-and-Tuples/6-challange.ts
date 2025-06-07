import { Equal, Expect } from "..";

namespace length {
  type Length<Tuple extends any[]> = Tuple["length"];

  type res1 = Length<[]>;
  type test1 = Expect<Equal<res1, 0>>;

  type res2 = Length<[any]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Length<[any, any]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = Length<[any, any, any]>;
  type test4 = Expect<Equal<res4, 3>>;
}
