let currentLocation = "start";
let currentBlock = 0;
let audio;


window.onload = function () {
    loadLinks();
}

function loadLinks() {
    var listOfLinks = document.getElementsByClassName("link");
    [].forEach.call(listOfLinks, el => {

        el.addEventListener("click", function (e) {
            e.preventDefault();
            let test = JSON.stringify(
                {current: currentLocation, goTo: e.target.id}
            );
            sendRequest(test);
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
        if(resp.music){
            if(audio) audio.pause();
            audio = new Audio(resp.music);
            audio.play();
        }
        document.getElementById("content").style.backgroundImage="url("+resp.background+")";
        document.getElementById("content").innerHTML = (resp.text);
        loadLinks();
        loadBlocks();
    });
    request.send(requestBody);
}

