export default class Chores {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;

    this.gameWidth = gameWidth;

    this.mouseX = 300;
    this.mouseY = 300;
  }

  draw(ctx) {
    return;
  }

  getKey(keycode) {
    alert("Keydown: " + keycode);
  }

  stopKey(keyCode) {
    alert("Keyup: " + keycode);
  }

  getMouse(event) {
    //if (browser == "f" || browser == "m") {
    //this.mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
    //this.mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
    //}
    //else 
    //{
    this.mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
    this.mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
    //}
    alert("Mouse Position: x: " + this.mouseX + " y: " + this.mouseY);
  }

}