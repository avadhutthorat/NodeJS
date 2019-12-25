const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

const getProductsFromFile = callback => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        let existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        let updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProduct), err => {
          console.log(`error in edit save ${err}`);
        });
      } else {
        this.id = Math.floor(Math.random() * 10000).toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), err => {
          console.log("error in save ", err);
        });
      }
    });
  }
  static deleteProduct(id) {
    getProductsFromFile(productData => {
      let productInfo = productData.find(prod => prod.id === id);
      let filteredProductData = productData.filter(prod => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(filteredProductData), err => {
        console.log(`Error while deleting ${err}`);
      });
      Cart.deleteProductFromCart(id, productInfo.price);
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static getProductById = (id, callback) => {
    getProductsFromFile(products => {
      let productDetail = products.find(prod => prod.id === id);
      callback(productDetail);
    });
  };
};
