//connecting stuff
let writer;
let sensorData = {};
let connected = false;
let reader;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let lightOn = {state: false};

//game stuff
let state = 0;
let lives = 10;
let sprite;
let cursorX = 400, cursorY = 490;
let startTime = 30;
let timeRemaining = startTime;
let score = 0;
let hit = false;
let cursorSpeed = 5;
let totalAnimations = 15;
let spriteSheet;
let spriteSheetBug;
let bugAnimations = [];
direction = 0;

//images
let backImage;
let gameBack;
let gameBack2;
let winScreen;
let loseScreen;

//sound stuff
let squished = new Tone.Player('sounds/Squish.wav');
let lostLife = new Tone.Player('sounds/Error.wav');
let gameOver = new Tone.Player('sounds/GameOver.wav');

let synth = new Tone.DuoSynth().toDestination();
let metal = new Tone.MetalSynth(
  {
    'attack': 0.9
  }
).toDestination();

function preload()
{
  backImage = loadImage("assets/background.jpg");
  gameBack = loadImage("assets/gameBack.jpg");
  gameBack2 = loadImage("assets/gameBack2.jpg");
  winScreen = loadImage("assets/winScreen.jpg");
  loseScreen = loadImage("assets/loseScreen.jpg")

  spriteSheetBug = loadImage("assets/AntWithSquish.png");
  for(i = 0; i < totalAnimations; i++){
    bugAnimations[i]= new WalkingAnimation(spriteSheetBug, 50, 50, random(30, 700), random(30, 450), 4, 1, 10);
  }
}

function setup() {
  createCanvas(800, 500);
  sprite = new Sprite();
  sprite.diameter = 40;
  sprite.color = 'black';

  squished.toDestination();
  lostLife.toDestination();
  gameOver.toDestination();
}

function draw() {
  if(state == 0)
  {
    background(backImage);
    textFont('Courier New');
    textStyle(BOLD);
    textSize(50);
    fill('white');
    text('Monster Hunter', 200, 100);
    textSize(20);
    text('Connect, Then Press Enter to Start', 210, 450);
    text('Press Shift for instructions', 240, 475);

    connectButton = createButton("connect");
    connectButton.position(0,0);

    connectButton.mousePressed(connect);
  }
  else if(state == 1)
  {
    clear();
    background(gameBack2);
    fill('black');
    text("Time: " + ceil(timeRemaining), 480, 25);
    timeRemaining -= deltaTime / 1000;
    text("Score: " + score, 75, 25);
    text("Life Force: " + lives, 200, 25);

    for(let i=0; i < bugAnimations.length; i++)
    {
      bugAnimations[i].draw();
    }

    serialRead();
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

    cursorX = constrain(cursorX, 0, width);
    cursorY = constrain(cursorY, 0, height); 
    sprite.x = cursorX;
    sprite.y = cursorY;
    

    if(lives <= 0)
    {
      changeState(3);
    }
    if(score == totalAnimations)
    {
      changeState(2);
    }
    if(timeRemaining <= 0 && score == totalAnimations)
    {
      changeState(2);
    }
    else if(timeRemaining <= 0 && score != totalAnimations)
    {
      changeState(3);
    }
  }
  else if(state == 2)
  {
    background(winScreen);
    fill('white');
    text("Score: " + score, 350, 400);
    text("Press Enter to Return to Start Screen", 200, 490);
    sprite.x = cursorX;
    sprite.y = cursorY;
    cursorX = 0;
    cursorY = 0;
  }
  else if(state == 3)
  {
    background(loseScreen);
    fill('white');
    text("Score: " + score, 350, 400);
    text("Press Enter to Return to Start Screen", 200, 490);
    sprite.x = cursorX;
    sprite.y = cursorY;
    cursorX = 0;
    cursorY = 0;
  }
  else if(state == 4)
  {
    background(220);
    sprite.x = 800;
    sprite.y = 800;
    fill('black');
    textSize(15);
    text("To connect, press the connect button and select your arduino board.", 80, 50);
    text("To play, use your joystick to move around the black circle.", 105, 100);
    text("Press the button while over monsters to squish them", 130, 120);
    text("Don't miss the ants too many times or your life force will run down.", 80, 150);
    text("To win, squish all the monsters within the time and don't lose all your life force", 30, 200);
    text("Press Enter to return to the start screen", 200, 250);
    text("Use Left/Right arrows to increase/decrease time", 190, 300);
    text("Use Up/Down arrows to increase/decrease number of monsters", 180, 325);
    text("Number of monsters: " + totalAnimations, 100, 350);
    text("Time: " + startTime, 400, 350);
  }
}

function changeState(x){
  if(x ==1 && connected)
  {
    lives = 10000;
    state = 1;
    timeRemaining = startTime;
    score = 0;
    bugAnimations = [];
    preload();
  }
  else if(x == 2)
  {
    state = 2;
    Tone.Transport.stop();
    gameOver.start();
  }
  else if(x == 3)
  {
    state = 3;
    Tone.Transport.stop();
    gameOver.start();
  }
  else
  {
    state = x;
  }
}

//sound stuff
function playSound()
{
  //Tone.Transport.Start();
  const melody = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
  }, [["D4", "D4"], "D5", "A4",[null, "G#4"], [null, "G4"], [null, "F4"], [null, "D4"], ["F4", "G4"]]).start("0:0");
  const x = new Boolean(true);
  
  const melody2 = new Tone.Sequence((time, note) => {
    metal.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
  }, [["D4", "D4"], "D5", "A4",[null, "G#4"], [null, "G4"], [null, "F4"], [null, "D4"], ["F4", "G4"]]).start("0:0");
  
  synth.volume.value = -2;
  metal.volume.value = -20;
  
  // if(Tone.Transport.state == "started")
  // {
  //   melody.stop();
  //   melody2.stop();
  //   Tone.Transport.stop();
  //   Tone.Transport.cancel(0);
  // }
  Tone.start();
  Tone.Transport.start();
  melody.start();
  melody2.start();
  changeState(1);
}

//anything arduino
async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 }); 
  state = 0;

  writer = port.writable.getWriter();
  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
  connected = 1;
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

async function serialRead() {
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

function buttonPushed(){
  let played = 0;
  if(state == 1)
  {
    for(let i = 0; i < bugAnimations.length; i++)
    {
      let contains = bugAnimations[i].contains(cursorX,cursorY);
      if(contains) 
      {
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
          lightOn.state = true;
          serialWrite(lightOn);
          lightOn.state = false;
        }
        else
        {
          lives--;
        }
      }
      else
      {
        lives--;
      }
    }
  }
}

//change states with ENTER
function keyPressed()
{
  if(keyCode == SHIFT && state == 0)
  {
    changeState(4);
  }
  if(keyCode == UP_ARROW && state == 4 && totalAnimations < 30)
  {
    totalAnimations++;
  }
  else if(keyCode == DOWN_ARROW && state == 4 && totalAnimations > 5)
  {
    totalAnimations--;
  }
  else if(keyCode == LEFT_ARROW && state == 4 && startTime > 5)
  {
    startTime--;
  }
  else if(keyCode == RIGHT_ARROW && state == 4 && startTime < 60)
  {
    startTime++;
  }

  if(state == 4 && keyCode == ENTER)
  {
    changeState(0);
  }
  else if(connected == 1)
  {
    if(keyCode === ENTER)
    {
      if(state == 0)
      {
        playSound();
      }
      else if(state == 2)
      {
        changeState(0);
      }
      else if(state == 3)
      {
        changeState(0);
      } 
    }
  }
  
  
}

//Animations
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

    if(this.dx - this.sw > width + this.sw / 4) 
    {
        this.moveLeft();
    } 
    else if(this.dx < -this.sw)
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

