var results = [];
var recording;

window.onload = function () {
    var div = document.createElement("div");
    div.setAttribute('align', 'center');

    var speakerNumber = getRndInteger(1,4);
    var recordNumber = getRndInteger(1,3);
    recording = speakerNumber + "." + recordNumber + ".wav"
    var recordPath = getRecordPath(speakerNumber, recordNumber);

    console.log.innerHTML;

    insertAudioPlayer(div, recordPath)
    insertColorPalette(div);
    insertNextButton(div)

    var parent = document.getElementById("mainDiv")
    if (parent != null) {
        parent.appendChild(div);   
    } else {
        console.log("Parent not found.")
    }
}

function insertAudioPlayer(parent, audioPath) {
    var player = document.createElement("audioPlayer");
    player.innerHTML = `<audio controls onended="manipulatePicker('display', 'block')">
                        <source src="` + audioPath + `" type="audio/wav">
                        Your browser does not support the audio element.
                        </audio>`;
    appendChild(parent, player);
}

function insertColorPalette(parent) {
    var palette = document.createElement("colorPalette");
    palette.innerHTML = `<div class="picker-wrapper" id="picker-wrapper" hidden>
                            <button class="btn btn-default">Select color</button>
                            <div class="color-picker"></div>
                            <div class="color-selected"></div>
                            <input type="text" disabled="true" id="picker-text" class="picker-text" hidden>
                        </div>`;
    appendChild(parent, palette);
}

function insertNextButton(parent) {
    var paragraph = document.createElement("P")
    var nextButton = document.createElement("BUTTON");
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
        var nextButton = document.getElementById("nextbutton")
        nextButton.removeAttribute("disabled")
    });
});

// Helper methods
function nextButtonClick() {
    var textBox = document.getElementById("picker-text");
    var color = textBox.value;

    results.push({"Recording": recording, "Color": color})
    console.log(results)
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

function getRecordPath(speaker, record) {
    return "nagrania/" + speaker + "/" + speaker + "." + record + ".wav"
}

function manipulatePicker(property, value){
    var picker = document.getElementById("picker-wrapper")
    switch(property){
        case "display": picker.style.display = value; break;
    }
}