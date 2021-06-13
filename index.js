const http = require("http");
const html_generator = require("./html_generator");

const listItems = [];

const listener = (request, response) => {
  if (request.method === "GET") {
    if (request.url === "/notes") {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
      };
      response.writeHead(200, headers, { "Content-Type": "application/json" });
      response.end(JSON.stringify(listItems));
    } else if (request.url === "/") {
      const html = html_generator.get_html(listItems);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(html);
    }
  } else if (request.method === "POST") {
    if (request.url === "/add_note") {
      let body = "";
      request.on("data", function (data) {
        body = data.toString();
      });
      request.on("end", function () {
        listItems.push(body);
        console.log(listItems);
      });
    }
  }
};

const server = http.createServer(listener);
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Server started at http://${host}:${port}`);
