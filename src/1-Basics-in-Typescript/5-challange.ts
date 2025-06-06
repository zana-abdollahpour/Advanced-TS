namespace Exhaustive {
  function exhaustive(...args: never[]) {}

  const HOURS_PER_DAY = 24;
  // Since `HOURS_PER_DAY` is a `const`, the next
  // condition should never happen
  // ✅
  if (HOURS_PER_DAY !== 24) exhaustive(HOURS_PER_DAY);

  // Outside of the condition, this should
  // return a type error.
  // @ts-expect-error ❌
  exhaustive(HOURS_PER_DAY);

  const exhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return "!";
      case 2:
        return "!!";
      // Since all cases are handled, the default
      // branch is unreachable.
      // ✅
      default:
        exhaustive(input);
    }
  };

  const nonExhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return "!";

      // the case where input === 2 isn't handled,
      // so `exhaustive` shouldn't be called.
      default:
        // @ts-expect-error ❌
        exhaustive(input);
    }
  };
}
