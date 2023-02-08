let startTime = 30;
let timeRemaining = startTime;
let score = 0;
let spriteSheet;
let totalAnimations = 5;
let spriteSheetBug;

function preload() {
  spriteSheetBug = loadImage("assets/Bug.png");
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  textFont('Courier New');
  textStyle(BOLD);
  textSize(20);

  text("Time: " + ceil(timeRemaining), 480, 25);
  timeRemaining -= deltaTime / 1000;

  if(timeRemaining < 0) // reset time and score when time runs out
  {
    timeRemaining = startTime;
    score = 0;
  }
  text("Score: " + score, 20, 25);
}
