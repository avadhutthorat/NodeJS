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

// get products added to cart
exports.getCart = (req, res, next) => {
  Cart.fetchCart(cart => {
    Product.fetchAll(products => {
      let cartProducts = [];
      for (product of products) {
        let cartProduct = cart.products.find(prod => prod.id === product.id);
        if (cartProduct) {
          cartProducts.push({ product: product, qty: cartProduct.qty });
        }
      }
      res.render("shop/cart", {
        title: "My Cart",
        path: "/cart",
        cart: cartProducts,
        totalPrice: cart.totalPrice
      });
    });
  });
};

// Adding product to cart
exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.getProductById(id, product => {
    Cart.addProduct(id, product.price);
    res.redirect("/cart");
  });
};

// Deleting product from cart
exports.deleteProductFromCart = (req, res, next) => {
  let { deleteId } = req.body;
  console.log(deleteId);
  Product.getProductById(deleteId, product => {
    Cart.deleteProductFromCart(deleteId, product.price);
    res.redirect("/cart");
  });
};

exports.orders = (req, res, next) => {
  res.render("shop/orders", { title: "My Orders" });
};

// checkout router
exports.checkout = (req, res, next) => {
  res.render("shop/checkout", { title: "Checkout" });
};
