const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const productsRouter = require("./routes/products");
const productTemplatesRouter = require("./routes/products_templates");
const bodyParser = require("body-parser");

const TEMPLATE_ENGINE = process.env.TEMPLATE_ENGINE || "ejs"

app.set("views", `./views/${TEMPLATE_ENGINE}`)
app.set('view engine', TEMPLATE_ENGINE);
app.use("/static", express.static(__dirname + '/public'));


// Midlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/api/productos", productsRouter);
app.use("/productos", productTemplatesRouter);

// Public endpoints
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
