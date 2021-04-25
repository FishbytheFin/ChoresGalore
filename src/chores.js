export default class Chores {
  constructor(canvas, img) {
    this.canvas = canvas;

    this.currentChore = "";

    this.gameHeight = canvas.height;

    this.gameWidth = canvas.width;

    this.mouseX = 300;
    this.mouseY = 300;

    this.deltaTime = 0;
    this.frame = 0;

    this.choreOver = false;
    this.choreLost = false;

    this.typeSound = new Audio("/assets/sound/type.wav");
    this.boomSound = new Audio("/assets/sound/boom.wav");
    this.img = img;


    this.gameData = {
      time: 0,
      score: 0,
      pin: "",
      pinPlace: 0,
      boomSize: 0
    };

    this.choreText = {
      computer: "Put in your pin...",
      laundry: "Start the laundry..."
    };
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
  draw(ctx) {

    if (this.currentChore == "computer") {
      ctx.drawImage(this.img.wallpaper, 0, 0, this.gameWidth, this.gameHeight);
      if (!this.choreLost) {
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
      else {
        ctx.drawImage(this.img.computer2, 0, 0, this.gameWidth, this.gameHeight);


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

        ctx.drawImage(this.img.boom, (this.gameWidth / 2) - (this.gameData.boomSize / 2), (this.gameWidth / 2) - (this.gameData.boomSize / 2) - 300, this.gameData.boomSize, this.gameData.boomSize);
        this.frame++;
      }
    }
    else if (this.currentChore == "laundry") {
      ctx.drawImage(this.img.wallpaper, 0, 0, this.gameWidth, this.gameHeight);
      ctx.drawImage(this.img.laundry, 0, 0, this.gameWidth, this.gameHeight);
    }
    ctx.fillStyle = "black";
    ctx.font = "25px fontdiner swanky";
    ctx.fillText(this.choreText[this.currentChore], 5, 600);
    ctx.fillText("Score: "+this.gameData.score.toString(), 100, 30)
  }

  update(deltaTime) {
    this.deltaTime = deltaTime;
    if (this.currentChore == "computer") {
      if (this.gameData.pinPlace == 4) {
        this.choreOver = true;
      }
      if (this.choreLost) {
        this.gameData.boomSize = 20 + (this.frame * this.deltaTime);
      }
    }
  }

  getKey(keycode) {
    if (!this.choreOver) {
      if (!this.choreLost) {
        if (this.currentChore == "computer") {
          if (keycode - 48 >= 0 && keycode - 48 <= 9) {
            if ([...this.gameData.pin][this.gameData.pinPlace] == keycode - 48) {
              this.typeSound.play();
              this.gameData.pinPlace++;
            }
            else {
              this.choreLost = true;
              this.boomSound.play();
            }
          }
          else if (keycode - 96 >= 0 && keycode - 96 <= 9) {
            if ([...this.gameData.pin][this.gameData.pinPlace] == keycode - 96) {
              this.typeSound.play();
              this.gameData.pinPlace++;
            }
            else {
              this.choreLost = true;
              this.boomSound.play();
            }
          }
        }
      }
    }
  }

  stopKey(keyCode) {
    //alert("Keyup: " + keyCode);
    return;
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

    
    if (!this.choreOver) {
      if (!this.choreLost) {
        if (this.currentChore == "laundry") {
          if (this.clamp(this.mouseX, 0, this.gameWidth) >= 210 && this.clamp(this.mouseX, 0, this.gameWidth) <= 310){
            if (this.clamp(this.mouseY, 0, this.gameHeight) >= 405 && this.clamp(this.mouseY, 0, this.gameHeight) <= 505){
              this.choreOver = true;
            }
          }
        }
        else {
          alert("Mouse Position: x: " + this.clamp(this.mouseX, 0, this.gameWidth) + " y: " + this.clamp(this.mouseY, 0, this.gameHeight));
        }
      }
    }


  }

  choreStart(chore) {
    this.currentChore = chore;
    this.frame = 0;
    if (chore == "computer") {
      this.gameData.pin = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
      this.gameData.pinPlace = 0;
    }
  }
  retry() {
    return;
  }

}