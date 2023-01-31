var drawColor = 'black';
function setup() {
  createCanvas(800, 500);
  background(220);
  push();
  fill(255);
  noStroke();
  rect(700, 0, 100, 50);
  pop();
  push();
  fill(0);
  noStroke();
  text("Clear Board", 720, 28)
  pop();
}

function draw() {
  drawSquare(1, 0, 20, 'red');
  drawSquare(1, 21, 20, 'orange');
  drawSquare(1, 41, 20, 'yellow');
  drawSquare(1, 61, 20, 'green');
  drawSquare(1, 81, 20, 'cyan');
  drawSquare(1, 101, 20, 'blue');
  drawSquare(1, 121, 20, 'magenta');
  drawSquare(1, 141, 20, 'brown');
  drawSquare(1, 161, 20, 'white');
  drawSquare(1, 181, 20, 'black');

  push();
  fill(255);
  noStroke();
  rect(700, 0, 100, 50);
  pop();
  push();
  noStroke();
  text("Clear Board", 720, 28)
  pop();


  if (mouseIsPressed) {
    if (mouseX <= 20 && mouseY >= 1 && mouseY <= 21) {
      drawColor = 'red';
    } else if (mouseX <= 20 && mouseY >= 21 && mouseY <= 41) {
      drawColor = 'orange';
    } else if (mouseX <= 20 && mouseY >= 41 && mouseY <= 61) {
      drawColor = 'yellow';
    } else if (mouseX <= 20 && mouseY >= 61 && mouseY <= 81) {
      drawColor = 'green';
    } else if (mouseX <= 20 && mouseY >= 81 && mouseY <= 101) {
      drawColor = 'cyan';
    } else if (mouseX <= 20 && mouseY >= 101 && mouseY <= 121) {
      drawColor = 'blue';
    } else if (mouseX <= 20 && mouseY >= 121 && mouseY <= 141) {
      drawColor = 'magenta';
    } else if (mouseX <= 20 && mouseY >= 141 && mouseY <= 161) {
      drawColor = 'brown';
    } else if (mouseX <= 20 && mouseY >= 161 && mouseY <= 181) {
      drawColor = 'white';
    } else if (mouseX <= 20 && mouseY >= 181 && mouseY <= 201) {
      drawColor = 'black';
    } else if(!(mouseX < 26 && mouseY < 206) && !(mouseX >= 695 && mouseY <= 55)) {
      stroke(drawColor);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
    } else if(mouseX >= 700 && mouseY <= 50) {
      clearBoard();
    }
  }
}

function drawSquare(rightSide, leftSide, width, color) {
  push();
  noStroke();
  fill(color);
  square(rightSide, leftSide, width);
  pop();
}

function clearBoard(){
  background(220);
  push();
  fill(255);
  noStroke();
  rect(700, 0, 100, 50);
  pop();
  push();
  noStroke();
  text("Clear Board", 720, 28)
  pop();
}