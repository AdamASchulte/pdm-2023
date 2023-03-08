let synth = new Tone.DuoSynth().toDestination();
let metal = new Tone.MetalSynth().toDestination();

function setup() {
  createCanvas(400, 400);
  
  button = createImg('pics/sans.png');
  button.position(140, 150);
  button.mousePressed(playSound);
  button.size(100, 100);
}

function playSound() {
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
}

function mousePressed() {
  console.log('pressed');
}




//sub arrays happen in the same time as a regular note ex: a sub array with two items will make it eigth notes
//Tone.Transport.rampTo(targetBPM, seconds_to_get_there);
//do a rest by using null instead of a note
//to start in a weird place:   .start("measure# : beat#); do beat# - 1 becase array indexing