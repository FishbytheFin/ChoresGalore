export default class Chores {
  constructor(canvas) {
    this.canvas = canvas;


    this.gameHeight = canvas.height;

    this.gameWidth = canvas.width;

    this.mouseX = 300;
    this.mouseY = 300;
  }

  draw(ctx) {
    return;
  }

  update(deltaTime) {
    return;
  }

  getKey(keycode) {
    alert("Keydown: " + keycode);
  }

  stopKey(keyCode) {
    alert("Keyup: " + keycode);
  }
  clamp(n, min, max) {
    if (n > max) {
      return max;
    } else if (n < min) {
      return min
    } else {
      return n;
    }
  }
  getMouse(event, browser) {
    if (browser == "f" || browser == "m") {
      this.mouseX = event.clientX - this.canvas.offsetLeft + document.documentElement.scrollLeft + this.gameWidth / 2;
      this.mouseY = event.clientY - this.canvas.offsetTop + document.documentElement.scrollTop + this.gameHeight / 2;
    }
    else {
      this.mouseX = event.clientX - this.canvas.offsetLeft + document.body.scrollLeft + this.gameWidth / 2;
      this.mouseY = event.clientY - this.canvas.offsetTop + document.body.scrollTop + this.gameHeight / 2;
    }
    alert("Mouse Position: x: " + this.clamp(this.mouseX, 0, this.gameWidth) + " y: " + this.clamp(this.mouseY, 0, this.gameHeight));
  }


}