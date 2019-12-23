const products = [];

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", { products: products, title: "Shop", path: "/shop" });
};
