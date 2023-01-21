function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0);
  push();
  fill(255,255,0);
  circle(100, 100, 150)
  pop();

  push();
  fill(0);
  triangle(20, 35, 100, 100, 20, 175)

  push();
  fill(255, 0,0);
  circle(300, 100, 150);
  pop();

  push();
  fill(255, 0,0);
  noStroke();
  rect(226, 90, 148, 85);
  pop();

  push();
  fill(255, 255, 255);
  circle(270, 100, 40);
  pop();
  
  push();
  fill(255, 255, 255);
  circle(330, 100, 40);
  pop();

  push();
  fill(0, 0, 255);
  circle(270, 100, 20);
  pop();

  push();
  fill(0, 0, 255);
  circle(330, 100, 20);
  pop();
}
