let startTime = 30;
let timeRemaining = startTime;
let score = 0;
let spriteSheet;
let totalAnimations = 20;
let spriteSheetBug;
let bugAnimations = [];
let state = 0;
let hit = false;

let squished = new Tone.Player('sounds/Squish.wav');
let missed = new Tone.Player('sounds/Error.wav');
let gameOver = new Tone.Player('sounds/GameOver.wav');
let BackGround = new Tone.Player('sounds/Background.wav');


function preload() {
  spriteSheetBug = loadImage("assets/AntWithSquish.png");
  for(i = 0; i < totalAnimations; i++){
    bugAnimations[i]= new WalkingAnimation(spriteSheetBug, 50, 50, random(30, 390), random(30, 390), 4, 1, 10);
  }
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  

  squished.toDestination();
  missed.toDestination();
  gameOver.toDestination();
  BackGround.toDestination();
}

function draw() {
  if(state == 0)
  {
    background(220);
    textFont('Courier New');
    textStyle(BOLD);
    textSize(20);
    text('Bug Squish Game', 200, 100);
    text('Click Rectangle to Start', 160, 150);
    
    rect(190, 200, 200, 50);
    if(mouseIsPressed)
    {
      if(mouseX < 390 && mouseX > 190 && mouseY > 200 && mouseY < 250)
      {
        Tone.Transport.start();
        changeState(1);
      }
    }
  }
  else if(state == 1)
  {
    background(220);
    textFont('Courier New');
    textStyle(BOLD);
    textSize(20);

  // image(spriteSheetBug, 200, 200, 50, 50, 200, 0, 50, 50); image of dead bug

    text("Time: " + ceil(timeRemaining), 480, 25);
    timeRemaining -= deltaTime / 1000;

    // if(timeRemaining < 0) // reset time and score when time runs out
    // {
    //   timeRemaining = startTime;
    //   score = 0;
    // }
    text("Score: " + score, 30, 25);

    for(let i=0; i < bugAnimations.length; i++)
    {
      bugAnimations[i].draw();
    }

    if(score == 20 || timeRemaining <= 0 || startTime <= 0)
    {
      gameOver.start();
      changeState(2);
    } 
  }
  else if(state == 2)
  {
    background(220);
    textFont('Courier New');
    textStyle(BOLD);
    textSize(20);
    text('Game Over', 300, 100);
    textAlign(CENTER);
    rect(190, 300, 200, 50);
    if(mouseIsPressed)
    {
      if(mouseX < 390 && mouseX > 190 && mouseY > 300 && mouseY < 350)
      {
        Tone.Transport.start();
        changeState(0);
      }
    }
  }
}

function mousePressed() {

  if(state == 1)
  {
    for(let i = 0; i < bugAnimations.length; i++)
  {
    let contains = bugAnimations[i].contains(mouseX,mouseY);
    if(contains) {
      if(bugAnimations[i].moving != 0)
      {
        bugAnimations[i].stop();
        score += 1;
        this.u = 5;
        squished.start();
        hit = true;
      }
      else
      {
        hit = false;
      }
    }
  }
  if(hit == 0)
  {
    missed.start();
  }
  }

}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.speed = speed;
    this.framerate = framerate * speed;
  }

  draw() {
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx,this.dy);
    //rotate(90); // when you move sprites vertically you can rotate them to look better
    scale(-this.xDirection,1);
    
  
    //rect(-26, -35, 50, 70);

    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u * this.sw , this.v * this.sh, this.sw, this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    this.dx += this.moving * this.speed;

    if(this.dx > width - this.sw / 4) 
    {
        this.moveLeft();
    } 
    else if(this.dx < this.sw / 4)
    {
        this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
  }
  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
  }
  keyPressed(right, left) {
    if (keyCode === right)
    {
      this.currentFrame = 1;
    } 
    else if (keyCode === left) 
    {
      this.currentFrame = 1;
    }
  }

  keyReleased(right,left) {
    if (keyCode === right || keyCode === left) {
      this.moving = 0;
    }
  }
  contains(x, y){
    //rect(-26, -35, 50, 70);

    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 4;
    this.v = 0;
  }
}

function changeState(x){
  if(x == 0)
  {
    state = 0;
  }
  else if(x ==1)
  {
    state = 1;
    startTime = 30
    timeRemaining = startTime;
    score = 0;
    bugAnimations = [];
    preload();
  }
  else if(x == 2)
  {
    state = 2;
  }
}