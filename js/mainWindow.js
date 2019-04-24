const Speakers = 4;

var results = {};
var results_list = [];
var recordings = [];
var recording;
var iterator = 0;

for(var i=1; i<=Speakers; i++) {
    recordings.push(i + "." + 1 + ".wav");
    recordings.push(i + "." + 2 + ".wav");
    if (i==4) continue;
    recordings.push(i + "." + 3 + ".wav");
}

recordings = shuffle(recordings);

window.onload = function () {
    initialize_form()
}

function initialize_form() {
    let form = document.createElement("DIV");
    form.setAttribute('id', 'form');
    form.setAttribute('align', 'center');
    
    let p1 = document.createElement("P");
    let sex_label = document.createElement("TEXT");
    sex_label.textContent = "Płeć: ";
    let sex_select = document.createElement("SELECT");
    sex_select.setAttribute("id", "sex_select");
    let opts = ["M", "K", "-"];
    for (let i=0; i<opts.length; i++)
    {
        let option = document.createElement("option");
        option.text = opts[i];
        sex_select.options.add(option, i)
    }

    p1.appendChild(sex_label)
    p1.appendChild(sex_select);
    form.appendChild(p1);

    let p2 = document.createElement("P");
    let age_label = document.createElement("TEXT");
    age_label.textContent = "Wiek: ";
    let age_input = document.createElement("INPUT");
    age_input.setAttribute("type", "text");
    age_input.setAttribute("maxlength", "2");
    age_input.setAttribute("size", "1");
    age_input.setAttribute("id", "age_input");
    age_input.setAttribute("onkeypress", "isNumber(event)");

    p2.appendChild(age_label);
    p2.appendChild(age_input);
    form.appendChild(p2);

    let p3 = document.createElement("P");
    let education_label = document.createElement("TEXT");
    education_label.textContent = "Wykształcenie muzyczne: "
    
    let p4 = document.createElement("P");
    let radio1 = document.createElement("INPUT");
    radio1.setAttribute("type", "radio");
    radio1.setAttribute("name", "education");
    radio1.setAttribute("value", "tak");
    let radio1_label = document.createElement("LABEL");
    radio1_label.textContent = "Tak";
    
    let radio2 = document.createElement("INPUT");
    radio2.setAttribute("type", "radio");
    radio2.setAttribute("name", "education");
    radio2.setAttribute("value", "nie");
    let radio2_label = document.createElement("LABEL");
    radio2_label.textContent = "Nie";
    
    let p5 = document.createElement("P");

    p3.appendChild(education_label);
    p4.appendChild(radio1);
    p4.appendChild(radio1_label);
    p5.appendChild(radio2);
    p5.appendChild(radio2_label);
    p3.appendChild(p4);
    p3.appendChild(p5)
    form.appendChild(p3);

    let next = document.createElement("BUTTON");
    next.setAttribute("onClick", "saveForm()");
    next.innerHTML = "Dalej"

    form.appendChild(next);

    let parent = document.getElementById("mainDiv");
    parent.appendChild(form);
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
        console.error("Parent not found.")
    }
    LoadColorPalette()
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
    nextButton.innerHTML = "Dalej"
    appendChild(paragraph, nextButton)
    appendChild(parent, paragraph);
}

// Color Palette setup

function LoadColorPalette() {
    var pk = new Piklor(".color-picker", [
            "#000000",
            "#7f0000",
            "#ff0000",
            "#007f00",
            "#00ff00",
            "#00007f",
            "#0000ff",
            "#ffffff"
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
};

// Helper methods
function isNumber(e) {
    var ch = String.fromCharCode(e.which);

    if(!(/[0-9]/.test(ch))) {
        e.preventDefault();
    }
}

function saveForm() {
    let sex = document.getElementById("sex_select").value;
    let age = document.getElementById("age_input").value;
    let education = document.querySelector('input[name="education"]:checked').value;
    results["personal_info"] = {"Sex": sex, "Age": age, "MusicEducation": education}
    let form = document.getElementById("form");
    form.parentNode.removeChild(form);
    initialize_subDiv()
}

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
    results_list.push({"Recording": recordings[iterator], "Color": color})
    iterator++;
    let nextbutton = document.getElementById("nextbutton");
    nextbutton.setAttribute("disabled", "true");
    
    if (iterator < recordings.length) {
        let selectedCol = document.getElementById("color-selected");
        selectedCol.removeAttribute('style');
        manipulatePicker('display', 'none');

        let recordPath = getRecordPath(recordings[iterator]);
        loadNextRecording(recordPath);
    } else {
        alert("Koniec. Dziękujemy za udział w ankiecie.")
        results["results"] = results_list;
        sendResults("Wyniki ankiety", JSON.stringify(results));
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
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ankieta.mgr.idio@gmail.com",
        Password : "0a58da0a-c0e1-4529-9851-50566171662c",
        To : 'ankieta.mgr.idio@gmail.com',
        From : "ankieta.mgr.idio@gmail.com",
        Subject : subject,
        Body : content
    }).then(
        response => {
            if (response === "OK") {
                alert("Wyniki zostały wysłane pomyślnie.\nMożna już zamknąć to okno.");
            }
        })
}
