import express from"express";
import path from "./utils/path.js"
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.route.js";
import realTimeProductsRouter from "./routes/realTimeProducts.route.js"
import serverSocketIO from "./config/socket.config.js";
import handlebarsConfig from "./config/handlebars.config.js";
import mongoDB from "./config/mongoose.config.js";

const PORT = 8080;
const HOST = "localhost";
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);
server.use("/realTimeProducts", realTimeProductsRouter)

handlebarsConfig.config(server);

server.use("/api/public", express.static(path.public));

server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

const serverHTTP = server.listen(PORT, () => {
    console.log(`Se esta ejecutando el servidor http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});

serverSocketIO.config(serverHTTP);