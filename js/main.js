// ----------CONSTS------------
const Speakers = 12;
const speakers_with_2_recordings = [4, 6, 7, 8, 9, 11];
const questions = 15; // Number of questions in survey
// ----------------------------

var results = {};
var results_list = [];
var recordings = [];
var recording;
var iterator = 0;

for(var i=1; i<=Speakers; i++) {
    recordings.push(i + "." + 1 + ".wav");
    recordings.push(i + "." + 2 + ".wav");
    if (speakers_with_2_recordings.includes(i)) continue;
    recordings.push(i + "." + 3 + ".wav");
}

// Remove common sample to avoid duplicate
for( var i = 0; i < recordings.length; i++){ 
    if ( recordings[i] === "2.2.wav") {
      recordings.splice(i, 1); 
    }
 } 

recordings = shuffle(recordings);
recordings = recordings.slice(1, questions); // Limit recordings to questions number 
recordings.push("2.2.wav"); // Common sample for all surveys
recordings = shuffle(recordings);

window.onload = function () {
    initialize_intro()
}
