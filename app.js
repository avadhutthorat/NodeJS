const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
/*  Vanilla node js style
const http = require("http");
const routes = require("./routes");
const server = http.createServer(routes.requestHandler);
server.listen(3000); 
*/
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouter);
app.use(shopRouter);

app.listen(3000);
