const express = require("express");
const path = require("path");

const productController = require("../controllers/product-controller");

const router = express.Router();

// /admin/admin-product =>  GET
router.get("/add-product", productController.getAddProduct);

// /admin/product =>  POST
router.post("/add-product", productController.postAddProduct);

module.exports = router;
