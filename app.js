const http = require("http");

const routes = require("./routes");

console.log(routes.printText);

const server = http.createServer(routes.reqHandler);

server.listen(3000);
