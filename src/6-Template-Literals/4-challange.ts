/**
 * Write a type function that transforms
 * snake_case strings into camelCase.
 */

import { Equal, Expect } from "..";

namespace snakeToCamel {
  type SnakeToCamel<Str> = TODO;

  // it should let strings with no underscore in them unchanged
  type res1 = SnakeToCamel<"hello">;
  type test1 = Expect<Equal<res1, "hello">>;

  // one underscore
  type res2 = SnakeToCamel<"hello_world">;
  type test2 = Expect<Equal<res2, "helloWorld">>;

  // many underscores
  type res3 = SnakeToCamel<"hello_code_licks_academy">;
  type test3 = Expect<Equal<res3, "helloCodeLicksAcademy">>;
}
