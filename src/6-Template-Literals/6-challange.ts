import { Equal, Expect } from "..";

/**
 * Type the "get" function to infer its return type
 * from the object's type and the "path" string.
 */
namespace smartGet {
  declare function get<T, S extends string>(obj: T, path: S): GetFromPath<T, S>;

  type GetFromPath<Obj, Path> = RecursiveGet<Obj, ParsePath<Path>>;

  type ParsePath<
    Path,
    Properties extends string[] = [],
    CurrentProp extends string = ""
  > = Path extends `${infer First}${infer Rest}`
    ? First extends "." | "[" | "]"
      ? ParsePath<
          Rest,
          [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])]
        >
      : ParsePath<Rest, Properties, `${CurrentProp}${First}`>
    : [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])];

  type RecursiveGet<Obj, Properties> = Properties extends [
    infer First,
    ...infer Rest
  ]
    ? First extends keyof Obj
      ? RecursiveGet<Obj[First], Rest>
      : [First, Obj] extends [`${number}`, any[]]
      ? RecursiveGet<As<Obj, any[]>[number], Rest>
      : undefined
    : Obj;

  type As<A, B> = A extends B ? A : never;

  // several object keys
  declare const obj1: { a: { b: { c: string } } };
  const res1 = get(obj1, "a.b.c");
  type test1 = Expect<Equal<typeof res1, string>>;

  // objects and arrays
  declare const obj2: { author: { friends: [{ age: 29 }] } };
  const res2 = get(obj2, "author.friends[0].age");
  type test2 = Expect<Equal<typeof res2, 29>>;

  // accessing a precise index of a tuple type
  declare const obj3: { author: { friends: [undefined, { name: "Bob" }] } };
  const res3 = get(obj3, "author.friends[1].name");
  type test3 = Expect<Equal<typeof res3, "Bob">>;

  // several tuple types
  declare const obj4: [1, 2, [3, [{ title: "🎉" }]]];
  const res4 = get(obj4, "[2][1][0].title");
  type test4 = Expect<Equal<typeof res4, "🎉">>;
}
