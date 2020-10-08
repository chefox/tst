let currentLocation = "start";
let audio;
let linkSound = new Audio("sound/click.mp3");
let blockSound = new Audio("sound/page.mp3");
let need_quit = false;
let have_ulita_key = false;
let son_have_kastrula = false;
let kastrula_had_spoken = false;
let spotlightSize = 'transparent 0%, rgba(255, 219, 87, 0.7) 1%, rgba(255, 30, 0, 0.4) 1.1%, rgba(215, 100, 0, 0.2) 1.2%, transparent 8%, rgba(0, 0, 0, 0.6) 35%'

window.addEventListener("load", () => {

    const spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', e => updateSpotlight(e));

    function updateSpotlight(e) {

        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;
    }
});


window.onload = function () {
    window.scrollTo(0,0);
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
        if (resp.music) {
            if (audio) audio.pause();
            audio = new Audio(resp.music);
            audio.play();
        }
        if (resp.spotlight){
            spotlightSize=resp.spotlight;
        }
        if (resp.bgcolor){
            document.body.style.background=resp.bgcolor;
        }
        document.getElementById("content").style.backgroundImage = "url("+resp.background+")";
        document.getElementById("content").innerHTML = (resp.text);
        window.scrollTo(0,0);
        loadLinks();
        loadBlocks();
    });
    request.send(requestBody);
}

