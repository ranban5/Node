//const log = require("./logger");
//log("Message");

//const path = require("path");

//let pathObj = path.parse(__filename);

//console.log(pathObj);

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api/account") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

//console.log(server);
