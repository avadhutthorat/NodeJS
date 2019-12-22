const express = require("express");
const bodyParser = require("body-parser");

/*  Vanilla node js style
const http = require("http");
const routes = require("./routes");
const server = http.createServer(routes.requestHandler);
server.listen(3000); 
*/
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

/* one of the way app.use() can be used
app.use((req, res, next) => {
  console.log("In the middleware!!");
  next(); // allows the request to continue to next middleware in line
});
*/

app.use("/add-product", (req, res, next) => {
  res.send(
    "<body><form action='/product' method='POST'><input type='text' name='title'></input><button type='submit'>Add Product</button></form></body>"
  );
});

// you can use app.get , app.post, app.delete, app.use, app.patch for the specific methods
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1> Hello from Express Js !!!</h1>");
});

app.listen(3000);
