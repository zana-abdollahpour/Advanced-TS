*/
namespace nonEmptyArray {
 type NonEmptyArray<T> = [T, ...T[]];

 function sendMail(addresses: NonEmptyArray<string>) {
   /* ... */
 }

 sendMail(["123 5th Ave"]); // ✅
 sendMail(["75 rue Quincampoix", "75003 Paris"]); // ✅
 // @ts-expect-error
 sendMail([]);
 //       ^ ❌ `[]` isn't assignable to `NonEmptyArray<string>`
}