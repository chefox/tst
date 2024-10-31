let currentLocation = "start";
let music;
let audio;
let effectsLevel = 1;
let spotlightOn = 1;
let linkSound = new Audio("sound/click.mp3");
let blockSound = new Audio("sound/page.mp3");
let need_quit = false;
let have_ulita_key = false;
let son_have_kastrula = false;
let kastrula_had_spoken = false;
let spotlightSize = 'transparent 0%, rgba(220, 195, 100, 0.7) 1%, rgba(220, 185, 70, 0.4) 1.2%, rgba(225, 220, 95, 0.2) 1.4%, transparent 8%, rgba(0, 0, 0, 0.6) 35%';
let spotlight;

window.addEventListener("load", () => {
    spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', e => updateSpotlight(e));
});


window.onload = function () {
    document.documentElement.style.setProperty('--cursor', 'url(img/cursor_day.png)')
    window.scrollTo(0, 0);
    if (detectMob()) spotlight.style.display = "none";


    document.querySelector('#sound').addEventListener("click", function(e){
        if(effectsLevel!=0){
            effectsLevel=0;
            if(audio!==undefined){
                audio.volume=effectsLevel
            }
            e.target.style.textDecoration="line-through"
        }
        else{
            effectsLevel=1;
            if(audio!==undefined){
                audio.volume=effectsLevel
            }
            e.target.style.textDecoration="none"
        }
    }
    )
    
    document.querySelector('#spotlight').addEventListener("click", function(e){
        if(spotlightOn!=0){
            spotlightOn=0;
            spotlight.style.display = "none"
            e.target.style.textDecoration="line-through"
            document.querySelector('.background').style.setProperty('cursor', 'default')
        }
        else{
            spotlightOn=1;
            spotlight.style.display = "inherit"
            e.target.style.textDecoration="none"
            document.querySelector('.background').style.setProperty('cursor', 'none')
        }
    }
    )

    loadLinks();
}

function updateSpotlight(e) {
    let bgImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize})`;
    spotlight.style.backgroundImage = bgImage;
}

function loadLinks() {
    var listOfLinks = document.getElementsByClassName("link");
    [].forEach.call(listOfLinks, el => {

        el.addEventListener("click", function (e) {
            e.preventDefault();

            if(e.target.id!="sound" && e.target.id!="spotlight"){
            let reqest = JSON.stringify(
                {
                    have_ulita_key: have_ulita_key,
                    son_have_kastrula: son_have_kastrula,
                    kastrula_had_spoken: kastrula_had_spoken,
                    goTo: e.target.id
                }
            );
            sendRequest(reqest);
            linkSound.volume=effectsLevel;
            linkSound.play()

            }
        }
        );
    })
}





function loadBlocks() {
    var listOfBlocks = document.getElementsByClassName("block");
    if (listOfBlocks.length > 0) {
        listOfBlocks[0].style.display = "block";
        [].forEach.call(listOfBlocks, el => {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                var nextBlock = document.getElementById(+e.target.id + 1);
                if (nextBlock) {
                    e.target.style.display = "none";
                    nextBlock.style.display = "block";
                    blockSound.volume=effectsLevel;
                    blockSound.play();
                    if (nextBlock.contains(nextBlock.getElementsByClassName("dialog")[0])) {
                        document.getElementById("content").style.backgroundImage = "url(img/" + nextBlock.getElementsByClassName("dialog")[0].id + ".jpg)";
                    }
                }
            });
        })
    }
}

function sendRequest(requestBody) {
    let request = new XMLHttpRequest();
    request.open("POST", "/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let resp = JSON.parse(request.response);

        current = resp.current;
        if (resp.music && music != resp.music) {
            music = resp.music;
            if (audio) audio.pause();
            if (music != "nomusic") {
                audio = new Audio(music);
                audio.volume=effectsLevel;
                audio.play();
            }
        }
        if (resp.cursor) document.documentElement.style.setProperty('--cursor', resp.cursor)
        console.log(resp.spotlight != spotlightSize);
        if (resp.spotlight != spotlightSize) spotlightSize = resp.spotlight;
        console.log(spotlightSize);
        if (resp.bgcolor != document.body.style.background) document.body.style.background = resp.bgcolor;
        if (resp.have_ulita_key) have_ulita_key = resp.have_ulita_key;
        if (resp.son_have_kastrula) son_have_kastrula = resp.son_have_kastrula;
        if (resp.kastrula_had_spoken) kastrula_had_spoken = resp.kastrula_had_spoken;

        document.getElementById("content").style.backgroundImage = "url(" + resp.background + ")";
        document.getElementById("content").innerHTML = (resp.text);
        window.scrollTo(0, 0);
        loadLinks();
        invertColours(resp.invertText)
        selectBlock();
        loadBlocks();
        dispatchEvent(new Event('mousemove'));
    });
    request.send(requestBody);
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function invertColours(invert) {
    if (invert) {
        document.querySelector(".content").style.color = 'rgb(234, 233, 237)';
        [].forEach.call(document.getElementsByTagName("a"), el => {
            el.style.color = 'rgb(200, 100, 100)';
        });
    } else {
        document.querySelector(".content").style.color = 'rgb(41, 27, 25)';
        [].forEach.call(document.getElementsByTagName("a"), el => {
            el.style.color = 'rgb(100, 0, 0)';
        });
    }
}

function selectBlock() {
    let have_ulita_keyFound = document.getElementsByName("have_ulita_key")[0];
    let son_have_kastrulaFound = document.getElementsByName("son_have_kastrula")[0];
    let kastrula_had_spokenFound = document.getElementsByName("kastrula_had_spoken")[0];
    let dom_son_resumeFound = document.getElementsByName("dom_son_resume")[0];
    let dom_son_smertFound = document.getElementsByName("dom_son_smert")[0];
    let dom_borsh_son_podvalFound = document.getElementsByName("dom_borsh_son_podval")[0];
    if (have_ulita_keyFound) {
        if (have_ulita_key) document.getElementsByName("dont_have_ulita_key")[0].remove();
        else have_ulita_keyFound.remove();
    }
    if (son_have_kastrula) {
        if (kastrula_had_spoken) {
            if (dom_son_smertFound && dom_son_resumeFound) {
                document.getElementsByName("dom_son_resume")[0].remove();
                document.getElementsByName("dom_son_smert")[0].remove();
            }
        } else {
            if (dom_son_resumeFound && dom_borsh_son_podvalFound) {
                document.getElementsByName("dom_borsh_son_podval")[0].remove();
                document.getElementsByName("dom_son_smert")[0].remove();
            }
        }
    } else {
        if (dom_son_resumeFound && dom_son_smertFound) {
            document.getElementsByName("dom_son_resume")[0].remove();
            document.getElementsByName("dom_son_smert")[0].remove();
        }
    }
}

// Helper function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Helper function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Helper function to delete a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// Function to save the game status in a cookie
function saveGame() {
    // Capture game status
    const gameStatus = {
        currentLocation,
        effectsLevel,
        spotlightOn,
        need_quit,
        have_ulita_key,
        son_have_kastrula,
        kastrula_had_spoken,
        spotlightSize,
        have_ulita_keyFound: have_ulita_keyFound.checked,
        son_have_kastrulaFound: son_have_kastrulaFound.checked,
        kastrula_had_spokenFound: kastrula_had_spokenFound.checked,
        dom_son_resumeFound: dom_son_resumeFound.checked,
        dom_son_smertFound: dom_son_smertFound.checked,
        dom_borsh_son_podvalFound: dom_borsh_son_podvalFound.checked
    };

    // Save as JSON string in a cookie
    setCookie("gameStatus", JSON.stringify(gameStatus), 7); // Save for 7 days
    document.getElementById("gameStatus").innerText = "Game status saved!";
}

// Function to load the game status from a cookie
function loadGame() {
    const savedGameStatus = getCookie("gameStatus");
    if (savedGameStatus) {
        const gameStatus = JSON.parse(savedGameStatus);

        // Restore game status variables
        currentLocation = gameStatus.currentLocation;
        effectsLevel = gameStatus.effectsLevel;
        spotlightOn = gameStatus.spotlightOn;
        need_quit = gameStatus.need_quit;
        have_ulita_key = gameStatus.have_ulita_key;
        son_have_kastrula = gameStatus.son_have_kastrula;
        kastrula_had_spoken = gameStatus.kastrula_had_spoken;
        spotlightSize = gameStatus.spotlightSize;

        // Restore DOM element values
        have_ulita_keyFound.checked = gameStatus.have_ulita_keyFound;
        son_have_kastrulaFound.checked = gameStatus.son_have_kastrulaFound;
        kastrula_had_spokenFound.checked = gameStatus.kastrula_had_spokenFound;
        dom_son_resumeFound.checked = gameStatus.dom_son_resumeFound;
        dom_son_smertFound.checked = gameStatus.dom_son_smertFound;
        dom_borsh_son_podvalFound.checked = gameStatus.dom_borsh_son_podvalFound;

        document.getElementById("gameStatus").innerText = 
            `Game loaded! Location: ${currentLocation}, Effects Level: ${effectsLevel}, Spotlight On: ${spotlightOn}`;
    } else {
        document.getElementById("gameStatus").innerText = "No saved game status found!";
    }
}

// Function to clear the game status cookie
function clearGame() {
    eraseCookie("gameStatus");
    document.getElementById("gameStatus").innerText = "Game status cleared!";
}
