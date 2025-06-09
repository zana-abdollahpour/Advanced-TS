import { Equal, Expect } from "..";

namespace getColor {
  type LogStatus = "error" | "warning" | "info";
  interface Colors {
    error: "red";
    warning: "orange";
    info: "blue";
  }

  type GetColor<Status extends LogStatus> = Colors[Status];

  type res1 = GetColor<"error">;
  type test1 = Expect<Equal<res1, "red">>;

  type res2 = GetColor<"error" | "warning">;
  type test2 = Expect<Equal<res2, "red" | "orange">>;

  type res3 = GetColor<"warning" | "info">;
  type test3 = Expect<Equal<res3, "orange" | "blue">>;

  type res4 = GetColor<"error" | "warning" | "info">;
  type test4 = Expect<Equal<res4, "red" | "orange" | "blue">>;
}
