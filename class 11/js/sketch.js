const synth = new Tone.DuoSynth()


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
  synth.triggerAttackRelease(whatNote, "8n"); 
}