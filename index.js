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

let head = {
  size: 20,
  speedX: 20,
  speedY: 0,
  x: 40,
  y: 20,
  body: [
    {
      x: 20,
      y: 20,
    },
    {
      x: 0,
      y: 20,
    }
  ]
}

let apple = {
  posx: 60,
  posy: 60,
}

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
        head.speedX = -head.size;
        head.speedY = 0;
        lastDirection = keys.left;
      }

      break;
    case keys.up:
      console.log("Up arrow");

      if (lastDirection !== keys.down) {
        head.speedY = -head.size;
        head.speedX = 0;
        lastDirection = keys.up;
      }
      

      break;
    case keys.right:
      console.log("Right arrow");

      if (lastDirection !== keys.left) {
        head.speedX = head.size;
        head.speedY = 0;
        lastDirection = keys.right;
      }
      

      break;
    case keys.down:
      console.log("Down arrow");

      if (lastDirection !== keys.up) {
        head.speedY = head.size;
        head.speedX = 0;
        lastDirection = keys.down;
      }


      break;
  }
  
}

window.addEventListener('keydown',this.keyDown,false);

setInterval(() => {

  if (pause) {
    return;
  }

  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (gameover) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 1000);
    pause = true;
    return;
  }

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 1000, 1000);

  if (head.x < 0) { head.x = 980 }
  if (head.x >= 1000) { head.x = 0 }
  if (head.y < 0) { head.y = 980 }
  if (head.y >= 1000) { head.y = 0 }

  ctx.fillStyle = "black"
  ctx.fillRect(head.x, head.y, head.size, head.size)

  for (var i = head.body.length-1; i >= 0; i--) {
    let part = head.body[i]

    if (part.x == head.x && part.y == head.y) {
      gameover = true;
      break;
    }

    ctx.fillStyle = "black"
    ctx.fillRect(part.x, part.y, head.size, head.size)

    if (i == 0) {
      part.x = head.x;
      part.y = head.y;
    } else {
      part.x = head.body[i-1].x;
      part.y = head.body[i-1].y;
    }
  }

  if (apple.posx == head.x && apple.posy == head.y) {
    apple.posx = 20*Math.floor(Math.random() * 25);
    apple.posy = 20*Math.floor(Math.random() * 25);

    head.body.push({ posx: 0, posy: 0 });
  }

  ctx.fillStyle = "red"
  ctx.fillRect(apple.posx, apple.posy, head.size, head.size)

  head.x += head.speedX;
  head.y += head.speedY;
}, 50)
