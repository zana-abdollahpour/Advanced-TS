import { Equal, Expect } from "..";

namespace isYelling {
  // If the string is already in uppercase, Uppercase should be a no-op:
  type IsYelling<Str extends string> = Str extends Uppercase<Str>
    ? true
    : false;

  type res1 = IsYelling<"HELLO">;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = IsYelling<"Hello">;
  type test2 = Expect<Equal<res2, false>>;

  type res3 = IsYelling<"I am JAck">;
  type test3 = Expect<Equal<res3, false>>;

  type res4 = IsYelling<"WHOISJACKANYWAY">;
  type test4 = Expect<Equal<res4, true>>;
}
