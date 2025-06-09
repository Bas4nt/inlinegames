const socket = io("https://your-backend-url.up.railway.app"); // replace with Railway backend URL
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const x = e.offsetX;
  const y = e.offsetY;
  socket.emit("draw", { x, y });
  draw(x, y);
});

function draw(x, y) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
}

socket.on("draw", ({ x, y }) => {
  draw(x, y);
});
