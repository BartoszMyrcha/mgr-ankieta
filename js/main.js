// ----------CONSTS------------
const Speakers = 12;
const speakers_with_2_recordings = [4, 6, 7, 8, 9, 11]
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

recordings = shuffle(recordings);

window.onload = function () {
    initialize_form()
}
