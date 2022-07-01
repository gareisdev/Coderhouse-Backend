const express = require("express");
const { Contenedor } = require("./container/container");

// App
const app = express();

// Endpoints
app.get("/productos", (req, res) => {
    const contenedor = new Contenedor("products");

    let data = contenedor.getAll();

    if (!data) {
        res.status(200).send({ message: "No hay productos" });
    } else {
        res.status(200).send(data);
    }
});

app.get("/productoRandom", (req, res) => {
    const contenedor = new Contenedor("products");

    const data = contenedor.getAll();
    const randomProduct = data[Math.floor( Math.random() * data.length )];
    res.status(200).send( { product : randomProduct} )
});

app.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 3000");
})