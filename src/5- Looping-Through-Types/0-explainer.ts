// do that;
// while (condition is true) {
//   do this repetitive thing;
// }

// Using JS as a functional language 🌈
// const doRepetitiveTask = (some, input) =>
//   condition === true
//     ? doRepetitiveTask(again, withSomeOtherInput) // <- recursion
//     : something;

// type DoRepetitiveTask<Some, Input> =
//   Condition extends true
//     ? DoRepetitiveTask<Again, WithSomeOtherInput>
//     : Something

// Columns contain lists of values
type Column = {
  name: string;
  values: unknown[];
};

//A table is a non-empty list of columns
type Table = [Column, ...Column[]];

// `UserTable` is a subtype of `Table`
type UserTable = [
  { name: "firstName"; values: string[] },
  { name: "age"; values: number[] },
  { name: "isAdmin"; values: boolean[] }
];

const users: UserTable = [
  { name: "firstName", values: ["Jack", "DoDo", "Peter"] },
  { name: "age", values: [25, 45, 32] },
  { name: "isAdmin", values: [true, false, false] },
];

type GetColumn<List, Name> = List extends [infer First, ...infer Rest]
  ? First extends { name: Name; values: infer Values }
    ? Values
    : GetColumn<Rest, Name>
  : undefined;

declare function getColumn<T extends Table, N extends string>(
  table: T,
  columnName: N
): GetColumn<T, N>;

type Result1 = GetColumn<UserTable, "firstName">; // string[]
type Result2 = GetColumn<UserTable, "isAdmin">; // boolean[]

const firstNames = getColumn(users, "firstName");
// We would like `firstNames` to be inferred as a `string[]`

const isAdmins = getColumn(users, "isAdmin");
// and `isAdmins` to be inferred as a `boolean[]`

declare const products: [
  { name: "productName"; values: string[] },
  { name: "price"; values: number[] },
  { name: "location"; values: [lat: number, long: number][] }
];

const locations = getColumn(products, "location");
const result2 = getColumn(products, "tadaaa");

// type SomeLoop<List /* ... other params */> =
//   // 1. Split the list:
//   List extends [infer First, ...infer Rest]
//     ? // 2. Compute something using the first element.
//       //    Maybe recurse on the `Rest`:
//       SomeLoop<Rest /* ... modified params */>
//     : // 3. Return a default type if the list is empty:
//       SomeDefault;

// return [1, 2, 3, 4]
//   .map((x) => x * x) // [1, 4, 9, 16]
//   .filter((x) => x > 5) // [9, 16]
//   .reduce((sum, x) => sum + x, 0); // 25

type Names = ToNames<[{ id: 1; name: "Alice" }, { id: 2; name: "Jack" }]>;
// => ["Alice", "Jack"]

type ToNames<List> = List extends [infer First, ...infer Rest]
  ? [GetName<First>, ...ToNames<Rest>]
  : [];

type GetName<User> = User extends { name: infer Name }
  ? Name
  : "Unknown  name!";

// type SomeMapLoop<List> =
// List extends [infer First, ...infer Rest]
//   ? [ /* ... your logic */ , ...SomeMapLoop<Rest>]
//   : [];

type Numbers = OnlyNumbers<[1, 2, "😱", 3, "IceCube"]>;
// => [1, 2, 3]

type OnlyNumbers<List> = List extends [infer First, ...infer Rest]
  ? First extends number
    ? [First, ...OnlyNumbers<Rest>]
    : OnlyNumbers<Rest>
  : [];

// type SomeFilter<List> =
// List extends [infer First, ...infer Rest]
//   ? First extends  /* ... ❓ your condition */
//     ? [First, ...SomeFilter<Rest>]
//     : SomeFilter<Rest>
//   : [];

type User6 = FromEntries<[["name", "Jack"], ["age", 22]]>;
// => { name: "Jack"; age: 22 }

type FromEntries<Entries, Acc = {}> = Entries extends [
  infer Entry,
  ...infer Rest
]
  ? FromEntries<
      Rest,
      Entry extends [infer Key, infer Value] ? Acc & { [K in Key]: Value } : Acc
    >
  : Acc;

// type SomeReduce<Tuple, Acc = /* ... 📦 initial value */> =
// Tuple extends [infer First, ...infer Rest]
// ? SomeReduce<Rest, /* ... logic */>
// : Acc;

// // FromEntries is Tail-Recursive
// type FromEntries<Tuple, Acc = {}> = ...
//   ? FromEntries<...> // <- Because we just return the recursive
//   //                       result, without modifying it.
//   : ...;
