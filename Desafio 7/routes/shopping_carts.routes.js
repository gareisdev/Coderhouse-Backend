const express = require("express");
const router = express.Router();

const {ShoppingCartController} = require("../controllers/shopping_carts.controllers")

const shoppingCartController = new ShoppingCartController()

router.post("/", (req, res) => {
    return shoppingCartController.createShoppingCart(req, res);
})

router.get("/:id/productos", (req, res) => {
    return shoppingCartController.getProductsFromShoppingCart(req, res);
})

router.post("/:id/productos", (req, res) => {
    return shoppingCartController.addProductOnShoppingCart(req, res);
})

router.delete("/:id", (req, res) => {
    return shoppingCartController.deleteShoppingCart(req, res);
})

router.delete("/:id/productos/:prod_id", (req, res) => {
    return shoppingCartController.deleteProductFromShoppingCart(req, res);
})

module.exports = {
    CarritosRouter: router
}