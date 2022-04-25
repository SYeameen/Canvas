const canvas = document.querySelector('#draw');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = 'BADA55';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 100;

let isDrawing = false;
let startX = 0;
let endY = 0;
let hue = 0;
let direction = true;

function drawing(e) {
  if (!isDrawing) {
    return; // stop the function from running when they are not moused down.
  }
  console.log(e);
  context.strokeStyle = `hsl(${hue},100%,50%)`;

  hue++;

  if (hue >= 360) {
    hue = 0;
  }

  if (context.lineWidth >= 500 || context.lineWidth <= 100) {
    direction = !direction;
  }

  if (direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }

  context.beginPath();
  //start from
  context.moveTo(startX, endY);
  //go to
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [startX, endY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [startX, endY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
