const express = require("express");
const router = express.Router();
const { ProductsController } = require("../controllers/products.controllers");
const {isAdmin} = require("./../config/config")

const productController = new ProductsController();

router.get("/:id?", (req, res) => {
  const idProduct = req.params.id;

  if (idProduct) {
    return productController.getProduct(req, res);
  }
  return productController.getProducts(req, res);
});

router.post("/", (req, res) => {
  if(isAdmin){
    return productController.addProduct(req, res);
  }
  res.status(401).send({error: 2, description: "User unauthorized"})
});

router.put("/:id", (req, res) => {
  if(isAdmin){
    return productController.updateProduct(req, res);
  }
  res.status(401).send({error: 2, description: "User unauthorized"})
});

router.delete("/:id", (req, res) => {
  if(isAdmin){
    return productController.deleteProduct(req, res);
  }
  res.status(401).send({error: 2, description: "User unauthorized"})
});

module.exports = { ProductsRouter: router };
