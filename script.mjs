import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

kaboom({
    background: [142, 133, 93]
});

loadSprite("ezio", "./Ezio.png");
loadSprite("knife", "./Knife.png");
loadSound("gameOver","./game over sound.mp3");

scene("game", () => {
  gravity(2200);

  //floor
  add([
    rect(width(), 100),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  //ezio
  const player = add([sprite("ezio"), pos(0, 400), scale(0.3), area(), body()]);

  function jump() {
    if (player.isGrounded()) {
      player.jump(900);
    }
  }

  onKeyPress("space", jump);
  onClick(jump);

  function spawnKnife() {
    const kinfe = add([
      sprite("knife"),
      pos(width(), 550),
      scale(0.08),
      rotate(360),
      area(),
      origin("botleft"),
      move(LEFT, 440),
      "knife",
    ]);

    wait(rand(0.9, 2.3), spawnKnife);
  }

  spawnKnife();

  player.onCollide("knife", () => {
    go("lose", score);
    play("gameOver", {
        volume: 0.2
    })
    // burp();
  });

  let score = 0;

  const scoreLabel = add([text("Your Score :" + score), pos(24, 24)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

scene("lose", (score) => {
  add([
    sprite("ezio"),
    pos(width() / 2, height() / 2 - 80),
    scale(0.3),
    origin("center"),
  ]);

  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(1.7),
    origin("center"),
  ]);

  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});

go("game");
