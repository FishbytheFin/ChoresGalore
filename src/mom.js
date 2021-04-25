export default class Mom {
  constructor(gameWidth, gameHeight, score, img) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;

    this.score = score;

    this.img = img;

    this.time = 0;

    this.frames = {
      hands: 0,
      mad: 1,
      talk: 0
    };
  }
  update(deltaTime) {
    this.time += deltaTime;
    if (this.time >= 300) {
      if (this.frames.hands < 1) {
        this.frames.hands++;
      }
      else {
        this.frames.hands--;
      }

      if (this.frames.mad < 2) {
        this.frames.mad++;
      }
      else {
        this.frames.mad-=2;
      }

      if (this.frames.talk < 2) {
        this.frames.talk++;
      }
      else {
        this.frames.talk-=2;
      }
      this.time = 0;
    }
  }
  draw(ctx) {
    ctx.drawImage(this.img.wallpaper, 0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.img["mom" + this.frames.hands], 0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.img["mad" + this.frames.mad], 0, 0, this.gameWidth, this.gameHeight);
    ctx.drawImage(this.img["talk" + this.frames.talk], 0, 0, this.gameWidth, this.gameHeight);

    ctx.font = "60px fontdiner swanky";
    ctx.fillText("Mom isn't happy...", 550, 200);
    ctx.fillText("Score: " + this.score, 600, 250);
    ctx.fillStyle = "green";
    ctx.fillRect(600, 300, 300, 100);
    ctx.fillStyle = "white";
    ctx.fillText("Retry?", 650, 370);
  }
}