let current="start";
let goTo;

window.onload = function () {
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();

        let registerForm = document.forms["sendTest"];
        let testData = registerForm.elements["test"].value;
        let test = JSON.stringify(
            {current: current, goTo: testData}
        );
        sendRequest(test);
    });
}

function loadLinks() {
    var listOfLinks=document.getElementsByClassName("link");
    [].forEach.call(listOfLinks, el => {

        el.addEventListener("click", function (e) {
            e.preventDefault();
            let test = JSON.stringify(
                {current: current, goTo: e.target.id}
            );
            sendRequest(test);
        });
    })
}

function sendRequest(requestBody) {
    let request = new XMLHttpRequest();
    request.open("POST", "/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let resp = JSON.parse(request.response);

        current = resp.current;
        document.getElementById("myspan").innerHTML = (resp.text);
        loadLinks();
    });
    request.send(requestBody);
}

