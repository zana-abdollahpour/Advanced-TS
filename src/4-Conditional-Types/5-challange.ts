import { Equal, Expect } from "..";

namespace unwrapPromise {
  type UnwrapPromise<Input> = Input extends Promise<infer T>
    ? T
    : "NOT A PROMISE";

  type res1 = UnwrapPromise<Promise<"Hello">>;
  type test1 = Expect<Equal<res1, "Hello">>;

  type res2 = UnwrapPromise<Promise<{ name: string; age: number }>>;
  type test2 = Expect<Equal<res2, { name: string; age: number }>>;

  type res3 = UnwrapPromise<"NOT A PROMISE">;
  type test3 = Expect<Equal<res3, "NOT A PROMISE">>;
}
