const http = require("http");
const html_generator = require("./html_generator");

const listItems = [];

const listener = (request, response) => {
  if (request.url === "/add_note" && request.method === "POST") {
    let body = "";
    request.on("data", function (data) {
      body = data.toString();
    });
    request.on("end", function () {
      listItems.push(body);
      console.log(listItems);
    });
  } else if (request.url === "/" && request.method === "GET") {
    const html = html_generator.get_html();
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  }
};

const server = http.createServer(listener);
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Server started at http://${host}:${port}`);
