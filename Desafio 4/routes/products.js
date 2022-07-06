const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/products_controllers");

router.get("/", getProducts);
router.get("/:product", getProduct);
router.post("/", addProduct);
router.put("/:product", updateProduct);
router.delete("/:product", deleteProduct);

module.exports = router;
