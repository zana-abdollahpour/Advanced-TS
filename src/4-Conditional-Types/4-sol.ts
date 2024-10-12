import { Equal, Expect } from "..";

namespace getName {
  type GetName<Input> = Input extends { name: infer Name } ? Name : undefined;

  type res1 = GetName<{ name: "Jack" }>;
  type test1 = Expect<Equal<res1, "Jack">>;

  type res2 = GetName<{ name: string; age: number }>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = GetName<{ age: number }>;
  type test3 = Expect<Equal<res3, undefined>>;

  type res4 = GetName<{
    name: { firstName: string; lastName: string };
    age: number;
  }>;
  type test4 = Expect<Equal<res4, { firstName: string; lastName: string }>>;
}
