export default class Chores {
  constructor(canvas, img) {
    this.canvas = canvas;

    this.currentChore = "";

    this.gameHeight = canvas.height;

    this.gameWidth = canvas.width;

    this.mouseX = 300;
    this.mouseY = 300;

    this.choreOver = false;


    this.typeSound = new Audio("/assets/sound/type.wav");
    this.img = img;

    this.gameData = {
      time: 0,
      pin: "",
      pinPlace: 0
    };
  }

  draw(ctx) {

    if (this.currentChore == "computer") {
      ctx.drawImage(this.img.wallpaper, 0, 0, this.gameWidth, this.gameHeight);
      ctx.drawImage(this.img.computer, 0, 0, this.gameWidth, this.gameHeight);


      ctx.fillStyle = "black";
      ctx.font = "30px fontdiner swanky";
      ctx.fillText("*".repeat(this.gameData.pinPlace), 475, 300);

      ctx.save();
      ctx.translate(850, 175);
      ctx.rotate(-30 * Math.PI / 180);
      ctx.font = "30px fontdiner swanky";
      ctx.fillText("Pin:", 10, -45);
      ctx.fillText(this.gameData.pin, 0, 0);
      ctx.restore();
    }
  }

  update(deltaTime) {
    if (this.currentChore == "computer") {
      if (this.gameData.pinPlace == 4) {
        this.choreOver = true;
      }
    }
  }

  getKey(keycode) {
    if (this.currentChore == "computer") {
      if (keycode - 48 >= 0 && keycode - 48 <= 9) {
        if ([...this.gameData.pin][this.gameData.pinPlace] == keycode - 48) {
          this.typeSound.play();
          this.gameData.pinPlace++;
        }
      }
      else if (keycode - 96 >= 0 && keycode - 96 <= 9) {
        if ([...this.gameData.pin][this.gameData.pinPlace] == keycode - 96) {
          this.typeSound.play();
          this.gameData.pinPlace++;
        }
      }
    }
  }

  stopKey(keyCode) {
    //alert("Keyup: " + keyCode);
    return;
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

  choreStart(chore) {
    this.currentChore = chore;
    if (chore == "computer") {
      this.gameData.pin = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
      this.gameData.pinPlace = 0;
    }
  }


}