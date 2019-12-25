const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

//edit product
exports.editProduct = (req, res, next) => {
  let { productId } = req.params;
  Product.getProductById(productId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      title: "Edit Product",
      path: "/admin/products",
      product: product
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;
  const products = new Product(title, imageUrl, price, description);
  products.save();
  res.redirect("/");
};

// save edited product
exports.postEditProduct = (req, res, next) => {
  console.log(req.body);
  let { title, imageUrl, price, description, productId } = req.body;
  const editedProduct = new Product(
    title,
    imageUrl,
    price,
    description,
    productId
  );
  editedProduct.save();
  res.redirect("/admin/products");
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

// delete product
exports.deleteProduct = (req, res, next) => {
  let { productId } = req.params;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};
