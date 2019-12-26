const Product = require("../models/product");
const Cart = require("../models/cart");

// list products on product tab
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        products: products,
        title: "Products",
        path: "/products"
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
};

// get product details
exports.getProductDetails = (req, res, next) => {
  let { productId } = req.params;

  // Product.findAll({ where: { id: productId } })
  //   .then(product => {
  //     res.render("shop/product-detail", {
  //       product: product[0],
  //       path: "/products",
  //       title: product.title
  //     });
  //   })
  //   .catch(err => console.log(err));
  // alternate way to fetch single record
  Product.findByPk(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        title: product.title
      });
    })
    .catch(err => console.log(`failed to load the product detail - ${err}`));
};

//list products on homepage
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/index"
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
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
