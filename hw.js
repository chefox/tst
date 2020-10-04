const express = require("express");

var path = require("path");

const app = express();

const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'client')));

app.post("/", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);

    response.json(request.body);
});

app.get("/", function(request, response){

    response.render("index.html");
});

app.listen(process.env.PORT || 80);
