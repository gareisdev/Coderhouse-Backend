const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const productsRouter = require("./routes/products");
const bodyParser = require("body-parser");
const multer = require('multer');


// Midlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routers
app.use( "/api/productos", productsRouter )

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
