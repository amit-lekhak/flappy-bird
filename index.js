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

  requestAnimationFrame(update);
};

const update = () => {
  requestAnimationFrame(update);

  // clear canvas on each frame
  context.clearRect(0, 0, boardWidth, boardHeight);

  // redraw bird on canvas
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
};
