const http = require("http");

const listener = (request, response) => {
  response.writeHead(200);
  response.end("Hello, World!");
};

const server = http.createServer(listener);
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Server started at http://${host}:${port}`);
