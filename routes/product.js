const express = require("express");
const {
  product,
  addProduct,
  getAllProduct,
  adminGetAllProducts,
  getOneProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

// user routes
router.route("/product").get(product);
router.route("/products").get(getAllProduct);
router.route("/product/:id").get(getOneProduct);

//admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProducts);
module.exports = router;
