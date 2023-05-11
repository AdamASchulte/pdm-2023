let startTime = 30;
let timeRemaining = startTime;
let score = 0;
let spriteSheet;
let totalAnimations = 15;
let spriteSheetBug;
let bugAnimations = [];
let state = 5;
let hit = false;
let connected = 0;
let sensorData= {};
let cursorX = 200, cursorY = 200;
let sprite;
let cursorSpeed = 5;
let writer;
//let reader;


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

  sprite = new Sprite();
  sprite.diameter = 40;
  sprite.color = 'black';


  squished.toDestination();
  missed.toDestination();
  gameOver.toDestination();
  BackGround.toDestination();
}

function draw() {
  //clear();
  if(state == 5)
  {
    background(220);
    if ("serial" in navigator) {
      // The Web Serial API is supported.
      connectButton = createButton("connect");
      connectButton.position(10, 10);
      connectButton.mousePressed(connect);
    }
    else {}
    
  }
  else if(state == 0)
  {
    clear();
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
    
    serialRead();
    console.log(sensorData.sw);
    if(sensorData.x) //use this to allow joystick to control cursor
    {
      cursorX += cursorSpeed * sensorData.x / 512;
    }
    if(sensorData.y)
    {
      cursorY += cursorSpeed * sensorData.y / 512;
    }
    if(sensorData.sw)
    {
      buttonPushed();
    }
    // if(score == totalAnimations)
    // {
    //   state = 2;
    // }
    cursorX = constrain(cursorX, 0, width);
    cursorY = constrain(cursorY, 0, height); 
    sprite.x = cursorX;
    sprite.y = cursorY;
    console.log(cursorX);
    console.log(cursorY);
    console.log(sensorData.x);
    console.log(sensorData.y);

    text("Time: " + ceil(timeRemaining), 480, 25);
    timeRemaining -= deltaTime / 1000;
    text("Score: " + score, 75, 25);

    for(let i=0; i < bugAnimations.length; i++)
    {
      bugAnimations[i].draw();
    }

    if(score == totalAnimations || timeRemaining <= 0 || startTime <= 0)
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

function buttonPushed(){
  let played = 0;
  if(state == 1)
  {
    for(let i = 0; i < bugAnimations.length; i++)
  {
    let contains = bugAnimations[i].contains(cursorX,cursorY);
    if(contains) {
      if(bugAnimations[i].moving != 0)
      {
        bugAnimations[i].stop();
        score += 1;
        this.u = 5;
        if(!played)
        {
        squished.start();
        played = 1;
        }
        hit = true;
        
      }
      else
      {
        hit = false;
      }
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

// function serialWrite(jsonObject) {
//   if (writer) {
//     writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
//   }
// }

function serialRead() {
  (async () => {
    while (reader) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      try {
        sensorData = JSON.parse(value);
        console.log(value);
      }
      catch (e) {
        console.log("bad json parse: " + e);
      }
    }
  })();
}


async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 }); 
  state = 0;

  writer = port.writable.getWriter();
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
 }

 class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

 transform(chunk, controller) {
  // Append new chunks to existing chunks.
  this.chunks += chunk;
  // For each line breaks in chunks, send the parsed lines out.
  const lines = this.chunks.split("\n");
  this.chunks = lines.pop();
  lines.forEach((line) => controller.enqueue(line));
}

flush(controller) {
  // When the stream is closed, flush any remaining chunks out.
  controller.enqueue(this.chunks);
}
}

function serialWrite(jsonObject) {
  if (writer) {
    writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
  }
}