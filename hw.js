const express = require("express");
var path = require("path");

var locations={};
locations["intro"] = require("./locations/intro.json");
locations["way_from_station"] = require("./locations/way_from_station.json");
locations["snt_intro"] = require("./locations/snt_intro.json");
locations["uchastok_entry"] = require("./locations/uchastok_entry.json");
locations["uch_pod_kryltso"] = require("./locations/uch_pod_kryltso.json");
locations["uch_posmotret"] = require("./locations/uch_posmotret.json");
locations["dom_osmotr"] = require("./locations/dom_osmotr.json");


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
