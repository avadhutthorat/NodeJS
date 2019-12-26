const db = require("../utils/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    return db.execute(
      "INSERT INTO products(title,price,description,imageUrl) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }
  static deleteProduct(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static getProductById = id => {};
};
