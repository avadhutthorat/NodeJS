const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

// /admin/admin-product =>  GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// you can use app.get , app.post, app.delete, app.use, app.patch for the specific methods
// /admin/product =>  POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
