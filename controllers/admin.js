const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

// get values for editing of product
exports.editProduct = (req, res, next) => {
  let { productId } = req.params;
  Product.findByPk(productId)
    .then(product => {
      res.render("admin/edit-product", {
        title: "Edit Product",
        path: "/admin/products",
        product: product
      });
    })
    .catch(err => res.redirect("/"));
};

// Add product
exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(() => res.redirect("/"))
    .catch(err => console.log(`Error while post data to database - ${err}`));
};

// save edited product
exports.postEditProduct = (req, res, next) => {
  console.log(req.body);
  let { title, imageUrl, price, description, productId } = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(response => res.redirect("/admin/products"))
    .catch(err => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        products: products,
        title: "Admin Product",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

// delete product
exports.deleteProduct = (req, res, next) => {
  let { productId } = req.params;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};
