// question 7

// Node.js Core Modules 

const fs = require("fs");
const path = require("path");
const http = require("http");

// folder-safe path
const logPath = path.join(__dirname, "logs");

// create folder if not exists
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

// write log
fs.writeFileSync(path.join(logPath, "app.log"), "App started");

// simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "running" }));
});

server.listen(5500, () => console.log("CLI HTTP Server on 5500"));
