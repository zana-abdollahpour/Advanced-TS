namespace debouncedFn {
  let debouncedFn: TODO;

  debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  // ✅
  debouncedFn();

  // ✅
  debouncedFn.cancel();

  // ❌ `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // ❌ can't assign a string to `debouncedFn`.
  // @ts-expect-error: ❌
  debouncedFn = "Hello";
}
