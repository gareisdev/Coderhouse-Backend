const { v4: uuidv4 } = require("uuid");
const {
  loadProducts,
  saveProducts,
} = require("./../services/products.services");
const { validateProduct } = require("./../utils/validators");

const exceptions = {
  PRODUCT_NOT_FOUND: { error: -1, description: "Product not found" },
  INVALID_PRODUCT: {
    error: -1,
    description:
      "Required fields: [nombre, descripcion, codigo, foto, precio, stock]",
  },
};

class ProductsController {
  constructor() {
    this.products = loadProducts();
  }

  getProducts(req, res) {
    res.status(200).send(this.products);
  }

  getProduct(req, res) {
    const productID = req.params.id;
    const product = this.products.filter((p) => p.id === productID);

    if (!product.length) {
      res.status(404).send(exceptions.PRODUCT_NOT_FOUND);
      return;
    }

    res.send(product[0]);
  }

  addProduct(req, res) {
    if (!validateProduct(req.body)) {
      res.status(400).send(exceptions.INVALID_PRODUCT);
    }

    const product = {
      id: uuidv4(),
      timestamp: Date.now(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      codigo: req.body.codigo,
      foto: req.body.foto,
      precio: req.body.precio,
      stock: req.body.stock,
    };

    this.products.push(product);
    saveProducts(this.products);
    res.status(200).send(product);
  }

  updateProduct(req, res) {
    const productID = req.params.id;

    const productIndex = this.products.findIndex((p) => p.id === productID);

    if (productIndex < 0) {
      res.status(404).send(exceptions.PRODUCT_NOT_FOUND);
      return;
    }

    this.products[productIndex] = {
      id: productID,
      timestamp: Date.now(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      codigo: req.body.codigo,
      foto: req.body.foto,
      precio: req.body.precio,
      stock: req.body.stock,
    };
    saveProducts(this.products);
    res.status(200).send(this.products[productIndex]);
  }

  deleteProduct = (req, res) => {
    const productID = req.params.id;

    const product = this.products.findIndex((p) => p.id === productID);

    if (product < 0) {
      res.status(404).send(exceptions.PRODUCT_NOT_FOUND);
      return;
    }

    const removed = this.products.splice(product, 1);
    saveProducts(this.products);
    res.status(200).send(removed);
  };
}

module.exports = {
  ProductsController,
};
