function preload() {
  lsuImg = loadImage("assets/LSU.png");
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(lsuImg, 0, 0, .5*lsuImg.width, .25*lsuImg.height);
}
