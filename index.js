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

  setInterval(placePipes, 1500);

  requestAnimationFrame(update);
};

const update = () => {
  requestAnimationFrame(update);

  // clear canvas on each frame
  context.clearRect(0, 0, boardWidth, boardHeight);

  // redraw bird on canvas
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  // draw pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];

    pipe.x += velocityX;
    context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);
  }
};

const placePipes = () => {
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
