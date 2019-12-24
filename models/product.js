const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.floor(Math.random() * 10000).toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log("error in save ", err);
      });
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
