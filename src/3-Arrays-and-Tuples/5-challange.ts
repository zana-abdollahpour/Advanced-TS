namespace nonEmptyArray {
  type NonEmptyArray<T> = TODO;

  function sendMail(addresses: NonEmptyArray<string>) {
    /* ... */
  }

  sendMail(["543 4th Ave"]); // ✅
  sendMail(["34 vedi AStreenName", "568822 London"]); // ✅
  // @ts-expect-error
  sendMail([]);
  //       ^ ❌ `[]` isn't assignable to `NonEmptyArray<string>`
}
