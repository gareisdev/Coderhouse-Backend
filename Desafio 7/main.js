const express = require("express");

// Import routes
const {ProductsRouter} = require("./routes/products.routes");
const {CarritosRouter} = require("./routes/shopping_carts.routes");

// Additional modules
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Variable configs
const PORT = process.env.PORT || 8080;

app = express();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

// Static files
app.use("/static", express.static(__dirname + '/public'));

// API Routes
app.use("/api/productos/", ProductsRouter);
app.use("/api/carrito/", CarritosRouter);



// Generic route with error
app.use("*", (req, res) => {
    const method = req.method;
    const url = req.originalUrl;
    res.status(404).send({"error": -1, "description": `ruta '${url}' metodo '${method}' no autorizada`})
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
