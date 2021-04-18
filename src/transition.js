export default class Transition {
  constructor(img, gameWidth, gameHeight) {
    this.imgs = img;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.frame = 0;
    this.imgNum = 2;
    this.size = 20 * this.frame;

    this.reverse = false;
    this.transitioning = false;
  }
  draw(ctx) {
    this.size = (20 + (10 * this.imgNum)) * this.frame;

    ctx.drawImage(this.imgs[this.imgNum], (this.gameWidth / 2) - (this.size / 2), (this.gameHeight / 2) - (this.size / 2), this.size, this.size);
  }
  update() {
    if (this.frame < 100 && !this.reverse) {
      this.frame++;
    }
    else {
      this.reverse = true;
      this.frame--;
    }
    if (this.frame <= 0) {
      this.transitioning = false;
    }

  }
}