let listProducts = require("./../data/products_data");

class ProductsController {
    constructor(data) {
        this.products = listProducts.products;
    }

    getProducts(req, res) {
        res.status(200).send(this.products);
    }

    getProduct(req, res) {
        const productID = parseInt(req.params.id);
        const product = this.products.filter((p) => p.id === productID);

        if (!product.length) {
            res.status(404).send({ error: "Producto no encontrado" });
            return;
        }

        res.send(product[0]);
    }

    addProduct(req, res) {
        const title = req.body.title;
        const price = parseFloat(req.body.price);
        const thumbnail = req.body.thumbnail;

        if (!title || !price || !thumbnail) {
            res.status(400).send(
                "Las claves 'title', 'price' y 'thumbnail' son obligatorias"
            );
            return;
        }
        const id = this._getLastId(this.products) + 1;

        const product = { id, title, price, thumbnail };
        this.products.push(product);
        res.status(200).send(product);
    }

    updateProduct(req, res) {
        const productID = parseInt(req.params.id);

        const productIndex = this.products.findIndex((p) => p.id === productID);

        if (productIndex < 0) {
            res.status(404).send({ error: "Producto no encontrado" });
            return;
        }

        const title = req.body.title;
        const price = req.body.price;
        const thumbnail = req.body.thumbnail;

        if (!title || !price || !thumbnail) {
            res.status(400).send(
                "Las claves 'title', 'price' y 'thumbnail' son obligatorias"
            );
            return;
        }

        this.products[productIndex] = {
            id: productID,
            title,
            price,
            thumbnail,
        };
        res.status(200).send(this.products[productIndex]);
    }

    deleteProduct = (req, res) => {
        const productID = parseInt(req.params.id);

        const product = this.products.findIndex((p) => p.id === productID);

        if (product < 0) {
            res.status(404).send({ error: "Producto no encontrado" });
            return;
        }

        const removed = this.products.splice(product, 1);
        res.status(200).send(removed);
    };

    // Auxiliary functions
    _getLastId(products) {
        if (products.length === 0) return 0;
        const productos_id = products.map((p) => p.id);
        return Math.max(...productos_id);
    }
}

module.exports = {
    ProductsController,
};
