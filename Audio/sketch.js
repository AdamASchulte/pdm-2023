// let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "quack": "sounds/quack.wav",
  "piano plink": "sounds/pianoPlink.wav",
  "spooky siren": "sounds/spookySiren.wav",
  "game sound": "sounds/gameSound.mp3"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["quack", "piano plink", "spooky siren", "game sound"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(54, 120, 180);
  text('press the buttons for sound', 0, 200);
  text('slide to change feedback.', 0, 395);
  text('silde to change delay time.', 140, 395);

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}