import Chores from "/src/chores.js";
import Transition from "/src/transition.js";
import InputHandler from "/src/input.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const choreList = ["laundry", "window", "trash", "computer"];
let choreSelected = "";

let chores = new Chores(canvas.width, canvas.height);

new InputHandler(chores);

let lastTime = 0;

//Images
let transitionImg = [document.getElementById("blackBall"), document.getElementById("blackTri"), document.getElementById("blackSquare")];

let transition = new Transition(transitionImg, canvas.width, canvas.height);


//Game Loop
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  transition.update();
  transition.draw(ctx);


  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

