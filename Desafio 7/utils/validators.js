const validateProduct = (body) => {

    for (const key of ["nombre", "descripcion", "codigo", "foto", "precio", "stock"]) {
        if(!Object.keys(body).includes(key)){
            return false
        }
    }

    return true

};


const validateProductOfShoppingCart = (body) => {

    for (const key of ["id", "nombre", "descripcion", "codigo", "foto", "precio", "stock"]) {
        if(!Object.keys(body).includes(key)){
            return false
        }
    }

    return true

};

module.exports = {
    validateProduct,
    validateProductOfShoppingCart
}