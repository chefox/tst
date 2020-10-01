const http = require('http');
var fs = require('fs');
const hostname = '0.0.0.0';
const port = process.env.PORT || 80;


fs.readFile('./client/index.html', function (err, html) {
	if (err) throw err;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(html);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
});
