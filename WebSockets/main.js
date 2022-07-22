const express = require("express");
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")


const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const bodyParser = require("body-parser");


// Static files
app.use( express.static("./public"))

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

// Midlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

const messages = []



httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("Cliente conectado");
    io.sockets.emit("messages", messages);

    socket.on("messages", data => {
        const obj = JSON.parse(data);
        messages.push(obj)
        io.sockets.emit("messages", messages)
    })
})

io.on("messages", (data) => {
    console.log(data);
})