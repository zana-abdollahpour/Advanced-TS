import { Equal, Expect } from "..";

namespace append {
  type Append<Tuple extends any[], Element> = TODO;

  type res1 = Append<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Append<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}
