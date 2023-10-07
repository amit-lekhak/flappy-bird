// board
let board, context;
const boardWidth = 360;
const boardHeight = 640;

// bird
const birdWidth = 34;
const birdHeight = 24;
const birdX = boardWidth / 8;
const birdY = boardHeight / 2;
let birdImage;

const bird = {
  width: birdWidth,
  height: birdHeight,
  x: birdX,
  y: birdY,
};

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;

let pipeX = boardWidth;
let pipeY = 0;

let topPipeImage, bottomPipeImage;

// physics
const velocityX = -2;
let velocityY = 0;
const gravity = 0.4;

let score = 0;
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");

  board.width = boardWidth;
  board.height = boardHeight;

  context = board.getContext("2d");

  // draw bird on canvas
  birdImage = new Image();
  birdImage.src = "public/images/flappybird.png";

  birdImage.onload = function () {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  };

  // draw pipes on canvas
  topPipeImage = new Image();
  topPipeImage.src = "public/images/topPipe.png";

  bottomPipeImage = new Image();
  bottomPipeImage.src = "public/images/bottomPipe.png";

  requestAnimationFrame(update);

  setInterval(placePipes, 1500);

  document.addEventListener("keydown", moveBird);
};

const update = () => {
  requestAnimationFrame(update);
  if (gameOver) return;

  // clear canvas on each frame
  context.clearRect(0, 0, boardWidth, boardHeight);

  velocityY += gravity;

  bird.y = Math.max(bird.y + velocityY, 0);

  // redraw bird on canvas
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > boardHeight) {
    gameOver = true;
  }

  // draw pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];

    pipe.x += velocityX;
    context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  // clear pipes
  while (pipeArray[0] && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // add score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("Game Over", 5, 90);
  }
};

const moveBird = (event) => {
  if (event.code == "Space" || event.code == "ArrowDown") {
    velocityY = -6;

    if (gameOver) {
      pipeArray = [];
      bird.y = birdY;
      score = 0;
      gameOver = false;
    }
  }
};

const placePipes = () => {
  if (gameOver) return;

  const randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  const openingSpace = board.height / 4;

  const topPipe = {
    image: topPipeImage,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe);

  const bottomPipe = {
    image: bottomPipeImage,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(bottomPipe);
};

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); //a's bottom left corner passes b's top left corner
}
