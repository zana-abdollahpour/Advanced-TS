/**
 * Type the HTTPHeaders object so that it has an `Authentication`
 * property that starts with `Bearer ` and ends with a JWT token.
 *
 * Note: JWT tokens contain 3 parts, separated by dots.
 *
 * 💡 You shouldn't need a conditional type.
 */

type JWTToken = `${string}.${string}.${string}`;
namespace headers {
  type HTTPHeaders = {
    Authentication: `Bearer ${JWTToken}`;
  };

  const test1: HTTPHeaders = {
    // ✅ This is a correct authentication header:
    Authentication:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiWW91J3JlIGEgbmVyZCA7KSJ9.gfB7ECp1ePeIB4Mh_3Ypci4y7jFjMH9w_BB4rZcMvQM",
  };

  const test2: HTTPHeaders = {
    //❌ Authentication should start with 'Bearer'
    // @ts-expect-error
    Authentication: "n.d.s",
  };

  const test3: HTTPHeaders = {
    //❌ Authentication should start with 'Bearer'
    // @ts-expect-error
    Authentication: "yohoo a.b.c",
  };

  const test4: HTTPHeaders = {
    //❌ token is invalid, only 1 part.
    // @ts-expect-error
    Authentication: "Bearer kdjfl",
  };

  const test5: HTTPHeaders = {
    //❌ token is invalid, only 2 parts.
    // @ts-expect-error
    Authentication: "Bearer ksdjhf.123",
  };
}
