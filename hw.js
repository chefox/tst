const express = require("express");
var path = require("path");

var locations = {};
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
locations["noch_mimo_kolodza"] = require("./locations/noch_mimo_kolodza.json");
locations["progulka_ending"] = require("./locations/progulka_ending.json");
locations["noch_kolodetz_to_dom"] = require("./locations/noch_kolodetz_to_dom.json");
locations["dom_from_kolodetz"] = require("./locations/dom_from_kolodetz.json");
locations["dom_from_kolodetz_3doors"] = require("./locations/dom_from_kolodetz_3doors.json");
locations["dom_from_kolodetz_spalna"] = require("./locations/dom_from_kolodetz_spalna.json");
locations["dom_from_kolodetz_podval"] = require("./locations/dom_from_kolodetz_podval.json");
locations["podz_galerea"] = require("./locations/podz_galerea.json");
locations["ritual"] = require("./locations/ritual.json");
locations["ritual_prodolj"] = require("./locations/ritual_prodolj.json");
locations["ritual_ending"] = require("./locations/ritual_ending.json");
locations["ritual_begstvo"] = require("./locations/ritual_begstvo.json");
locations["rbegstvo_galerea"] = require("./locations/rbegstvo_galerea.json");
locations["rbegstvo_dom"] = require("./locations/rbegstvo_dom.json");
locations["rbegstvo_ulitsa"] = require("./locations/rbegstvo_ulitsa.json");
locations["rbegstvo_ending"] = require("./locations/rbegstvo_ending.json");
locations["noch_transformator_enter"] = require("./locations/noch_transformator_enter.json");
locations["noch_transformator_smert"] = require("./locations/noch_transformator_smert.json");
locations["borsh_son_outside"] = require("./locations/borsh_son_outside.json");
locations["son_ab1"] = require("./locations/son_ab1.json");
locations["son_ab2"] = require("./locations/son_ab2.json");
locations["son_ab3"] = require("./locations/son_ab3.json");
locations["son_ab4"] = require("./locations/son_ab4.json");
locations["son_ab5"] = require("./locations/son_ab5.json");
locations["son_ab6"] = require("./locations/son_ab6.json");
locations["son_na_gorbu_k_ulite"] = require("./locations/son_na_gorbu_k_ulite.json");
locations["son_ab7"] = require("./locations/son_ab7.json");
locations["son_ab8"] = require("./locations/son_ab8.json");
// locations["son_ab9"] = require("./locations/son_ab9.json");
locations["dom_borsh_son_return1"] = require("./locations/dom_borsh_son_return1.json");
locations["dom_borsh_son_return2"] = require("./locations/dom_borsh_son_return2.json");
locations["dom_borsh_son_return3"] = require("./locations/dom_borsh_son_return3.json");
locations["dom_borsh_son_return4"] = require("./locations/dom_borsh_son_return4.json");
locations["son_back_to_house"] = require("./locations/son_back_to_house.json");
locations["dom_borsh_son_resume"] = require("./locations/dom_borsh_son_resume.json");
locations["son_son_k_ulite"] = require("./locations/son_son_k_ulite.json");
locations["son_s_borshom_k_ulite"] = require("./locations/son_s_borshom_k_ulite.json");


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
