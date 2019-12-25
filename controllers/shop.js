const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      products: products,
      title: "Products",
      path: "/products"
    });
  });
};

// get product details
exports.getProductDetails = (req, res, next) => {
  let { productId } = req.params;
  Product.getProductById(productId, product => {
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      title: product.title
    });
  });
};

//products router
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      products: products,
      title: "Shop",
      path: "/index"
    });
  });
};

// cart router
exports.cart = (req, res, next) => {
  res.render("shop/cart", { title: "My Cart" });
};

// Adding product to cart
exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.getProductById(id, product => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.orders = (req, res, next) => {
  res.render("shop/orders", { title: "My Orders" });
};

// checkout router
exports.checkout = (req, res, next) => {
  res.render("shop/checkout", { title: "Checkout" });
};
