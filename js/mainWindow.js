const Speakers = 4;

var results = [];
var recordings = [];
var recording;
var iterator = 0;

for(var i=1; i<=Speakers; i++) {
    recordings.push(i + "." + 1 + ".wav");
    recordings.push(i + "." + 2 + ".wav");
    if (i==4) continue;
    recordings.push(i + "." + 3 + ".wav");
}

console.log(recordings);
recordings = shuffle(recordings);
console.log(recordings);

window.onload = function () {
    initialize_subDiv()
}

function initialize_subDiv() {
    let div = document.createElement("div");
    div.setAttribute('id', 'subDiv')
    div.setAttribute('align', 'center');

    let recordPath = getRecordPath(recordings[iterator]);

    insertAudioPlayer(div, recordPath)
    insertColorPalette(div);
    insertNextButton(div)

    let parent = document.getElementById("mainDiv")
    if (parent != null) {
        parent.appendChild(div);   
    } else {
        console.log("Parent not found.")
    }
}

function insertAudioPlayer(parent, audioPath) {
    let player = document.createElement("audioPlayer");
    player.innerHTML = `<audio controls id="player" onended="manipulatePicker('display', 'block')">
                        <source id="playerSource" src="` + audioPath + `" type="audio/wav">
                        Your browser does not support the audio element.
                        </audio>`;
    appendChild(parent, player);
}

function loadNextRecording(audioPath) {
    let playerSource = document.getElementById("playerSource");
    let player = document.getElementById("player")
    playerSource.src = audioPath;
    player.load()
    console.log("Loaded new recording: " + audioPath);
}

function insertColorPalette(parent) {
    let palette = document.createElement("colorPalette");
    palette.innerHTML = `<div class="picker-wrapper" id="picker-wrapper" hidden>
                            <button class="btn btn-default">Select color</button>
                            <div class="color-picker"></div>
                            <div id="color-selected" class="color-selected"></div>
                            <input type="text" disabled="true" id="picker-text" class="picker-text" hidden>
                        </div>`;
    appendChild(parent, palette);
}

function insertNextButton(parent) {
    let paragraph = document.createElement("P")
    let nextButton = document.createElement("BUTTON");
    nextButton.setAttribute("disabled", "true");
    nextButton.setAttribute("id", "nextbutton");
    nextButton.setAttribute("class", "nextbutton");
    nextButton.setAttribute("onClick", "nextButtonClick()");
    nextButton.innerHTML = "Next"
    appendChild(paragraph, nextButton)
    appendChild(parent, paragraph);
}

// Color Palette setup

window.addEventListener("load", function () {
    var pk = new Piklor(".color-picker", [
            "#1abc9c"
          , "#2ecc71"
          , "#3498db"
          , "#9b59b6"
          , "#34495e"
          , "#16a085"
          , "#27ae60"
          , "#2980b9"
          , "#8e44ad"
          , "#2c3e50"
          , "#f1c40f"
          , "#e67e22"
          , "#e74c3c"
          , "#ecf0f1"
          , "#95a5a6"
          , "#f39c12"
          , "#d35400"
          , "#c0392b"
          , "#bdc3c7"
          , "#7f8c8d"
        ], {
            open: ".picker-wrapper .btn"
        })
      , selectedCol = pk.getElm(".color-selected")
      , textBox = pk.getElm(".picker-text")
      ;

    pk.colorChosen(function (col) {
        textBox.value = col;
        selectedCol.style.backgroundColor = col;
        let nextButton = document.getElementById("nextbutton")
        nextButton.removeAttribute("disabled")
    });
});

// Helper methods
function shuffle(array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

function nextButtonClick() {
    let textBox = document.getElementById("picker-text");
    let color = textBox.value;
    results.push({"Recording": recordings[iterator], "Color": color})
    console.log(results)
    iterator++;

    if (iterator < recordings.length) {
        let nextbutton = document.getElementById("nextbutton");
        nextbutton.setAttribute("disabled", "true");

        let selectedCol = document.getElementById("color-selected");
        selectedCol.removeAttribute('style');
        manipulatePicker('display', 'none');

        let recordPath = getRecordPath(recordings[iterator]);
        loadNextRecording(recordPath);
    } else {
        alert("Finished. Thank you for your time.")
        sendResults("bartosz.myrcha@gmail.com", "Wyniki ankiety", JSON.stringify(results));
        alert("Results has been successfully sent.\nYou can close this page now.")
    }  
}

function appendChild(parent, element) {
    try {
        parent.appendChild(element);
    }
    catch {
        if (parent == null) {
            throw "Parent not found!"
        }
        else {
            throw "Element not found"
        }
    }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRecordPath(recording) {
    var speakerNumber = recording.split('.')[0]
    var recordNumber = recording.split('.')[1]
    return "nagrania/" + speakerNumber + "/" + speakerNumber + "." + recordNumber + ".wav"
}

function manipulatePicker(property, value) {
    var picker = document.getElementById("picker-wrapper")
    switch(property){
        case "display": picker.style.display = value; break;
    }
}

function sendResults(subject, content) {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': "ESmAzq_XBCA7KtD8iKdkoQ",
          'message': {
            'from_email': "ankieta.mgr.idio@gmail.com",
            'to': [
                {
                  'email': "ankieta.mgr.idio@gmail.com",
                  'type': 'to'
                }
              ],
            'autotext': 'true',
            'subject': subject,
            'html': content
          }
        }
       }).done(function(response) {
         console.log(response);
       });
}
