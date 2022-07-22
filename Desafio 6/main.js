const express = require("express");
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")


const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productsRouter = require("./routes/products");
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productsList = require("./data/products_data")
const { ProductsController } = require("./controllers/products_controllers")

// Static files
app.use("/static", express.static(__dirname + '/public'));

// Routers
app.use("/api/productos", productsRouter);


// Public routes
app.get("/", (req, res) => {
    res.sendFile("/views/index.html", {root: __dirname})
})

app.get("/chat", (req, res) => {
    res.sendFile("/views/chat.html", {root: __dirname})
})


// Midlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));


httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


const messages = [
    {
        author: "Leonel",
        content: "Hola como estas?",
        date: "7/21/2022, 9:16:25"
    },
    {
        author: "Dario",
        content: "Buenos dias amigos!!",
        date: "7/21/2022, 10:16:25"

    }
]


io.on("connection", (socket) => {
    console.log("Cliente conectado");
    const controller = new ProductsController()

    io.sockets.emit("products", productsList.products);
    io.sockets.emit("messages", messages)

    socket.on("products", data => {
        const product = JSON.parse(data);
        product.id = controller._getLastId(productsList.products)
        productsList.products.push(product);
        io.sockets.emit("products", productsList.products)
    })

    socket.on("messages", data => {
        const obj = JSON.parse(data);
        messages.push(obj)
        io.sockets.emit("messages", messages)
    })

})

