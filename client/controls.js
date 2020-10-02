var toGet = "start";
var current = "test";

window.onload = function() {
	document.getElementById("submit").addEventListener("click", function (e) {
             e.preventDefault();
            
            let registerForm = document.forms["sendTest"];
            let testData = registerForm.elements["test"].value;
            let test = JSON.stringify({
		    get: testData,
	    	current: "test"
	    });
            let request = new XMLHttpRequest();
             request.open("POST", "/", true);   
             request.setRequestHeader("Content-Type", "application/json");
             request.addEventListener("load", function () {
                 let resp = JSON.parse(request.response);
		     toGet=resp.next;
		     current=resp.current;
                 document.getElementById("myspan").textContent=(resp.text);
             });
             request.send(test);
         });

	document.getElementByClass("link").addEventListener("click", function (e) {
	    let clickLink = JSON.stringify(
		{
			get: e.target.id,
			current: current
		}
	    );
	});

}

