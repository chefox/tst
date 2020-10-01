//const http = require('http');
//var fs = require('fs');
//const hostname = '0.0.0.0';
//const port = process.env.PORT || 80;


//fs.readFile('./client/index.html', function (err, html) {
//	if (err) throw err;
//const server = http.createServer((req, res) => {
//  res.statusCode = 200;
//  res.setHeader('Content-Type', 'text/html');
//  res.write(html);
//  res.end();
//});

//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});
//});

const express = require("express");

const app = express();

const jsonParser = express.json();

app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);

    response.json(request.body);
});

app.get("/", function(request, response){

    response.sendFile("client/index.html");
});
