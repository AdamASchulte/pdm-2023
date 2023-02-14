let sound1 = new Tone.Player("sounds/chicken.wav"); //load sound
let sounds = new Tone.Players({
  "nuggets": "sounds/chicken.wav",
  "tiger" : "sounds/tiger.wav",
  "drop" : "sounds/water.mp3"
});
let button1, button2, button3;

function setup() {
  createCanvas(400, 400);

  sound1.toDestination(); //prepare sound
  sounds.toDestination(); 

  button1 = createButton('Chicken');
  button1.position(50, 50);
  button1.mousePressed(() => buttonSound("nuggets"));

  button2 = createButton('Tiger');
  button2.position(50, 100);
  button2.mousePressed(() => buttonSound("tiger"));

  button3 = createButton('Water');
  button3.position(50, 150);
  button3.mousePressed(() => buttonSound("water"));

}

function draw() {
  background(220);
}

function buttonSound(whichSound) {

  if(whichSound === "nuggets")
  {
  sounds.player("nuggets").start(); //play sound upon key press
  }
  else if(whichSound === "tiger")
  {
    
    sounds.player("tiger").start(); 
  }
  else if(whichSound === "water")
  {
    sounds.player().start(); 
  }
  sounds.start();
}