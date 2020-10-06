const express = require("express");
var path = require("path");

var locations={};
locations["start"] = require("./locations/start.json");
locations["test1"] = require("./locations/test1.json");
locations["test2"] = require("./locations/test2.json");


const app = express();

const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'locations')));

app.post("/", jsonParser, function (request, response) {
    console.log(request.body);
    if (!request.body) return response.sendStatus(400);

    response.json(locations[request.body.goTo]);
});

app.get("/", function (request, response) {

    response.render("index.html");
});

app.listen(process.env.PORT || 80);
