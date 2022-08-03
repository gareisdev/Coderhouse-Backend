const fs = require("fs");


const loadShoppingCarts = () => {
    const data = JSON.parse(fs.readFileSync("/Users/leonelgareis/Documents/coderhouse/Coderhouse-Backend/Desafio 7/data/shopping_carts.json"));
    return data;
}

const saveShoppingCarts = (data) => {
    fs.writeFileSync("/Users/leonelgareis/Documents/coderhouse/Coderhouse-Backend/Desafio 7/data/shopping_carts.json", JSON.stringify(data));
    console.log("File saved!");
}

module.exports = {
    loadShoppingCarts,
    saveShoppingCarts
}