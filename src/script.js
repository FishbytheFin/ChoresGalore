import Chores from "/src/chores.js";
import Transition from "/src/transition.js";
import InputHandler from "/src/input.js";
import Mom from "/src/mom.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

//Ideas:  "window", "trash"

const choreList = ["laundry", "computer"];
let choreSelected = choreList[Math.floor(Math.random() * choreList.length)];

let lastTime = 0;
let losing = false;
//Images
const transitionImg = [document.getElementById("blackSquare"), document.getElementById("blackBall"), document.getElementById("blackTri")];
const choreImg = {
  wallpaper: document.getElementById("wallpaper"),
  computer: document.getElementById("computer"),
  computer2: document.getElementById("computer2"),
  boom: document.getElementById("boom"),
  laundry: document.getElementById("laundry")
};
const momImg = {
  wallpaper: document.getElementById("wallpaper"),
  mom0: document.getElementById("mom1"),
  mom1: document.getElementById("mom2"),
  mad0: document.getElementById("mad1"),
  mad1: document.getElementById("mad2"),
  mad2: document.getElementById("mad3"),
  talk0: document.getElementById("talk1"),
  talk1: document.getElementById("talk2"),
  talk2: document.getElementById("talk3")
}

//classes
let transition = new Transition(transitionImg, canvas.width, canvas.height);

let chores = new Chores(canvas, choreImg);
chores.choreStart(choreSelected);

let mom = new Mom(canvas.width, canvas.height, chores.score, momImg);
new InputHandler(chores);


transition.transitioning = true;
transition.imgNum = Math.floor(Math.random() * 3);

//Game Loop
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!losing) {
    chores.draw(ctx);
    chores.update(deltaTime);
  }
  else {
    mom.update(deltaTime);
    mom.draw(ctx);
  }

  if (transition.transitioning) {
    transition.update();
    transition.draw(ctx);
  }
  else {
    transition.imgNum = Math.floor(Math.random() * 2);
  }

  if (chores.choreOver) {
    transition.transitioning = true;
    transition.reverse = false;
    if (transition.frame >= 99) {
      chores.gameData.score += 100;
      choreSelected = choreList[Math.floor(Math.random() * choreList.length)];
      chores.choreStart(choreSelected);
      chores.choreOver = false;
    }
  }

  if (chores.choreLost) {
    if (chores.gameData.boomSize > 900 && choreSelected == "computer") {
      chores.frame = 0;
      mom.score = chores.gameData.score;
      losing = true;
    }
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

