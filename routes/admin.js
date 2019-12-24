const express = require("express");
const path = require("path");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/admin-product =>  GET
router.get("/add-product", adminController.getAddProduct);

// /admin/product =>  POST
router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getAdminProducts);

module.exports = router;
