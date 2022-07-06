let {products} = require("./../data/products_data");

const getProducts = (req, res) => {
    res.status(200).send( products );
}

const getProduct = (req, res) => {
    const productID = req.body.product;
    
    const product = products.filter( p => p.title === productID);
    
    if(!product){
        res.status(404).send({error: "Producto no encontrado"});
        return
    }

    res.send(product);
}

const addProduct = (req, res) => {
    const { title, price, thumbnail } = req.body;

    if( !title || !price || !thumbnail){
        res.status(400);
        return
    }

    products.push({title, price, thumbnail});
    res.status(200);
}

const updateProduct = (req, res) => {
    const productID = req.body.product;
    
    const product = products.findIndex( p => p.title === productID);

    if(product < 0){
        res.status(404).send({error: "Producto no encontrado"});
        return
    }
    
    const { title, price, thumbnail } = req.body;

    if( !title || !price || !thumbnail){
        res.status(400);
        return
    }

    products[product] = {title, price, thumbnail};
    res.status(200);
}

const deleteProduct = (req, res) => {
    const productID = req.body.product;
    
    const product = products.findIndex( p => p.title === productID);
    
    if(product < 0){
        res.status(404).send({error: "Producto no encontrado"});
        return
    }

    products.splice(product, 1);
}


module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}