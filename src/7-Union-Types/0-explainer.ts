type DataState =
  | { status: "loading" }
  | { status: "success"; data: number }
  | { status: "error"; error: Error };

let state: DataState = {
  status: "success",
  error: new Error("Wohoooo"),
};

type UsersType = { name: string; age: number };
type Value = UsersType["name" | "age"];
// => string | number

type Size = "sm" | "md" | "lg";
type ClassName = `button-${Size}`;
// => "button-sm" | "button-md" | "button-lg"

const config = { env: "dev", port: 3000 };

const c1 = config["env"];
//later...
const c2 = config["port"];

function logConfig(prop: "env" | "port") {
  const value = config[prop];
  console.log(value);
}

logConfig("env");
//later
logConfig("port");

// x * (a + b) <=> (x * a) + (x * b)
// --           👆
// -- This means "Is equivalent to".

type TTT1 = `x ${"a" | "b" | "c"}`;
// <=>
type TTT2 = `x ${"a"}` | `x ${"b"}` | `x ${"c"}`;

type TTT3 = User["name" | "age"];
// <=>
type TTT4 = User["name"] | User["age"];

type StateType =
  | { status: "success"; data: number }
  | { status: "error"; error: Error };

function handler(state: StateType): string {
  if (state.status === "success") {
    // state is *narrowed*:
    state; // { status: "success", data: number }
    return "✔️";
  }

  if (state.status === "error") {
    state; // { status: "error"; error: Error }
    return "😲";
  }

  return state; // never
  /*       ^
    ✅ Even though `state` isn't a `string`,
    This line type-checks because its type
    is narrowed to `never`.
                                          */
}

// Why doesn't TS turn this type:
type StateType2 = {
  status: "success" | "error";
};
// Into this one:
type StateType3 = { status: "success" } | { status: "error" };

// type CSSProperties = {
//   color: Color;
//   display: Display;
//   position: Position;
//   ...
// }

// type Color =
// | "lightseagreen"  | "tomato"           | "chartreuse"
// | "blanchedalmond" | "mediumaquamarine" | "rebeccapurple" ...

//   type CSSProperties =
//  | { color: "lightseagreen"; display: "flex"; position: "absolute"; ... }
//  | { color: "lightseagreen"; display: "inline"; position: "absolute"; ... }
//  | ... // 12930491028475481029435820 lines later...
//  | { color: "white"; display: "flex"; position: "fixed"; ... }
//  | { color: "white"; display: "inline"; position: "fixed"; ... };

type IsString<T> = T extends string ? "yes" : "no";

type IS = IsString<"Is this a string really?">;
type IS2 = IsString<321>;
type IS3 = IsString<"a" | 2 | "b">;

type TTTT =
  | ("a" extends string ? "yes" : "no")
  | (2 extends string ? "yes" : "no")
  | ("c" extends string ? "yes" : "no");

type TTTT2 = "yes" | "no" | "yes";
// <=>
type TTTT3 = "yes" | "no";

type SnakeToCamel<Str> = Str extends `${infer First}_${infer Rest}`
  ? /*                    👆
            Split the string on underscores     
                                              */
    `${First}${SnakeToCamel<Capitalize<Rest>>}`
  : /*                            👆
       Capitalize each word before joining them.     
                                                 */
    Str;

type Test = SnakeToCamel<"hello_world">; // "helloWorld"
type Test2 = SnakeToCamel<"user_name" | "is_admin">;

// type U = "a" | "b";
// // is the type-level equivalent of:
// const u = new Set(["a", "b"]);

// type U = "a";
// // is the type-level equivalent of:
// const u = new Set(["a"]);

type U = never;
const u = new Set([]);

// type IsMiddleAged2<N> = N extends 42 ? true : false;
// //                      ^
// //              How to distribute over `never` 🤔
// //

// type Test3 = IsMiddleAged2<never>; // never

// Running a conditional type on `never`
type IsMiddleAged2<N> = N extends 42 ? true : false;
type Result = IsMiddleAged2<never>; // never

// Is similar to mapping over an empty list:
const IsMiddleAged = (list: number[]) => list.map((n) => n === 42);
const result = IsMiddleAged([]); // []

// type MapOverUnion<U> = U extends unknown
//   /*                   👆           👆
//               The expression      This condition
//              distributes here.    always passes.
//                                                         */
//   ? Transform<U>
//   /*          👆
//     `Transform` is called with every member, one by one.
//                                                          */
//   : never;

type Duplicate<T> = [T, T];
type DistributedDuplicate<U> = U extends unknown ? [U, U] : never;

type DTest1 = Duplicate<1 | 2 | 3>;
type DTest2 = DistributedDuplicate<1 | 2 | 3>;

const tuple10: DTest1 = [1, 2];
const tuple20: DTest2 = [1, 2];

// [1, 2, 3].map((x) => [x, x]);
// // => [[1, 1], [2, 2], [3, 3]]

// type AllKeys<T> = T extends unknown ? keyof T : never;
// //                    👆
// //        We distribute over `T` first!

// type AKTest = AllKeys<{ a: 1; b: 1 } | { a: 1; c: 1 }>

type AllKeys<T> = T extends unknown ? keyof T : never;
//                👆                        👆
//      This is our union type         This is each item
//      BEFORE distribution.           one by one.

type FeedItem =
  | { type: "post"; content: string }
  | { type: "likedBy"; user: string; content: string }
  | { type: "followSuggestions"; users: string[] }
  | { type: "image"; src: string }
  | { type: "video"; src: string };

declare const items: FeedItem[];

// Both `Item` and `Type` are union types!
declare function only<
  // Items should have a `type` property
  Item extends { type: string },
  // `Type` strings should be valid type properties.
  Type extends Item["type"]
>(list: Item[], types: Type[]): FilterUnion<Item, Type>[];
//                              ~~~~~~~~~~~
//                                  ^ 🤔

type FilterUnion<Item, Type> = Item extends { type: Type } ? Item : never;

type FUTest = FilterUnion<FeedItem, "image" | "video">;

const mediaItems = only(items, ["image", "video"]);
// we would like `mediaItems` to be inferred as:
//  ( | { type: "image"; src: string }
//    | { type: "video"; src: string } )[]

type TestType = FeedItem & { type: "image" | "video" };

type TestType2 =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

type FilterUnion2<U, C> = U extends C ? U : never;

type FUTest2 = FilterUnion2<FeedItem, { type: "image" | "video" }>;

type E1 = Extract<"a" | "b" | "c" | null, string>;
// => "a" | "b" | "c"

type E2 = Extract<"value" | "onChange" | "onSubmit", `on${string}`>;
// => "onChange" | "onSubmit"

type Ex1 = Exclude<"a" | "b" | "c" | null, null>;
// => "a" | "b" | "c"

type Ex2 = Exclude<"value" | "onChange" | "onSubmit", `on${string}`>;
// => "value"

// This union type is defined inline. Not distributive.❌
//             👇
type XT = string | number extends string ? true : false;
// => `false` instead of `true | false`

// This isn't a naked type variable. Not distributive.❌
//                     👇
type IsString2<T> = OrNumber<T> extends string ? true : false;
type OrNumber<T> = T | number;
type XT2 = IsString2<string>;
// => `false` instead of `true | false`

// This is a naked type variable. It distributes. ✅
//                👇
type IsString3<T> = T extends string ? true : false;
type XT3 = IsString3<string | number>;
// => true | false

type Extends<A, B> = [A] extends B ? true : false;
//                   👆
//           A is distributed here.

type ET = Extends<"a" | "b" | "c", "a" | "b">;
// => Returns `boolean` because "a" and "b" are
//    assignable to `"a" | "b"`, but "c" isn't.

// [A] --> ["a" | "b" | "c"]
