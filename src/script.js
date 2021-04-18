import Chores from "/src/chores.js";
import Transition from "/src/transition.js";
import InputHandler from "/src/input.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const choreList = ["laundry", "window", "trash", "computer"];
let choreSelected = choreList[3];

let lastTime = 0;

//Images
let transitionImg = [document.getElementById("blackSquare"), document.getElementById("blackBall"), document.getElementById("blackTri")];
let choreImg = {
  wallpaper: document.getElementById("wallpaper"),
  computer: document.getElementById("computer")
};

//classes
let transition = new Transition(transitionImg, canvas.width, canvas.height);

let chores = new Chores(canvas, choreImg);
chores.choreStart(choreSelected);

new InputHandler(chores);


transition.transitioning = true;
transition.imgNum = Math.floor(Math.random() * 3);

//Game Loop
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  chores.draw(ctx);
  chores.update(deltaTime);

  if (transition.transitioning) {
    transition.update();
    transition.draw(ctx);
  }
  else {
    transition.imgNum = Math.floor(Math.random() * 2);
  }

  if (chores.choreOver) {
    ctx.font = "75px fontdiner swanky";
    ctx.fillStyle = "green";
    ctx.fillText("A winner is you!", 250, canvas.height / 2);
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

