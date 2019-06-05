const sex_opts = ["M", "K", "-"];

function initialize_intro() {
    var intro = document.createElement("DIV");
    intro.setAttribute('id', 'intro');
    intro.setAttribute('align', 'center');

    var header_p = document.createElement("P");
    header_p.innerText = "Witamy!\nAnkieta ta jest częścią pracy magisterskiej:\n\"Analiza korelacji pomiędzy brzmieniem głosu i kolorem przypisanym do mówcy\".\n\n\
    Twoim zadaniem będzie odsłuchanie nagrań oraz przypisanie do każdego z nich po jednym kolorze z palety barw.\nProsimy aby udzielane odpowiedzi były jak najbardziej instynktowne."

    var tutorial_p = document.createElement("P");
    var tutorial = document.createElement("IMG");
    tutorial.setAttribute("src", "assets/tutorial.gif");
    tutorial.setAttribute("id", "tutorial");
    tutorial_p.appendChild(tutorial);

    var test_button_p = document.createElement("P");
    var test_info = document.createElement("P");
    test_info.innerText = "Wciskając przycisk z ikoną głośnika można sprawdzić poprawność podłączenia głośników. Jeśli po jego przyciśnięciu słychać dźwięk - można przejść dalej.\n\n"
    var test_button = document.createElement("BUTTON");
    test_button.setAttribute("id", "speaker-icon");
    test_button.setAttribute("onClick", "playTestSound()");
    test_button_p.appendChild(test_info);
    test_button_p.appendChild(test_button);

    var next_button_p = document.createElement("P");
    var next_button = document.createElement("BUTTON");
    next_button.setAttribute("onClick", "introExit()");
    next_button.innerHTML = "Przejdź do ankiety";
    next_button_p.appendChild(next_button); 

    intro.appendChild(header_p)
    intro.appendChild(tutorial_p);
    intro.appendChild(test_button_p);
    intro.appendChild(next_button_p);
    
    var parent = document.getElementById("mainDiv");
    parent.appendChild(intro);
}

function playTestSound() {
    var snd = new Audio("nagrania/test.wav");
    console.log("Playing");
    snd.play();
}

function introExit() {
    var intro = document.getElementById("intro");
    intro.parentNode.removeChild(intro);
    initialize_form()
}

function initialize_form() {
    var form = document.createElement("DIV");
    form.setAttribute('id', 'form');
    form.setAttribute('align', 'center');
    
    init_sex_choice(form);
    init_age_input(form);
    init_choice("Wykształcenie muzyczne:", "education", form);
    init_choice("Czy masz problemy z postrzeganiem kolorów:", "colorblind", form);

    var next = document.createElement("BUTTON");
    next.setAttribute("onClick", "saveForm()");
    next.innerHTML = "Dalej"

    form.appendChild(next);

    var parent = document.getElementById("mainDiv");
    parent.appendChild(form);
}

function init_sex_choice(parent) {
    var p = document.createElement("P");
    var sex_label = document.createElement("TEXT");
    sex_label.textContent = "Płeć: ";
    var sex_select = document.createElement("SELECT");
    sex_select.setAttribute("id", "sex_select");
    
    for (var i=0; i<sex_opts.length; i++)
    {
        var option = document.createElement("option");
        option.text = sex_opts[i];
        sex_select.options.add(option, i)
    }

    p.appendChild(sex_label)
    p.appendChild(sex_select);
    parent.appendChild(p);
}

function init_age_input(parent) {
    var p = document.createElement("P");
    var age_label = document.createElement("TEXT");
    age_label.textContent = "Wiek: ";
    var age_input = document.createElement("INPUT");
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
    var p = document.createElement("P");
    var label = document.createElement("TEXT");
    label.textContent = text;
    
    var radio1_p = document.createElement("P");
    var radio1 = document.createElement("INPUT");
    radio1.setAttribute("type", "radio");
    radio1.setAttribute("name", group_name);
    radio1.setAttribute("value", "tak");
    var radio1_label = document.createElement("LABEL");
    radio1_label.textContent = "Tak";
    
    var radio2_p = document.createElement("P");
    var radio2 = document.createElement("INPUT");
    radio2.setAttribute("type", "radio");
    radio2.setAttribute("name", group_name);
    radio2.setAttribute("value", "nie");
    var radio2_label = document.createElement("LABEL");
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
    var div = document.createElement("div");
    div.setAttribute('id', 'subDiv')
    div.setAttribute('align', 'center');

    var recordPath = getRecordPath(recordings[iterator]);

    insertAudioPlayer(div, recordPath)
    insertColorPalette(div);
    insertNextButton(div)

    var parent = document.getElementById("mainDiv")
    if (parent != null) {
        parent.appendChild(div);   
    } else {
        console.error("Parent not found.")
    }
    LoadColorPalette()
}

function insertAudioPlayer(parent, audioPath) {
    console.log(audioPath);
    var player = document.createElement("audioPlayer");
    player.innerHTML = "<audio controls id=\"player\" onended=\"manipulatePicker('display', 'block')\">\
                        <source id=\"playerSource\" src=\"" + audioPath + "\" type=\"audio/wav\">\
                        Your browser does not support the audio element.\
                        </audio>";
    appendChild(parent, player);
}

function loadNextRecording(audioPath) {
    var playerSource = document.getElementById("playerSource");
    var player = document.getElementById("player")
    playerSource.src = audioPath;
    player.load()
}

function insertColorPalette(parent) {
    var palette = document.createElement("colorPalette");
    palette.innerHTML = "<div class=\"picker-wrapper\" id=\"picker-wrapper\" hidden>\
                            <button class=\"btn btn-default\">Wybierz kolor</button>\
                            <div class=\"color-picker\"></div>\
                            <div id=\"color-selected\" class=\"color-selected\"></div>\
                            <input type=\"text\" disabled=\"true\" id=\"picker-text\" class=\"picker-text\" hidden>\
                        </div>";
    appendChild(parent, palette);
}

function insertNextButton(parent) {
    var paragraph = document.createElement("P")
    var nextButton = document.createElement("BUTTON");
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
        var nextButton = document.getElementById("nextbutton")
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
    var sex = document.getElementById("sex_select").value;
    var age = document.getElementById("age_input").value;
    var education = document.querySelector('input[name="education"]:checked').value;
    var colorblind = document.querySelector('input[name="colorblind"]:checked').value;
    results["personal_info"] = {"Sex": sex, "Age": age, "MusicEducation": education, "ColorBlind": colorblind}
    var form = document.getElementById("form");
    form.parentNode.removeChild(form);
    initialize_subDiv()
}

function shuffle(array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

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
    var textBox = document.getElementById("picker-text");
    var color = textBox.value;
    results_list.push({"Recording": recordings[iterator], "Color": color})
    iterator++;
    var nextbutton = document.getElementById("nextbutton");
    nextbutton.setAttribute("disabled", "true");
    
    if (iterator < questions) {
        var selectedCol = document.getElementById("color-selected");
        selectedCol.removeAttribute('style');
        manipulatePicker('display', 'none');

        var recordPath = getRecordPath(recordings[iterator]);
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
    catch (e){
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
    }).then(function (response) {
        if (response === "OK") {
            alert("Wyniki zostały wysłane pomyślnie.\nMożna już zamknąć to okno.");
        }
    });
}
