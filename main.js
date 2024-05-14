const API = "https://raw.githubusercontent.com/fahimmurshed14/hello-in-many-languages-JSON/master/hello.json";
let currentGreeting = document.getElementById("current-greeting");
let currentLang = document.getElementById("current-lang");

//change display info
function changeInfo(newInfo) {

    document.getElementById("current-greeting").innerHTML = newInfo["hello"] + "!";
    document.getElementById("current-lang").innerHTML = newInfo["language"];
}

//change to random language on button click
function randomLang() {

    //fetch data
    fetch(API)
    .then((response) => { return response.json(); })
    .then((data) => { 

        console.log(data);
        let keys = Object.keys(data);

        //pick random language
        let length = keys.length;
        let randIndex = Math.floor(Math.random()*length);
        let randKey = keys[randIndex]
        let newInfo = data[randKey];
        console.log(newInfo);

        //change display info
        changeInfo(newInfo);
    
    })
    .catch(error => { console.error(error); });
}

//search for a language
function searchLang() {

    //get user input
    let userInput = document.getElementById("search-bar").value;
    console.log("user input: " + userInput);

    //fetch data
    fetch(API)
    .then((response) => { return response.json(); })
    .then((data) => { 

        console.log(data);
        let keys = Object.keys(data);
        let length = keys.length;

        //find language
        let key = 0;
        let foundLang = false;

        for (let i = 0; i < length; i++) {
            let currentKey = keys[key];
            let current = data[currentKey]["language"];
            if (userInput.toLowerCase() == current.toLowerCase()) {
                console.log(userInput + " = " + current);
                foundLang = true;
                break;
            }
            key++;
        }

        //change display info
        if (foundLang) {
            let newKey = keys[key]
            let newInfo = data[newKey];
            changeInfo(newInfo);
        } else {
            console.log("no match found for " + userInput);
        }
    
    })
    .catch(error => { console.error(error); });

}