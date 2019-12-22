const express = require("express");

const router = express.Router();

// /admin/admin-product =>  GET
router.get("/add-product", (req, res, next) => {
  res.send(
    "<body><form action='/admin/product' method='POST'><input type='text' name='title'></input><button type='submit'>Add Product</button></form></body>"
  );
});

// you can use app.get , app.post, app.delete, app.use, app.patch for the specific methods
// /admin/product =>  POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
