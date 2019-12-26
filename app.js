const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./utils/database");

const rootDir = require("./utils/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "pug"); // configuring pug for express
app.set("views", "views"); // will look for view in views folder

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// sync({ force: true }) - use this when you want to overwrite the tables
sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Avadhut", email: "thorat@test.com" });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(() => app.listen(3000))
  .catch(err => {
    console.log(err);
  });
