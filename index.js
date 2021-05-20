let keys = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
}

let pause = false;
let gameover = false;
let lastDirection = 0;
let unitSize = 20;
let windowSize = 40;

let head = {
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

  if (gameover) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, windowSize*unitSize, windowSize*unitSize);
    pause = true;
    return;
  }

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, windowSize*unitSize, windowSize*unitSize);

  ctx.font = '48px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${head.body.length}`, (windowSize+1)*unitSize, 50);

  if (head.x < 0) { head.x = (windowSize-1)*unitSize }
  if (head.x >= windowSize*unitSize) { head.x = 0 }
  if (head.y < 0) { head.y = (windowSize-1)*unitSize }
  if (head.y >= windowSize*unitSize) { head.y = 0 }

  ctx.fillStyle = "black"
  ctx.fillRect(head.x, head.y, unitSize, unitSize)

  for (var i = head.body.length-1; i >= 0; i--) {
    let part = head.body[i]

    if (part.x == head.x && part.y == head.y) {
      gameover = true;
      break;
    }

    ctx.fillStyle = "black"
    ctx.fillRect(part.x, part.y, unitSize, unitSize)

    if (i == 0) {
      part.x = head.x;
      part.y = head.y;
    } else {
      part.x = head.body[i-1].x;
      part.y = head.body[i-1].y;
    }
  }

  if (apple.x == head.x && apple.y == head.y) {
    apple.x = unitSize*Math.floor(Math.random() * (windowSize-1));
    apple.y = unitSize*Math.floor(Math.random() * (windowSize-1));

    head.body.push({ posx: 0, posy: 0 });
  }

  ctx.fillStyle = "red"
  ctx.fillRect(apple.x, apple.y, unitSize, unitSize)

  head.x += head.speedX;
  head.y += head.speedY;
}, 80)

function keyDown(e) {
  var code = e.keyCode;

  console.log(code);

  switch (code) {
    case keys.space:
      pause = !pause;
      break;
    case keys.left:
      console.log("Left arrow");

      if (lastDirection !== keys.right) {
        head.speedX = -unitSize;
        head.speedY = 0;
        lastDirection = keys.left;
      }

      break;
    case keys.up:
      console.log("Up arrow");

      if (lastDirection !== keys.down) {
        head.speedY = -unitSize;
        head.speedX = 0;
        lastDirection = keys.up;
      }
      

      break;
    case keys.right:
      console.log("Right arrow");

      if (lastDirection !== keys.left) {
        head.speedX = unitSize;
        head.speedY = 0;
        lastDirection = keys.right;
      }
      

      break;
    case keys.down:
      console.log("Down arrow");

      if (lastDirection !== keys.up) {
        head.speedY = unitSize;
        head.speedX = 0;
        lastDirection = keys.down;
      }

      break;
  }
  
}
