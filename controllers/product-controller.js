const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const products = new Product(req.body.title);
  products.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll(products => {
    res.render("shop", { products: products, title: "Shop", path: "/shop" });
  });
};
