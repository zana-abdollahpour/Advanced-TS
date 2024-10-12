namespace headers {
  type HTTPHeaders = {
    Authentication: `Bearer ${string}.${string}.${string}`;
  };

  const test1: HTTPHeaders = {
    // ✅ This is a correct authentication header:
    Authentication:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiWW91J3JlIGEgbmVyZCA7KSJ9.gfB7ECp1ePeIB4Mh_3Ypci4y7jFjMH9w_BB4rZcMvQM",
  };

  const test2: HTTPHeaders = {
    //❌ Authentication should start with 'Bearer'
    Authentication: "n.d.s",
  };

  const test3: HTTPHeaders = {
    //❌ Authentication should start with 'Bearer'
    Authentication: "yohoo a.b.c",
  };

  const test4: HTTPHeaders = {
    //❌ token is invalid, only 1 part.
    Authentication: "Bearer kdjfl",
  };

  const test5: HTTPHeaders = {
    //❌ token is invalid, only 2 parts.
    Authentication: "Bearer ksdjhf.123",
  };
}
