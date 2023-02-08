let spriteSheet;
let spriteSheetPurple;
let spriteSheetLime;
let sx = 0; // x location of initial sprite on spriteSheet
let sy = 0; // y location of initial sprite on spriteSheet
let sw = 80; // width of each sprite on spriteSheet
let sh = 80; // height of each sprite on spriteSheet
let u = 0, v = 0; 
let animationLength = 9;
let currentFrame = 0;
let x = 200;
let moving = 0;
let xDirection = 1;
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;

function preload(){          //loads image before setting up background
  spriteSheetPurple = loadImage("assets/SpelunkyPurple.png");   //grabbing image from assets folder
  spriteSheetLime = loadImage("assets/SpelunkyLime.png");
  spriteSheetRobot = loadImage("assets/SpelunkyRobot.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);  // centering image about origin
  walkingAnimation = new WalkingAnimation(spriteSheetPurple, 80, 80, 150, 200, 9); 
  walkingAnimation2 = new WalkingAnimation(spriteSheetLime, 80, 80, 50, 300, 9); 
  walkingAnimation3 = new WalkingAnimation(spriteSheetRobot, 80, 80, 250, 100, 9);
}

function draw() {
  background(220);
  walkingAnimation.draw(); //calls the draw function in the class
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed(RIGHT_ARROW, LEFT_ARROW); //calls the keypressed function in the class
  walkingAnimation2.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyPressed(RIGHT_ARROW, LEFT_ARROW);
}

function keyReleased() {
  walkingAnimation.keyReleased(RIGHT_ARROW, LEFT_ARROW); //calls the keyreleased function in the class
  walkingAnimation2.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  walkingAnimation3.keyReleased(RIGHT_ARROW, LEFT_ARROW);
}

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength, offsetX = 0, offsetY = 0) {
    this.spriteSheet = spriteSheet;
    this.sw = sw; //spriteWidth
    this.sh = sh; //spriteHeight
    this.dx = dx; //initial X value of location on screen
    this.dy = dy; //initial Y value of location on screen
    this.u = 0;   
    this.v = 0;   
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

   draw() {
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength: 0;
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    

    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
    pop();

    if(frameCount % 6 == 0)
    {
      this.currentFrame++;
    }
    this.dx += this.moving;
  }

  keyPressed(right, left) {
    if(keyCode === right)
    {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }
    else if(keyCode === left)
    {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }
  
  keyReleased(right, left) {
    if(keyCode === right || keyCode === left)
    {
       this.moving = 0;
    }
  }
}
