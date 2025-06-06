namespace move {
  function move(direction: "backward" | "forward") {
    // some code
  }

  // ✅
  move("backward");

  // ✅
  move("forward");

  // @ts-expect-error: ❌ not supported
  move("left");

  // @ts-expect-error: ❌ not supported
  move("right");
}
