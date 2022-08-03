const fs = require("fs");


const loadProducts = () => {
    const data = JSON.parse(fs.readFileSync("/Users/leonelgareis/Documents/coderhouse/Coderhouse-Backend/Desafio 7/data/products.json"));
    return data;
}

const saveProducts = (data) => {
    fs.writeFileSync("/Users/leonelgareis/Documents/coderhouse/Coderhouse-Backend/Desafio 7/data/products.json", JSON.stringify(data));
    console.log("File saved!");
}

module.exports = {
    loadProducts,
    saveProducts
}