const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      // fetch the cart
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => find existing product
      let existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      let existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(filePath, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProductFromCart(id, price) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }
      let cart = JSON.parse(fileContent);
      let dummyCart = { ...cart };
      let product = dummyCart.products.find(prod => prod.id === id);
      dummyCart.products = dummyCart.products.filter(prod => prod.id !== id);
      dummyCart.totalPrice = dummyCart.totalPrice - price * product.qty;
      fs.writeFile(filePath, JSON.stringify(dummyCart), err => {
        console.log(err);
      });
    });
  }
};
