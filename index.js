const http = require("http");
const html_generator = require("./html_generator");

const listener = (request, response) => {
  const html = html_generator.get_html();
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(html);
};

const server = http.createServer(listener);
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Server started at http://${host}:${port}`);
