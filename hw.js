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
locations["ulita_komn"] = require("./locations/ulita_komn.json");
locations["dom_spatenki"] = require("./locations/dom_spatenki.json");
locations["dom_topchan_son"] = require("./locations/dom_topchan_son.json");
locations["dom_spok_son"] = require("./locations/dom_spok_son.json");
locations["dom_utro"] = require("./locations/dom_utro.json");
locations["ending_electrichka"] = require("./locations/ending_electrichka.json");
locations["dom_spalna_son"] = require("./locations/dom_spalna_son.json");
locations["dom_borsh_son"] = require("./locations/dom_borsh_son.json");
locations["dom_borsh_son_zai"] = require("./locations/dom_borsh_son_zai.json");
locations["dom_borsh_zai_exit"] = require("./locations/dom_borsh_zai_exit.json");
locations["dom_spalna_noch"] = require("./locations/dom_spalna_noch.json");
locations["dom_spalna_light"] = require("./locations/dom_spalna_light.json");
locations["noch_na_progulku"] = require("./locations/noch_na_progulku.json");
locations["noch_to_kolodetz"] = require("./locations/noch_to_kolodetz.json");
locations["progulka_ending"] = require("./locations/progulka_ending.json");
locations["noch_mimo_kolodza"] = require("./locations/noch_mimo_kolodza.json");
locations["noch_kolodetz_to_dom"] = require("./locations/noch_kolodetz_to_dom.json");
locations["noch_transformator_enter"] = require("./locations/noch_transformator_enter.json");
locations["noch_transformator_smert"] = require("./locations/noch_transformator_smert.json");


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

app.listen(process.env.PORT || 89);
