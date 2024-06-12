import express from"express";
import path from "./utils/path.js"
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.route.js";
import serverSocketIO from "./config/socket.config.js";
import handlebarsConfig from "./config/handlebars.config.js";

const PORT = 8080;
const HOST = "localhost";
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

handlebarsConfig.config(server);

server.use("/api/public", express.static(path.public));
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);

const serverHTTP = server.listen(PORT, () => {
    console.log(`Se esta ejecutando el servidor http://${HOST}:${PORT}`);
});

serverSocketIO.config(serverHTTP);