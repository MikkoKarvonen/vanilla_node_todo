const http = require("http");
const fs = require("fs").promises;

const { fileFetcher, updateFile } = require("./file_helper");

console.log("fileFetcher", fileFetcher());

const listItems = fileFetcher();

const listener = (request, response) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000,
  };
  if (request.method === "GET") {
    if (request.url === "/notes") {
      response.writeHead(200, headers, { "Content-Type": "application/json" });
      response.end(JSON.stringify(listItems));
    } else if (request.url === "/") {
      fs.readFile(__dirname + "/index.html").then((contents) => {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.end(contents);
      });
    } else if (request.url === "/styles.css") {
      fs.readFile(__dirname + "/styles.css").then((contents) => {
        response.setHeader("Content-Type", "text/css");
        response.writeHead(200);
        response.end(contents);
      });
    } else if (request.url === "/scripts.js") {
      fs.readFile(__dirname + "/scripts.js").then((contents) => {
        response.setHeader("Content-Type", "text/js");
        response.writeHead(200);
        response.end(contents);
      });
    }
  } else if (request.method === "POST") {
    if (request.url === "/add_note") {
      let body = "";
      request.on("data", function (data) {
        body += data;
      });
      request.on("end", function () {
        listItems.push(JSON.parse(body));
        updateFile(listItems);
        response.writeHead(200, headers, { "Content-Type": "text/html" });
        response.end("Note received");
      });
    } else if (request.url === "/edit_note") {
      let body = "";
      request.on("data", function (data) {
        body += data;
      });
      request.on("end", function () {
        let element = listItems.find((item) => item.date == body);
        element.done = !element.done;
        updateFile(listItems);
        response.writeHead(200, headers, { "Content-Type": "text/html" });
        response.end("Note edited");
      });
    } else if (request.url === "/remove_note") {
      let body = "";
      request.on("data", function (data) {
        body += data;
      });
      request.on("end", function () {
        const index = listItems.findIndex((item) => item.date == body);
        if (index > -1) listItems.splice(index, 1);
        updateFile(listItems);
        response.writeHead(200, headers, { "Content-Type": "text/html" });
        response.end("Note removed");
      });
    }
  }
};

const server = http.createServer(listener);
const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Server started at http://${host}:${port}`);