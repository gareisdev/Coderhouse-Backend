const express = require("express");
const router = express.Router();
const {ProductsController} = require("./../controllers/products_controllers");

const productController = new ProductsController()


router.get("/", productController.getProducts.bind(productController));
router.get("/:id", productController.getProduct.bind(productController));
router.post("/", productController.addProduct.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

module.exports = router;
