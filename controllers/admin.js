const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;
  const products = new Product(title, imageUrl, price, description);
  products.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      products: products,
      title: "Admin Product",
      path: "/admin/products"
    });
  });
};
