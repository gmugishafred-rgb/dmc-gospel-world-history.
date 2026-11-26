(() => {
const $=id=>document.getElementById(id);
const tracks={
 worship:{name:"Gentle Worship",notes:[["C4",1],["E4",1],["G4",2],["A4",1],["G4",1],["E4",2],["D4",1],["F4",1],["A4",2],["G4",1],["E4",1],["C4",2]],chords:["C3","F3","G3","C3"]},
 gospel:{name:"Gospel Praise",notes:[["G4",.5],["B4",.5],["D5",1],["B4",.5],["A4",.5],["G4",1],["E4",.5],["G4",.5],["C5",1],["A4",.5],["G4",.5],["E4",1]],chords:["G3","C3","D3","G3"]},
 african:{name:"African Praise",notes:[["C5",.5],["G4",.5],["A4",.5],["G4",.5],["E4",1],["G4",.5],["A4",.5],["C5",1],["D5",.5],["C5",.5],["A4",1]],chords:["C3","G3","F3","C3"]},
 prayer:{name:"Quiet Prayer",notes:[["A4",2],["C5",2],["B4",2],["G4",2],["A4",2],["E4",2],["F4",2],["E4",2]],chords:["A3","F3","C3","G3"]},
 hymn:{name:"Hymn Procession",notes:[["C4",1],["C4",1],["G4",1],["G4",1],["A4",1],["A4",1],["G4",2],["F4",1],["F4",1],["E4",1],["E4",1],["D4",1],["D4",1],["C4",2]],chords:["C3","F3","G3","C3"]},
 joy:{name:"Joyful Celebration",notes:[["E4",.5],["G4",.5],["C5",1],["G4",.5],["A4",.5],["C5",1],["D5",.5],["C5",.5],["A4",1],["G4",.5],["E4",.5],["C4",1]],chords:["C3","G3","A3","F3"]}
};
const freq=n=>{const m=n.match(/^([A-G])(#?)(\d)$/);const semi={C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1]]+(m[2]?1:0)+(Number(m[3])-4)*12;return 440*Math.pow(2,(semi-9)/12)};
let ctx=null,timer=null,step=0,runId=0;
function tone(note,duration,kind,when,volume=.13){
 const osc=ctx.createOscillator(),gain=ctx.createGain(),f=freq(note);
 const types={piano:"triangle",flute:"sine",strings:"sawtooth",kalimba:"triangle",organ:"square"};
 osc.type=types[kind]||"triangle";osc.frequency.setValueAtTime(f,when);
 if(kind==="strings")osc.detune.setValueAtTime(-5,when);
 const peak=kind==="kalimba"?.19:volume;
 gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(peak,when+.025);
 gain.gain.exponentialRampToValueAtTime(.0001,when+Math.max(.12,duration*(kind==="strings"?.92:.78)));
 osc.connect(gain);gain.connect(ctx.destination);osc.start(when);osc.stop(when+duration+.04);
}
function bass(note,duration,when){const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(freq(note)/2,when);g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(.10,when+.015);g.gain.exponentialRampToValueAtTime(.0001,when+duration*.85);o.connect(g);g.connect(ctx.destination);o.start(when);o.stop(when+duration)}
function updateBars(i){const bars=$("rhythmNotes").children;for(let k=0;k<bars.length;k++)bars[k].classList.toggle("playing",k===i%bars.length)}
function stop(){runId++;if(timer)clearTimeout(timer);timer=null;$("rhythmPlay").disabled=false;$("rhythmStop").disabled=true;$("rhythmStatus").textContent="Stopped.";Array.from($("rhythmNotes").children).forEach(x=>x.classList.remove("playing"))}
function play(){
 stop();runId++;const myRun=runId;step=0;const track=tracks[$("rhythmTrack").value],instrument=$("rhythmInstrument").value,bpm=Number($("rhythmTempo").value),beat=60/bpm;
 if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();
 ctx.resume();$("rhythmPlay").disabled=true;$("rhythmStop").disabled=false;$("rhythmStatus").textContent="Playing: "+track.name+" • "+instrument;
 $("rhythmNotes").innerHTML=track.notes.map(()=>"<span></span>").join("");
 const cycle=()=>{
  if(myRun!==runId)return;
  const now=ctx.currentTime+.03,n=track.notes[step],dur=n[1]*beat;
  tone(n[0],dur,instrument,now);
  if(step%3===0)bass(track.chords[Math.floor(step/3)%track.chords.length],beat*1.7,now);
  updateBars(step);step++;
  if(step>=track.notes.length){if(!$("rhythmLoop").checked){stop();$("rhythmStatus").textContent="Melody finished.";return;}step=0;}
  timer=setTimeout(cycle,Math.max(90,dur*1000));
 };
 cycle();
}
$("rhythmPlay").addEventListener("click",play);$("rhythmStop").addEventListener("click",stop);
$("rhythmTempo").addEventListener("input",e=>$("rhythmTempoValue").textContent=e.target.value);
$("rhythmTrack").addEventListener("change",()=>{$("rhythmStatus").textContent="Selected: "+tracks[$("rhythmTrack").value].name;});
$("rhythmInstrument").addEventListener("change",()=>{if(timer)play();});
window.addEventListener("pagehide",stop);
})();