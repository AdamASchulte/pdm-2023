let synth = new Tone.DuoSynth().toDestination();
let metal = new Tone.MetalSynth(
  {
    'attack': 0.9
  }
).toDestination();

function setup() {
  createCanvas(400, 400);
  button = createImg('pics/defaultdance.jpg');
  button.position(50, 150);
  button.mousePressed(playSound);
  button.size(300, 150);
}

function playSound() {
  const melody = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
  }, [[null, "F4"], ["F4", "G#4"], "A#4", "G#4",["F4", null], ['D#4', 'F4'], null, ['A#4', 'G#4'],['F4', 'D#4'], 'F4', null]).start("0:0");
  
  const melody2 = new Tone.Sequence((time, note) => {
    metal.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
  }, ).start("0:0");
  
  synth.volume.value = -2;
  metal.volume.value = -20;
  
  if(Tone.Transport.state == "started")
  {
    melody.stop();
    melody2.stop();
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
  }
  else 
  {
  Tone.start();
  Tone.Transport.start();
  melody.start();
  melody2.start();
  }
}

function draw() {
  background(220);
  text('press button to start/stop sound', 50, 50);
}

function mousePressed() {
  console.log('pressed');
}




//sub arrays happen in the same time as a regular note ex: a sub array with two items will make it eigth notes
//Tone.Transport.rampTo(targetBPM, seconds_to_get_there);
//do a rest by using null instead of a note
//to start in a weird place:   .start("measure# : beat#); do beat# - 1 becase array indexing