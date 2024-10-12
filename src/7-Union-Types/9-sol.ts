import { Equal, Expect } from "..";

namespace findColumn {
  type Column = { name: string; values: unknown[] };

  declare function findColumn<
    // Infer `T` as a tuple containing columns:
    T extends [Column, ...Column[]],
    // Infer `N` as a string literal type:
    N extends string
  >(table: T, columnNames: N): Extract<T[number], { name: N }>["values"];

  declare const userTable: [
    { name: "firstName"; values: string[] },
    { name: "lastName"; values: string[] },
    { name: "age"; values: number[] }
  ];

  const res1 = findColumn(userTable, "age");
  type test1 = Expect<Equal<typeof res1, number[]>>;

  const res2 = findColumn(userTable, "firstName");
  type test2 = Expect<Equal<typeof res2, string[]>>;

  declare const colName: "firstName" | "age";
  const res3 = findColumn(userTable, colName);
  type test3 = Expect<Equal<typeof res3, string[] | number[]>>;
}
