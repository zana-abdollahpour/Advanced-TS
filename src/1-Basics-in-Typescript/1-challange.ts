import { Equal, Expect } from "..";

namespace pickOne {
  function pickOne(a: TODO, b: TODO): TODO {
    return Math.random() > 0.5 ? a : b;
  }

  const res1 = pickOne(true, false);
  type test1 = Expect<Equal<typeof res1, boolean>>;

  const res2 = pickOne(1, 2);
  type test2 = Expect<Equal<typeof res2, 1 | 2>>;

  const res3 = pickOne(2, "some string");
  type test3 = Expect<Equal<typeof res3, 2 | "some string">>;

  const res4 = pickOne(true, 7);
  type test4 = Expect<Equal<typeof res4, true | 7>>;
}
