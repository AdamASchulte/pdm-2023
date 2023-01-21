function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 104);

  push();
  fill(255, 255, 255);
  noStroke();
  circle(200, 200, 200);
  pop();

  push();
  fill(0, 104, 0);
  noStroke();
  circle(200, 200, 190);
  pop();

  beginShape();
  fill(255, 255, 255);
  noStroke();
  vertex(200, 95);
  vertex(220, 165);
  vertex(300, 165);
  vertex(240, 210);
  vertex(255, 290);
  vertex(200, 245);
  vertex(145, 290);
  vertex(160, 210);
  vertex(100, 165);
  vertex(180, 165);
  endShape();

  beginShape();
  fill(255, 0, 0);
  noStroke();
  vertex(200, 105);
  vertex(215, 170);
  vertex(285, 170);
  vertex(232, 207);
  vertex(245, 274);
  vertex(200, 238);
  vertex(155, 274);
  vertex(168, 207);
  vertex(115, 170);
  vertex(185, 170);
  endShape();


}
