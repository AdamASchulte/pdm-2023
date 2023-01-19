function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
}

function draw() {
  background(255, 100, 50);

  //eyes
  ellipse(200, 100, 90, 60);
  ellipse(400, 100, 90, 60);

  //iris/pupils
  push();
  fill(120, 100, 100);
  ellipse(400, 100, 30, 30);
  ellipse(200, 100, 30,30);
  fill(0);
  ellipse(400, 100, 10, 10);
  ellipse(200, 100, 10, 10)
  pop();

  //nose
  //triangle(300, 100, 100, 200, 500, 200)
  beginShape();
  vertex(295, 100);
  vertex(280,200);
  vertex(300,205);
  vertex(320,200);
  vertex(305,100);
  endShape(CLOSE);

  //mouth
  push();
  fill(325, 50, 90);
  arc(300, 250, 200, 50, 0, PI, PIE)
  pop();

  //eyebrows
  push();
  strokeWeight(5);
  strokeCap(SQUARE);
  line(175, 60, 225, 70);
  line(375, 70, 425, 60);
  pop();

  //text
  textSize(32);
text('Mo Bamba', 230, 350);
}
