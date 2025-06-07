import { Equal, Expect } from "..";

namespace optionalId {
  /**           This is called a type constraint.
   *            We'll learn more about it.
   *                         👇                      */
  type MakeIdOptional<Obj extends { id: unknown }> = Omit<Obj, "id"> &
    Partial<Pick<Obj, "id">>;

  type res1 = MakeIdOptional<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { id?: number } & { name: string; age: unknown }>
  >;

  type res2 = MakeIdOptional<{
    id: string;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { id?: string } & { title: string; content: string }>
  >;
}
