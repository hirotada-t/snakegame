const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const GRID = 20;
const STAGE = canvas.width / GRID;

class Snake {
  x: number;
  y: number;
  dx = 1;
  dy = 1;
  tail: number;
  body: { x: number; y: number }[] = [];
  constructor(x: number, y: number, tail: number) {
    this.x = x;
    this.y = y;
    this.tail = tail;
  }
  update() {
    this.body.push({ x: this.x, y: this.y });
    this.x += this.dx;
    this.y += this.dy;
    ctx.fillStyle = "green";
    this.body.forEach((obj) => {
      ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
      if (this.x === obj.x && this.y === obj.y) {
        snake = new Snake(STAGE / 2, STAGE / 2, 4);
      }
    });
    if (this.body.length > this.tail) this.body.shift();
  }
}

class Item {
  x: number;
  y: number;
  constructor() {
    this.x = Math.floor(Math.random() * STAGE);
    this.y = Math.floor(Math.random() * STAGE);
  }
  update() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
  }
}

let snake = new Snake(STAGE / 2, STAGE / 2, 4);
let item = new Item();

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  item.update();
  snake.update();

  if (snake.x < 0) snake.x = STAGE - 1;
  if (snake.y < 0) snake.y = STAGE - 1;
  if (snake.x > STAGE) snake.x = 0;
  if (snake.y > STAGE) snake.y = 0;

  if (snake.x === item.x && snake.y === item.y) {
    snake.tail++;
    item.x = Math.floor(Math.random() * STAGE);
    item.y = Math.floor(Math.random() * STAGE);
  }
};

setInterval(loop, 1000 / 15);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "h":
      snake.dx = -1;
      snake.dy = 0;
      break;
    case "ArrowRight":
    case "l":
      snake.dx = 1;
      snake.dy = 0;
      break;
    case "ArrowUp":
    case "k":
      snake.dx = 0;
      snake.dy = -1;
      break;
    case "ArrowDown":
    case "j":
      snake.dx = 0;
      snake.dy = 1;
      break;
  }
});
