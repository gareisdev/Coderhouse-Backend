const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const productsRouter = require("./routes/products");
const bodyParser = require("body-parser");
const multer = require("multer");

// Config multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({ storage });

// Midlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/api/productos", productsRouter);

// Public endpoints
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
