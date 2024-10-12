namespace move {
  function move(direction: "backward" | "forward") {}

  // ✅
  move("backward");

  // ✅
  move("forward");

  // ❌
  move("left");

  // ❌
  move("right");
}
