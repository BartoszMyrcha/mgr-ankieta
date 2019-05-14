const sex_opts = ["M", "K", "-"];


function initialize_form() {
    alert("Witamy!\nAnkieta ta jest częścią pracy magisterskiej:\n\"Analiza korelacji pomiędzy brzmieniem głosu i kolorem przypisanym do mówcy\".\n\
Twoim zadaniem będzie odsłuchanie nagrań oraz przypisanie do każdego z nich po jednym kolorze z palety barw.\nProsimy aby udzielane odpowiedzi były jak najbardziej instynktowne.\n\n\
Wciśnij OK aby przejść dalej.")
    let form = document.createElement("DIV");
    form.setAttribute('id', 'form');
    form.setAttribute('align', 'center');
    
    init_sex_choice(form);
    init_age_input(form);
    init_choice("Wykształcenie muzyczne:", "education", form);
    init_choice("Zdolności plastyczne:", "artistic", form);

    let next = document.createElement("BUTTON");
    next.setAttribute("onClick", "saveForm()");
    next.innerHTML = "Dalej"

    form.appendChild(next);

    let parent = document.getElementById("mainDiv");
    parent.appendChild(form);
}

function init_sex_choice(parent) {
    let p = document.createElement("P");
    let sex_label = document.createElement("TEXT");
    sex_label.textContent = "Płeć: ";
    let sex_select = document.createElement("SELECT");
    sex_select.setAttribute("id", "sex_select");
    
    for (let i=0; i<sex_opts.length; i++)
    {
        let option = document.createElement("option");
        option.text = sex_opts[i];
        sex_select.options.add(option, i)
    }

    p.appendChild(sex_label)
    p.appendChild(sex_select);
    parent.appendChild(p);
}

function init_age_input(parent) {
    let p = document.createElement("P");
    let age_label = document.createElement("TEXT");
    age_label.textContent = "Wiek: ";
    let age_input = document.createElement("INPUT");
    age_input.setAttribute("type", "text");
    age_input.setAttribute("maxlength", "2");
    age_input.setAttribute("size", "1");
    age_input.setAttribute("id", "age_input");
    age_input.setAttribute("onkeypress", "isNumber(event)");

    p.appendChild(age_label);
    p.appendChild(age_input);
    parent.appendChild(p);
}

function init_choice(text, group_name, parent) {
    let p = document.createElement("P");
    let label = document.createElement("TEXT");
    label.textContent = text;
    
    let radio1_p = document.createElement("P");
    let radio1 = document.createElement("INPUT");
    radio1.setAttribute("type", "radio");
    radio1.setAttribute("name", group_name);
    radio1.setAttribute("value", "tak");
    let radio1_label = document.createElement("LABEL");
    radio1_label.textContent = "Tak";
    
    let radio2_p = document.createElement("P");
    let radio2 = document.createElement("INPUT");
    radio2.setAttribute("type", "radio");
    radio2.setAttribute("name", group_name);
    radio2.setAttribute("value", "nie");
    let radio2_label = document.createElement("LABEL");
    radio2_label.textContent = "Nie";

    radio1_p.appendChild(radio1);
    radio1_p.appendChild(radio1_label);
    radio2_p.appendChild(radio2);
    radio2_p.appendChild(radio2_label);
    p.appendChild(label);
    p.appendChild(radio1_p);
    p.appendChild(radio2_p);

    parent.appendChild(p);
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

function LoadColorPalette() {
    var pk = new Piklor(".color-picker", [
        "#ffd9da",
        "#ffecd9",
        "#ffffd9",
        "#f2ffd9",
        "#d9ffd9",
        "#d9f6ff",
        "#d9f2ff",
        "#d9e6ff",
        "#ffd9f2",
        "#ffd9de",
        "#ff8c8e",
        "#ffc68c",
        "#ffff8c",
        "#d7ff8c",
        "#8cff8c",
        "#8ce4ff",
        "#8cd9ff",
        "#8cb4ff",
        "#ff8cd9",
        "#ff8c9c",
        "#fe0000",
        "#ff7f00",
        "#ffff01",
        "#7cbe02",
        "#008001",
        "#436f7c",
        "#0093dd",
        "#4568a8",
        "#8a4071",
        "#c12238",
        "#c93334",
        "#ca7c32",
        "#cbcc33",
        "#6c9628",
        "#19651a",
        "#54676e",
        "#3f91b6",
        "#586e93",
        "#7b4e6b",
        "#9f424d",
        "#a3595a",
        "#a57d59",
        "#a4a559",
        "#667b43",
        "#2c522b",
        "#596163",
        "#708b9c",
        "#677284",
        "#705969",
        "#88595f",
        "#7e7e7e",
        "#7f7f7f",
        "#7f7f7f",
        "#5f5f5f",
        "#3f3f3f",
        "#5c5855",
        "#838280",
        "#767676",
        "#656565",
        "#717171"
        ],
        10,
        {
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
    let artistic = document.querySelector('input[name="artistic"]:checked').value;
    results["personal_info"] = {"Sex": sex, "Age": age, "MusicEducation": education, "ArtisticAbilities": artistic}
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
