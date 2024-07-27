const express = require("express");
const router = express.Router();
const {
  getProducts,
  getSingleProduct,
  getTopSellerProducts,
  getProtectiveGearProducts,
  getRelatedProducts,
} = require("../controller/productController");

router.get("/", getProducts);
router.get("/detail", getSingleProduct);
router.get("/topSeller", getTopSellerProducts);
router.get("/protectiveGear", getProtectiveGearProducts);
router.get("/relatedProduct", getRelatedProducts);

module.exports = router;
