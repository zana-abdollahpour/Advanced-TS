namespace stringify {
  const stringify = (input: unknown) => {
    return input instanceof Symbol ? input.toString() : `${input}`;
  };

  stringify("a string"); // ✅
  stringify(12); // ✅
  stringify(true); // ✅
  stringify(Symbol("dog")); // ✅
}
