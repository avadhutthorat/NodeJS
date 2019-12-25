const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./utils/database");

const rootDir = require("./utils/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "pug"); // configuring pug for express
app.set("views", "views"); // will look for view in views folder

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

db.execute("SELECT * FROM products")
  .then(result => {
    const data = result[0];
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

app.listen(3000);
