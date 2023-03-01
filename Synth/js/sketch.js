let slider;

const metal = new Tone.MetalSynth({
	"frequency"  : 40 ,
	"envelope"  : {
		"attack"  : 0.005 ,
		"decay"  : 0.3 ,
		"release"  : 0.1
	}  ,
	"harmonicity"  : 10 ,
	"modulationIndex"  : 10 ,
	"resonance"  : 100 ,
	"octaves"  : 1.5
});
const reverb = new Tone.JCReverb(0.4);
metal.connect(reverb);

const osc = new Tone.OmniOscillator("C#4", "pwm").start();

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
})

let notes = {
  'q': 'B3',
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5',
  'l': 'D5'
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  // synth.harmonicity.value = 1.25;
  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");

  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 

  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background(220);
  text("Use silder to change reverb", 1, 10);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8t');

  // synth.triggerAttackRelease(toPlay, 0.5);
  // metal.triggerAttackRelease("C3", "8n", '+0.5');
  // drum.triggerAttackRelease("C2", "8n", '+1');
}