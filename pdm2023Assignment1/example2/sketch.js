function setup() {
  createCanvas(225, 225);
}

function draw() {
  background(220);

  push();
  fill(255, 0, 0, 50);
  noStroke();
  circle(100, 100, 50)
  pop();

  push();
  fill(0, 0, 255, 50);
  noStroke();
  circle(85, 125, 50);
  pop();

  push();
  fill(0,255, 0, 50);
  noStroke();
  circle(115, 125, 50);


}
