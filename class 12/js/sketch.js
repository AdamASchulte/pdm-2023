const synth = new Tone.DuoSynth()
const mysynth = new Tone.Plucksynth();
const drum = new Tone.MembraneSynth();
let slider;
const metal = new Tone.MetalSynth({
  "frequency" : 45,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.4,
    "release" : 0.2
  }, 
  "harmonicity" : 8.5,
  "modulationIndex" :  40,
  "resonance" : 300,
  "octaves" : 1.5
  
});
 const reverb = new Tone.JCReverb(0.4);
 mysynth.connect(reverb);
 drum.connect(reverb);
 metal.connect(reverb);

 const osc = new Tone.OmniOscillator("C#4", "pwm").start();
 const ampEnv = new Tone.AmplitudeEnvelope({
	attack: 0.1,
	decay: 0.2,
	sustain: 1.0,
	release: 0.8
}).toDestination();

//how to create different notes
// 'key on keyboard' : 'pitch on piano'
let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");

  reverb.toDestination();


  slider.on('change', (v) => {
    reverb.roomsize.value = v;
  });

  osc.connect(ampEnv);
  ampEnv.connect(reverb);
  
  mysynth.release = 2;
  mysynth.resonance = 0.98;
  synth.toDestination();
}

function draw() {
  background(220);
}


// attack means time it takes for amplitude to reach its peak
//sustain means theres a plateau of pitch
//decay means length of time to reach plateau
//release is final length of time to lose all volume
//!!!!don't put sounds in draw function ever!!!!
//triggerAttackRelease() takes arguments: note(pitch), duration(in terms of quarter note/eigth note etc...), time (when should it play after triggering event), velocity(velocity at which note should be triggered between 0 and 1)
//<param> means you need to put a .value after it. also if its a signal
function keyPressed() {
  let whatNote = notes[key];
  console.log(whatNote);
  harmonicity.value = 0.5;

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');
  synth.triggerAttackRelease(whatNote, "8n"); 
}