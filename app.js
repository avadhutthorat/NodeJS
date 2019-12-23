const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rootDir = require("./utils/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.set("view engine", "pug"); // configuring pug for express
app.set("views", "views"); // will look for view in views folder

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
