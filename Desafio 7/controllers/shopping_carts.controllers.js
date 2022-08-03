const { loadShoppingCarts, saveShoppingCarts } = require("../services/shopping_cart.services");
const { v4: uuidv4 } = require("uuid");
const { validateProductOfShoppingCart } = require("../utils/validators");

const exceptions = {
  SHOPPING_CART_NOT_FOUND: {
    error: -1,
    description: "Shopping cart not found",
  },
  PRODUCT_NOT_FOUND: { error: -1, description: "Product not found" },
  INVALID_PRODUCT: {
    error: -1,
    description:
      "Required fields: [id, nombre, descripcion, codigo, foto, precio, stock]",
  }
};

class ShoppingCartController {
  constructor() {
    this.shoppingCarts = loadShoppingCarts();
  }

  createShoppingCart(req, res) {
    const shoppingCart = {
      id: uuidv4(),
      timestamp: Date.now(),
      products: [],
    };

    this.shoppingCarts.push(shoppingCart);

    saveShoppingCarts(this.shoppingCarts)

    res.status(200).send(shoppingCart);
  }

  getProductsFromShoppingCart(req, res) {
    const shoppingCart = this.shoppingCarts.filter(
      (sc) => sc.id === req.params.id
    );
    console.log(this.shoppingCarts);
    if (shoppingCart.length < 1) {
      res.status(404).send(exceptions.SHOPPING_CART_NOT_FOUND);
    } else {
      res.status(200).send(shoppingCart);
    }
  }

  deleteShoppingCart(req, res) {
    this.shoppingCarts = this.shoppingCarts.filter(
      (sc) => sc.id !== req.params.id
    );

    saveShoppingCarts(this.shoppingCarts)

    res.send({ description: `Shopping cart deleted: ${req.params.id}` });
  }

  deleteProductFromShoppingCart(req, res) {
    let index = this._searchShoppingCart(req.params.id);

    if (index >= 0) {
      this.shoppingCarts[index].products = this.shoppingCarts[
        index
      ].products.filter((p) => p.id !== req.params.prod_id);

      saveShoppingCarts(this.shoppingCarts);

      res.status(200).send({ description: "Product deleted succesfully" });
    } else {
      res.status(404).send(exceptions.PRODUCT_NOT_FOUND);
    }
  }

  addProductOnShoppingCart(req, res) {
    let index = this._searchShoppingCart(req.params.id);

    if (index >= 0) {

      if(!validateProductOfShoppingCart(req.body)){
        return res.status(400).send(exceptions.INVALID_PRODUCT)
      }

      const product = {
        id: req.body.id,
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock,
      };

      console.log(this.shoppingCarts);
      console.log(this.shoppingCarts[index]);
      this.shoppingCarts[index].products.push(product);

      saveShoppingCarts(this.shoppingCarts)

      res.status(200).send(product);
    } else {
      res.status(404).send(exceptions.SHOPPING_CART_NOT_FOUND);
    }
  }

  _searchShoppingCart(id) {
    let index = -1;
    for (let i = 0; i < this.shoppingCarts.length; i++) {
      if (this.shoppingCarts[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


}

module.exports = {
  ShoppingCartController,
};
