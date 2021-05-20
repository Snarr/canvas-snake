let keys = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
}

let pause = false;
let gameover = false;
let direction = 0;
let lastDirection = 0;
let unitSize = 20;
let windowSize = 40;

// Stores all information for our snake
let snake = {
  speedX: unitSize,
  speedY: 0,
  x: unitSize*2,
  y: unitSize,
  body: []
}

let apple = {
  x: unitSize*5,
  y: unitSize*5,
}

window.addEventListener('keydown',this.keyDown,false);

setInterval(() => {

  if (pause) {
    return
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Black screen for gameover
  if (gameover) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, windowSize*unitSize, windowSize*unitSize);
    pause = true;
    return;
  }

  // Create background
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, windowSize*unitSize, windowSize*unitSize);

  // List score
  ctx.font = '48px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${snake.body.length}`, (windowSize+1)*unitSize, 50);

  // Edge detection
  if (snake.x < 0) { snake.x = (windowSize-1)*unitSize }
  if (snake.x >= windowSize*unitSize) { snake.x = 0 }
  if (snake.y < 0) { snake.y = (windowSize-1)*unitSize }
  if (snake.y >= windowSize*unitSize) { snake.y = 0 }

  // Render snake
  ctx.fillStyle = "black"
  ctx.fillRect(snake.x, snake.y, unitSize, unitSize)

  // Render other body parts and look for self-cannibalism
  for (var i = snake.body.length-1; i >= 0; i--) {
    let part = snake.body[i]

    if (part.x == snake.x && part.y == snake.y) {
      gameover = true;
      break;
    }

    ctx.fillStyle = "black"
    ctx.fillRect(part.x, part.y, unitSize, unitSize)

    if (i == 0) {
      part.x = snake.x;
      part.y = snake.y;
    } else {
      part.x = snake.body[i-1].x;
      part.y = snake.body[i-1].y;
    }
  }

  // Detects apple collision, repositions apple, and adds length of one unit to snake
  if (apple.x == snake.x && apple.y == snake.y) {
    apple.x = unitSize*Math.floor(Math.random() * (windowSize-1));
    apple.y = unitSize*Math.floor(Math.random() * (windowSize-1));

    snake.body.push({ posx: 0, posy: 0 });
  }

  // Render apple
  ctx.fillStyle = "red"
  ctx.fillRect(apple.x, apple.y, unitSize, unitSize)

  movePlayer();
}, 80)

/** 
 * Moves the player based on most recent direction key stored by keyDown() method
 * 
*/
function movePlayer() {
  switch (direction) {
    case keys.left:
      console.log("Left arrow");

      if (lastDirection !== keys.right) {
        snake.speedX = -unitSize;
        snake.speedY = 0;
        lastDirection = keys.left;
      }

      break;
    case keys.up:
      console.log("Up arrow");

      if (lastDirection !== keys.down) {
        snake.speedY = -unitSize;
        snake.speedX = 0;
        lastDirection = keys.up;
      }
      

      break;
    case keys.right:
      console.log("Right arrow");

      if (lastDirection !== keys.left) {
        snake.speedX = unitSize;
        snake.speedY = 0;
        lastDirection = keys.right;
      }
      

      break;
    case keys.down:
      console.log("Down arrow");

      if (lastDirection !== keys.up) {
        snake.speedY = unitSize;
        snake.speedX = 0;
        lastDirection = keys.down;
      }
      break;
    default:
      break
  }
  
  snake.x += snake.speedX;
  snake.y += snake.speedY;
}

/**
 * Handles pausing and stores movement controls 
 *
 * Occurs separately from the movePlayer() function so that the lastDirection
 * does not get overwritten between frames thus allowing the player to run
 * into their own body.
*/
function keyDown(e) {
  var code = e.keyCode;

  console.log(code);

  switch (code) {
    case keys.space:
      pause = !pause;
      break;
    case keys.left:
    case keys.up:
    case keys.right:
    case keys.down:
      direction = code;
  }
}
