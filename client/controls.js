let currentLocation = "start";
let music;
let audio;
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

    function updateSpotlight(e) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
    }
});


window.onload = function () {
    document.documentElement.style.setProperty('--cursor', 'url(img/cursor_day.png)')
    window.scrollTo(0, 0);
    if (detectMob()) spotlight.style.display = "none";
    loadLinks();
}

function loadLinks() {
    var listOfLinks = document.getElementsByClassName("link");
    [].forEach.call(listOfLinks, el => {

        el.addEventListener("click", function (e) {
            e.preventDefault();
            let reqest = JSON.stringify(
                {
                    have_ulita_key: have_ulita_key,
                    son_have_kastrula: son_have_kastrula,
                    kastrula_had_spoken: kastrula_had_spoken,
                    goTo: e.target.id
                }
            );
            sendRequest(reqest);
            linkSound.play()
        });
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
                audio.play();
            }
        }
        if (resp.cursor) document.documentElement.style.setProperty('--cursor', resp.cursor)
        if (resp.spotlight != spotlightSize) spotlightSize = resp.spotlight;
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
        /Windows Phone/i
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

