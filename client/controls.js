document.getElementById("submit").addEventListener("click", function (e) {
             e.preventDefault();
            
            let registerForm = document.forms["sendTest"];
            let testData = registerForm.elements["test"].value;
            let test = JSON.stringify({testData: testData});
            let request = new XMLHttpRequest();
             request.open("POST", "/user", true);   
             request.setRequestHeader("Content-Type", "application/json");
             request.addEventListener("load", function () {
                 let resp = JSON.parse(request.response);
                 document.getElementById("myspan").textContent=(resp.testData+" recieved");
             });
             request.send(user);
         });
