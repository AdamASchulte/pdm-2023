// Set up Tone
let nxDial, nxButton;

let synth = new Tone.PolySynth().toDestination();
let dsynth = new Tone.PolySynth().toDestination();
let pattern = new Tone.Pattern(function (time, note) {
  synth.triggerAttackRelease(note, 0.25, time);
}, ['C4', 'D4', 'E4', 'G4', 'A4'])

const melody = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, [["D4", "D4"], "D5", "A4",[null, "G#4"], [null, "G4"], [null, "F4"], [null, "D4"], ["F4", "G4"]]).start("0:0");

// let chords = [
//   {"time": "0:0", "note": ["C4", "E3", "G4"]},
//   {"time": "0:3", "note": ["F4", "A4", "C4"]},
//   {"time": "1:1", "note": ["G4", "A3", "D4"]},
//   {"time": "1:2", "note": ["G4", "B3", "F4"]},
// ]

// let chord = new Tone.Part((time, notes) =>{
//   dsynth.triggerAttackRelease(notes.note, '2n', time)
// }, chords);

// chord.loop = 8;
// chord.loopEnd = '2m';


const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting at "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");


function setup() {
  createCanvas(400, 400);
  nxDial = Nexus.Add.Dial('#nxUI', {
    'size': [100, 100]
  });
  // change the volumes
  // synthA.volume.value = -9;
  // synthB.volume.value = -9;
  synth.volume.value = -2;
  dsynth.volume.value = -5;

  nxButton = Nexus.Add.Button('#nxUI');
  nxButton.on('change', () => {
    Tone.start();
    //pattern.start(0);
    //chord.start('0:0');
    Tone.Transport.start();
  })
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