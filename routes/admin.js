const express = require("express");
const path = require("path");

const router = express.Router();

// /admin/admin-product =>  GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "admin.html"));
});

// you can use app.get , app.post, app.delete, app.use, app.patch for the specific methods
// /admin/product =>  POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
